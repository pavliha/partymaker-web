#!/bin/zsh

echo 'Fetching new changes'
git reset --hard origin/master
git pull origin master

echo 'Start project'
yarn install
/home/dev/.npm-global/bin/pm2 restart index.js --name web -- --stage=prod

echo 'Copy new nginx config'
sudo cp ./config.nginx /etc/nginx/sites-available/web.partymaker.zp.ua

echo 'Start nginx service'
sudo service nginx reload
