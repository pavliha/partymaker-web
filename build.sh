#!/bin/zsh
git reset --hard origin/master
git pull origin master
sudo service mysql stop
echo 'Stop mysql service'
yarn install
yarn build
sudo service mysql start
echo 'Start mysql service'
