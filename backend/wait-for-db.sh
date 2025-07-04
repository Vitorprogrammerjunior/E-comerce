#!/bin/sh
# wait-for-db.sh - Script para aguardar o MySQL estar pronto

set -e

host="$1"
shift
cmd="$@"

echo "Aguardando MySQL em $host estar pronto..."

until mysql -h"$host" -uroot -proot -e "SELECT 1;" >/dev/null 2>&1; do
  >&2 echo "MySQL ainda não está pronto - aguardando..."
  sleep 2
done

>&2 echo "MySQL está pronto - executando comando"
exec $cmd
