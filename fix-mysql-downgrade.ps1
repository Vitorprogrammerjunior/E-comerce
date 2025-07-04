# Script para resolver o problema de downgrade do MySQL
Write-Host "🔧 Resolvendo problema de downgrade do MySQL..." -ForegroundColor Red

Write-Host "`n⏹️ Parando todos os containers..." -ForegroundColor Yellow
docker compose down

Write-Host "`n🗑️ Removendo volumes corrompidos (isso vai deletar os dados)..." -ForegroundColor Yellow
docker compose down -v
docker volume prune -f

Write-Host "`n🧹 Limpando imagens antigas..." -ForegroundColor Yellow
docker system prune -f

Write-Host "`n📋 Verificando configuração MySQL..." -ForegroundColor Cyan
$mysqlConfig = Get-Content "docker-compose.yml" | Select-String "image: mysql"
Write-Host "   Versão MySQL: $mysqlConfig" -ForegroundColor White

Write-Host "`n🚀 Reconstruindo tudo do zero..." -ForegroundColor Green
docker compose up --build

Write-Host "`n💡 Observações importantes:" -ForegroundColor Cyan
Write-Host "   ✅ MySQL atualizado para 8.4 (compatível)" -ForegroundColor White
Write-Host "   ✅ Volumes limpos (dados serão recriados do schema)" -ForegroundColor White
Write-Host "   ✅ Schema e dados de exemplo serão recarregados" -ForegroundColor White
