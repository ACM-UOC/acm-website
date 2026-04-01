#!/bin/bash
set -e

SERVER="csdhosting@190.92.158.4"
SSH_OPTS="-o MACs=hmac-sha2-256"

echo "Building..."
npx next build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
zip -r standalone.zip .next/standalone

echo "Uploading..."
scp $SSH_OPTS standalone.zip $SERVER:~/standalone.zip
scp $SSH_OPTS server/htaccess $SERVER:~/public_html/.htaccess

echo "Deploying..."
ssh $SSH_OPTS $SERVER << 'ENDSSH'
rm -rf ~/.next/standalone
unzip -o standalone.zip -d ~
cp -r ~/.next/standalone/public ~/website/standalone/
rm -rf ~/website/standalone/.next
cp -r ~/.next/standalone/.next ~/website/standalone/
cp -r ~/.next/standalone/node_modules ~/website/standalone/
cp ~/.next/standalone/server.js ~/website/standalone/
cp ~/.next/standalone/package.json ~/website/standalone/
pm2 restart acm-website
rm -f ~/public_html/_next/static
ln -s ~/website/standalone/.next/static ~/public_html/_next/static
rm -rf ~/lscache/*
echo "Done."
ENDSSH
