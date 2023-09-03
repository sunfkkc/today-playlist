#!/bin/bash

start() {
    TARGET_PORT=$1  # 첫 번째 매개변수로 전달된 포트 번호

    yarn

    yarn start -p $TARGET_PORT

    echo "$TARGET_PORT 에서 next 프로젝트 실행"
}