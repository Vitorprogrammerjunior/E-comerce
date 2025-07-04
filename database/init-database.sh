#!/bin/bash
# Script de inicialização do banco de dados para Docker

echo "Inicializando banco de dados..."

# Aguardar MySQL estar totalmente pronto
until mysql -h localhost -u root -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1; do
  echo "Aguardando MySQL ficar pronto..."
  sleep 2
done

echo "MySQL está pronto! Executando scripts..."

# Executar schema
if [ -f /docker-entrypoint-initdb.d/schema.sql ]; then
    echo "Executando schema.sql..."
    mysql -h localhost -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < /docker-entrypoint-initdb.d/schema.sql
fi

# Executar dados de exemplo se existir
if [ -f /docker-entrypoint-initdb.d/seed-data.sql ]; then
    echo "Executando seed-data.sql..."
    mysql -h localhost -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < /docker-entrypoint-initdb.d/seed-data.sql
fi

echo "Inicialização do banco concluída!"
