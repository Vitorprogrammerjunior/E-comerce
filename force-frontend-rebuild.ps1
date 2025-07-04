# Script para forçar rebuild do frontend com novas URLs
Write-Host "🔧 Corrigindo baseURL do frontend..." -ForegroundColor Green

Write-Host "`n📋 Verificando configuração atual..." -ForegroundColor Cyan
$envContent = Get-Content "frontend\.env.production"
Write-Host "   Arquivo .env.production:" -ForegroundColor White
$envContent | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }

Write-Host "`n🗑️ Removendo container e imagem do frontend..." -ForegroundColor Yellow
docker compose stop frontend
docker compose rm -f frontend
docker rmi -f e-comerce-frontend 2>$null

Write-Host "`n🧹 Limpando cache do Docker..." -ForegroundColor Yellow
docker builder prune -f

Write-Host "`n🚀 Rebuilding frontend do zero (sem cache)..." -ForegroundColor Green
docker compose build --no-cache frontend

Write-Host "`n▶️ Iniciando frontend..." -ForegroundColor Green
docker compose up frontend -d

Write-Host "`n⏳ Aguardando 20 segundos para o frontend inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

Write-Host "`n🧪 Testando frontend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://134.122.117.211" -TimeoutSec 10
    Write-Host "✅ Frontend acessível" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend ainda com problema: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n💡 Agora o baseURL deve estar correto!" -ForegroundColor Green
Write-Host "   Acesse: http://134.122.117.211" -ForegroundColor White
Write-Host "   E verifique o console do navegador" -ForegroundColor White
