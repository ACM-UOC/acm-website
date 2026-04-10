#!/bin/bash
set -e

SSH_HOST="${SSH_HOST:-uochosting@uoc.acm.org}"
SSH_OPTS="${SSH_OPTS:--o MACs=hmac-sha2-256}"
SKIP_BUILD=false

if [[ "${1:-}" == "--skip-build" ]] || [[ "${SKIP_BUILD:-0}" == "1" ]]; then
  SKIP_BUILD=true
fi

# build the site
if [[ "$SKIP_BUILD" == "true" ]]; then
  echo "Skipping build..."
  if [[ ! -d ".next/standalone" ]] || [[ ! -d ".next/static" ]]; then
    echo "Error: .next build artifacts not found. Run build first."
    exit 1
  fi
else
  npx next build
fi

# create folder structure
rm -rf ./website
cp -r .next/standalone website
cp -r .next/static website/.next
cp -r public website

zip -r website.zip website

# upload
scp $SSH_OPTS website.zip $SSH_HOST:~/
scp $SSH_OPTS server/htaccess $SSH_HOST:~/public_html/.htaccess

# deploy in the server
ssh $SSH_OPTS $SSH_HOST << 'ENDSSH'
rm -rf ~/website
unzip website.zip

pkill -u uochosting -x node || true
pkill -u uochosting -f "next-server" || true
sleep 1

pm2 delete acm-website
pm2 start ~/website/server.js --name acm-website
ENDSSH
