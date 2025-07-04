# Script para verificar se a aplicação está funcionando em produção
param(
    [string]$ServerIP = "134.122.117.211"
)

Write-Host "🔍 Verificando aplicação em produção..." -ForegroundColor Green
Write-Host "   Servidor: $ServerIP" -ForegroundColor Cyan

# Testar backend API health
Write-Host "`n🔧 Testando Backend API..." -ForegroundColor Yellow
try {
    $backendHealth = Invoke-RestMethod -Uri "http://${ServerIP}:4000/api/health" -TimeoutSec 10
    Write-Host "✅ Backend está funcionando" -ForegroundColor Green
    Write-Host "   Status: $($backendHealth.status)" -ForegroundColor White
} catch {
    Write-Host "❌ Backend não está acessível" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Testar API de produtos
Write-Host "`n📦 Testando API de Produtos..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "http://${ServerIP}:4000/api/products?limit=1" -TimeoutSec 10
    Write-Host "✅ API de produtos funcionando" -ForegroundColor Green
    if ($products.products -and $products.products.Count -gt 0) {
        Write-Host "   Primeiro produto: $($products.products[0].name)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ API de produtos não está funcionando" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Testar frontend
Write-Host "`n🌐 Testando Frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://${ServerIP}" -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend está funcionando" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend não está acessível" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n🔧 URLs da aplicação:" -ForegroundColor Cyan
Write-Host "   Frontend: http://${ServerIP}" -ForegroundColor White
Write-Host "   Backend API: http://${ServerIP}:4000/api" -ForegroundColor White
Write-Host "   Health Check: http://${ServerIP}:4000/api/health" -ForegroundColor White
Write-Host "   Produtos: http://${ServerIP}:4000/api/products" -ForegroundColor White
