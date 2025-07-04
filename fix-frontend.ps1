# Script para resolver o problema do frontend
Write-Host "🔧 Resolvendo problema do frontend..." -ForegroundColor Green

$serverIP = "134.122.117.211"

# Passo 1: Verificar configurações atuais
Write-Host "`n📋 Verificando configurações..." -ForegroundColor Cyan
$frontendEnv = Get-Content "frontend\.env.production" | Select-String "NEXT_PUBLIC_API_URL"
$backendEnv = Get-Content "backend\.env" | Select-String "CORS_ORIGIN"
Write-Host "   Frontend API URL: $frontendEnv" -ForegroundColor White
Write-Host "   Backend CORS: $backendEnv" -ForegroundColor White

# Passo 2: Rebuild apenas o backend (que teve mudança de CORS)
Write-Host "`n🔄 Rebuilding backend com nova configuração de CORS..." -ForegroundColor Cyan
docker compose up --build backend -d

Write-Host "`n⏳ Aguardando 10 segundos para o backend inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Passo 3: Testar backend
Write-Host "`n🧪 Testando backend..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://${serverIP}:4000/api/health" -TimeoutSec 10
    Write-Host "✅ Backend health: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend não acessível: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Tentando testar localmente..." -ForegroundColor Yellow
    try {
        $localHealth = Invoke-RestMethod -Uri "http://localhost:4000/api/health" -TimeoutSec 5
        Write-Host "✅ Backend local: $($localHealth.status)" -ForegroundColor Green
        Write-Host "⚠️  Problema pode ser firewall - execute: sudo ufw allow 4000" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Backend também não funciona localmente" -ForegroundColor Red
    }
}

# Passo 4: Testar API de produtos
Write-Host "`n📦 Testando API de produtos..." -ForegroundColor Cyan
try {
    $products = Invoke-RestMethod -Uri "http://${serverIP}:4000/api/products/featured" -TimeoutSec 10
    Write-Host "✅ API produtos funcionando - $($products.products.Count) produtos" -ForegroundColor Green
} catch {
    Write-Host "❌ API produtos com erro: $($_.Exception.Message)" -ForegroundColor Red
}

# Passo 5: Rebuild frontend se necessário
Write-Host "`n🌐 Rebuilding frontend..." -ForegroundColor Cyan
docker compose up --build frontend -d

Write-Host "`n⏳ Aguardando 15 segundos para o frontend inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Passo 6: Teste final
Write-Host "`n🎯 Teste final..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://${serverIP}" -TimeoutSec 10
    Write-Host "✅ Frontend acessível" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend ainda com problema: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🔗 URLs para testar manualmente:" -ForegroundColor Cyan
Write-Host "   Frontend: http://${serverIP}" -ForegroundColor White
Write-Host "   Backend Health: http://${serverIP}:4000/api/health" -ForegroundColor White
Write-Host "   Featured Products: http://${serverIP}:4000/api/products/featured" -ForegroundColor White

Write-Host "`n💡 Se ainda não funcionar:" -ForegroundColor Yellow
Write-Host "1. Verificar logs: docker compose logs backend" -ForegroundColor White
Write-Host "2. Verificar logs: docker compose logs frontend" -ForegroundColor White
Write-Host "3. Abrir porta no firewall: sudo ufw allow 4000" -ForegroundColor White
Write-Host "4. Restart completo: docker compose down && docker compose up --build -d" -ForegroundColor White
