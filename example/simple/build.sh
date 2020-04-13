#!/bin/sh

npm install --registry http://192.168.110.26:8088/repository/npm-group/

echo -e "\033[32m npm run build \033[0m "
npm run build
