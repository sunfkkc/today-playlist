#!/bin/bash
TARGET_PORT=$1  # 첫 번째 매개변수로 전달된 포트 번호
cd /home/ec2-user/app2/zip

yarn

nohup yarn start -p $TARGET_PORT &

sleep 5

echo "$TARGET_PORT 에서 next 프로젝트 실행"