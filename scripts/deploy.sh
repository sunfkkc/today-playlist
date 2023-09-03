source ./stop.sh
source ./start.sh
source ./switch.sh

PORT=$(./port.sh)

stop $PORT

start $PORT

switch $PORT