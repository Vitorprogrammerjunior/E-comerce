#!/bin/bash

# Script de Monitoramento
echo "📊 Status da Aplicação E-commerce"
echo "================================="

# Status dos containers
echo "🐳 Status dos Containers:"
docker-compose ps

echo ""
echo "💾 Uso de Recursos:"
docker stats --no-stream

echo ""
echo "🔍 Health Checks:"
echo "Frontend: $(curl -s -o /dev/null -w "%{http_code}" http://134.122.117.211 || echo "ERRO")"
echo "Backend Health: $(curl -s -o /dev/null -w "%{http_code}" http://134.122.117.211:4000/api/health || echo "ERRO")"

echo ""
echo "📋 Logs Recentes:"
echo "--- Backend ---"
docker-compose logs --tail=5 backend

echo "--- Frontend ---"
docker-compose logs --tail=5 frontend

echo ""
echo "🗄️  Status do Banco:"
docker-compose logs --tail=5 db
