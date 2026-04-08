#!/bin/bash
set -e

SSH_HOST="uochosting@uoc.hosting.acm.org"
SSH_OPTS="-o MACs=hmac-sha2-256"
SKIP_BUILD=false

for arg in "$@"; do
  case "$arg" in
    --skip-build|--skipbuild)
      SKIP_BUILD=true
      ;;
    *)
      echo "Unknown option: $arg"
      echo "Usage: ./deploy.sh [--skip-build]"
      exit 1
      ;;
  esac
done

if [ "$SKIP_BUILD" = true ]; then
  echo "Skipping build. Reusing existing .next output."
else
  echo "Building site..."
  npx next build
fi

if [ ! -d ".next/standalone" ] || [ ! -d ".next/static" ]; then
  echo "Missing build artifacts. Run a full build first or remove --skip-build."
  exit 1
fi

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

  echo "--- App processes ---"
  PM2_PIDS=$(pm2 pid acm | awk '/^[0-9]+$/ && $1 > 0 { print $1 }')
  if [ -n "$PM2_PIDS" ]; then
    PM2_PID_LIST=$(echo "$PM2_PIDS" | paste -sd, -)
    echo "PM2-managed PID(s):"
    ps -o pid,ppid,cmd -p "$PM2_PID_LIST"
  else
    echo "WARN: pm2 did not report a running PID for acm"
  fi

  APP_PIDS=$(
    (
      pgrep -u uochosting -f "/home/uochosting/app/.next/standalone/server.js" 2>/dev/null || true
      pgrep -u uochosting -f "next-server" 2>/dev/null || true
    ) | sort -u
  )

  if [ -n "$APP_PIDS" ]; then
    APP_PID_LIST=$(echo "$APP_PIDS" | paste -sd, -)
    echo "Detected standalone/Next.js server PID(s):"
    ps -o pid,ppid,cmd -p "$APP_PID_LIST"
  else
    echo "WARN: no standalone/next-server process matched by name"
    if [ -n "$PM2_PIDS" ]; then
      echo "PM2 still reports acm as running, so not treating this as a failure."
    fi
  fi
ENDSSH

echo "Deploy complete."
