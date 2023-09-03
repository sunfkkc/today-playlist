#!/bin/bash

TARGET_PORT=$1  # 첫 번째 매개변수로 전달된 포트 번호

echo "> 전환할 Port: $PORT"
echo "> Port 전환"
echo "set \$service_url http://127.0.0.1:${PORT};" | sudo tee /etc/nginx/conf.d/service-url.inc

echo "> 엔진엑스 reload"
sudo service nginx reload   