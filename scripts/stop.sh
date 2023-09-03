#!/bin/bash

TARGET_PORT=$1  # 첫 번째 매개변수로 전달된 포트 번호

# 해당 포트에서 실행 중인 프로세스의 PID 얻기
PID=$(lsof -t -i:$TARGET_PORT)

# PID가 존재하면 종료하기
if [ ! -z "$PID" ]; then
    kill -9 $PID
    echo "Process on port $TARGET_PORT has been terminated."
else
    echo "No process found on port $TARGET_PORT."
fi