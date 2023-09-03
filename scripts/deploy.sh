ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)

source ${ABSDIR}/stop.sh
source ${ABSDIR}/start.sh
source ${ABSDIR}/switch.sh

PORT=$(./port.sh)

stop $PORT

start $PORT

switch $PORT