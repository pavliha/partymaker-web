#!/bin/zsh
git reset --hard origin/master
git pull origin master
sudo service mysql stop
echo 'Stop mysql service'
sudo service nginx stop
echo 'Stop nginx service'
yarn install
yarn build
echo 'Start mysql service'
sudo service mysql start
sudo cp ./config.nginx /etc/nginx/sites-available/partymaker.zp.u
echo 'Start nginx service'
sudo service nginx start
