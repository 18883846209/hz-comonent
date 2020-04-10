#!/bin/sh

# git pull

# echo -e "\033[32m 更新\下载npm包...\033[0m "

# npm install --registry http://192.168.110.26:8088/repository/npm-group/

echo -e "\033[32m npm run build \033[0m "
npm run build

docker build -t mobile-war-room:1.0 .