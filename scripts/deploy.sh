#!/bin/bash


PORT=$(/home/ec2-user/app2/zip/scripts/port.sh)

/home/ec2-user/app2/zip/scripts/stop.sh $PORT
/home/ec2-user/app2/zip/scripts/start.sh $PORT
/home/ec2-user/app2/zip/scripts/switch.sh $PORT
