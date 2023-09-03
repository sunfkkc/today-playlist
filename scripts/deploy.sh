#!/bin/bash

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)

${ABSDIR}/permission.sh

PORT=$(${ABSDIR}/port.sh)

${ABSDIR}/stop.sh $PORT
${ABSDIR}/start.sh $PORT
${ABSDIR}/switch.sh $PORT
