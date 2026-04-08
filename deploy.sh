#!/bin/bash
set -e

SSH_HOST="uochosting@uoc.hosting.acm.org"
SSH_OPTS="-o MACs=hmac-sha2-256"

# build the site
npx next build

# copy the folders inside standalone
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

zip -r standalone.zip .next/standalone

echo "Uploading..."
scp $SSH_OPTS standalone.zip $SSH_HOST:~/

echo "Deploying..."
ssh $SSH_OPTS $SSH_HOST bash << 'ENDSSH'
  set -e
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  # swap app directory
  rm -rf ~/app
  mkdir ~/app
  cd ~/app
  unzip ~/standalone.zip

  # kill all node/next-server processes (managed or orphaned) then start fresh
  pkill -u uochosting -x node 2>/dev/null || true
  pkill -u uochosting -f "next-server" 2>/dev/null || true
  sleep 1

  # start via pm2 (delete stale entry if exists, then start fresh)
  pm2 delete acm 2>/dev/null || true
  pm2 start .next/standalone/server.js --name acm

  # wait for startup
  sleep 3

  # checks
  echo "--- PM2 status ---"
  pm2 list

  echo "--- HTTP check ---"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://190.92.158.4:3000)
  if [ "$STATUS" = "200" ]; then
    echo "OK: server responded with 200"
  else
    echo "WARN: server responded with $STATUS"
    pm2 logs acm --lines 20 --nostream
  fi

  echo "--- Node processes ---"
  PROCS=$(ps aux | grep -E "node|next-server" | grep -v grep | wc -l)
  echo "$PROCS node/next-server process(es) running"
  ps aux | grep -E "node|next-server" | grep -v grep
ENDSSH

echo "Deploy complete."
