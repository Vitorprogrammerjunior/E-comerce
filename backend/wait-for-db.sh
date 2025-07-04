#!/bin/sh
# wait-for-db.sh - Script para aguardar o MySQL estar pronto

set -e

host="$1"
shift
cmd="$@"

echo "Aguardando MySQL em $host estar pronto..."

# Tentar conexão com diferentes credenciais
until mysql -h"$host" -uroot -proot -e "SELECT 1;" >/dev/null 2>&1 || mysql -h"$host" -uuser -p"Vitor@56" -e "SELECT 1;" >/dev/null 2>&1; do
  >&2 echo "MySQL ainda não está pronto - aguardando..."
  sleep 3
done

>&2 echo "MySQL está pronto - testando banco 'ecommerce'..."

# Verificar se o banco ecommerce existe
until mysql -h"$host" -uroot -proot -e "USE ecommerce; SELECT 1;" >/dev/null 2>&1 || mysql -h"$host" -uuser -p"Vitor@56" -e "USE ecommerce; SELECT 1;" >/dev/null 2>&1; do
  >&2 echo "Banco 'ecommerce' ainda não está pronto - aguardando..."
  sleep 3
done

>&2 echo "MySQL e banco 'ecommerce' estão prontos - executando comando"
exec $cmd
