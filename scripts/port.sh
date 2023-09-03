#!/bin/bash

PORT=$(grep 'set $service_url' /etc/nginx/conf.d/service-url.inc | awk -F':' '{print $NF}' | awk -F';' '{print $1}')

if [ "$PORT" == "3001" ]; then
    echo "3002"
else
    echo "3001"
fi
