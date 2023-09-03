#!/bin/bash

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)

PORT=$(${ABSDIR}/port.sh)

${ABSDIR}/stop.sh $PORT
${ABSDIR}/start.sh $PORT
${ABSDIR}/switch.sh $PORT
