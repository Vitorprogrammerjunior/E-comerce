#!/bin/bash
# Script para resolver o problema de downgrade do MySQL

echo "🔧 Resolvendo problema de downgrade do MySQL..."

echo "⏹️ Parando todos os containers..."
docker compose down

echo "🗑️ Removendo volumes corrompidos..."
docker compose down -v
docker volume prune -f

echo "🧹 Limpando sistema Docker..."
docker system prune -f

echo "📋 Verificando configuração..."
grep "image: mysql" docker-compose.yml

echo "🚀 Reconstruindo tudo do zero..."
docker compose up --build -d

echo "⏳ Aguardando inicialização..."
sleep 30

echo "🧪 Testando aplicação..."
curl -s http://localhost:4000/api/health || echo "Backend ainda inicializando..."
curl -s http://134.122.117.211:4000/api/health || echo "Backend externo ainda inicializando..."

echo "✅ Processo concluído!"
echo "🌐 Acesse: http://134.122.117.211"
