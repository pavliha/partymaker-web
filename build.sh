#!/bin/zsh
git reset --hard origin/master
git pull origin master
yarn install
yarn build
