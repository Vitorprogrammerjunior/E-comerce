#!/bin/bash
# Script para forçar rebuild completo do frontend

echo "🔧 Forçando rebuild do frontend com baseURL correto..."

echo "📋 Verificando .env.production..."
cat frontend/.env.production | grep NEXT_PUBLIC_API_URL

echo "🗑️ Removendo container e imagem do frontend..."
docker compose stop frontend
docker compose rm -f frontend
docker rmi $(docker images | grep e-comerce-frontend | awk '{print $3}') 2>/dev/null || true

echo "🧹 Limpando cache do Docker..."
docker builder prune -f

echo "🚀 Rebuilding frontend sem cache..."
docker compose build --no-cache frontend

echo "▶️ Iniciando frontend..."
docker compose up frontend -d

echo "⏳ Aguardando frontend inicializar..."
sleep 25

echo "🧪 Testando..."
curl -I http://134.122.117.211 || echo "Frontend ainda inicializando..."

echo "✅ Rebuild concluído!"
echo "🌐 Acesse: http://134.122.117.211"
echo "💡 Verifique o console do navegador - baseURL deve estar correto agora"
