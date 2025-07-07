#!/bin/bash

# Script de Deploy para Produção
echo "🚀 Iniciando deploy da aplicação e-commerce..."

# 1. Parar containers existentes
echo "🔄 Parando containers existentes..."
docker-compose down

# 2. Limpar images antigas (opcional)
echo "🧹 Limpando imagens antigas..."
docker image prune -f

# 3. Build e iniciar containers
echo "🏗️  Construindo e iniciando containers..."
docker-compose up --build -d

# 4. Verificar status dos containers
echo "📊 Verificando status dos containers..."
docker-compose ps

# 5. Verificar logs do backend
echo "📋 Logs do backend (últimas 20 linhas):"
docker-compose logs --tail=20 backend

# 6. Verificar logs do frontend
echo "📋 Logs do frontend (últimas 20 linhas):"
docker-compose logs --tail=20 frontend

echo "✅ Deploy concluído!"
echo "🌐 Frontend: http://134.122.117.211"
echo "🔧 Backend: http://134.122.117.211:4000"
echo "📊 Health check: http://134.122.117.211:4000/api/health"
