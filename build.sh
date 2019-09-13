#!/bin/zsh
git reset --hard origin/master
git pull origin master
sudo service mysql stop
yarn install
yarn build
sudo service mysql start
