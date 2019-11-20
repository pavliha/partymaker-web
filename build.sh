#!/bin/zsh

echo 'Fetching new changes'
git reset --hard origin/master
git pull origin master

echo 'Stop mysql service'
sudo service mysql stop

sudo service nginx stop
echo 'Stop nginx service'

echo 'Build project'
yarn install
yarn prod:pm2

echo 'Start mysql service'
sudo service mysql start

echo 'Copy new nginx config'
sudo cp ./config.nginx /etc/nginx/sites-available/web.partymaker.zp.ua

echo 'Start nginx service'
sudo service nginx start
