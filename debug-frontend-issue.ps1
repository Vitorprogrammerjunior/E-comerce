# Script para debug específico do problema atual
Write-Host "🔍 Diagnosticando problema do frontend..." -ForegroundColor Green

$serverIP = "134.122.117.211"

# 1. Verificar se o backend está acessível externamente
Write-Host "`n1. 🔧 Testando Backend Externamente..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://${serverIP}:4000/api/health" -TimeoutSec 10
    Write-Host "✅ Backend acessível: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend não acessível externamente" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   Verifique se a porta 4000 está aberta no firewall" -ForegroundColor Yellow
}

# 2. Testar API de produtos featured
Write-Host "`n2. 📦 Testando API Featured Products..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://${serverIP}:4000/api/products/featured" -TimeoutSec 10
    Write-Host "✅ API Featured Products funcionando" -ForegroundColor Green
    Write-Host "   Produtos encontrados: $($response.products.Count)" -ForegroundColor White
} catch {
    Write-Host "❌ API Featured Products com erro" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

# 3. Verificar se o frontend foi rebuilded
Write-Host "`n3. 🌐 Verificando Frontend Build..." -ForegroundColor Cyan
$frontendEnv = Get-Content "frontend\.env.production" | Select-String "NEXT_PUBLIC_API_URL"
Write-Host "   Configuração atual: $frontendEnv" -ForegroundColor White

# 4. Testar CORS
Write-Host "`n4. 🔒 Testando CORS..." -ForegroundColor Cyan
try {
    $headers = @{
        'Origin' = "http://${serverIP}"
        'Access-Control-Request-Method' = 'GET'
    }
    $response = Invoke-WebRequest -Uri "http://${serverIP}:4000/api/health" -Headers $headers -TimeoutSec 10
    Write-Host "✅ CORS configurado corretamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Possível problema de CORS" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n💡 Soluções possíveis:" -ForegroundColor Cyan
Write-Host "1. Rebuild do frontend: docker compose up --build frontend -d" -ForegroundColor White
Write-Host "2. Verificar firewall: sudo ufw allow 4000" -ForegroundColor White
Write-Host "3. Restart completo: docker compose down && docker compose up --build -d" -ForegroundColor White
Write-Host "4. Verificar logs: docker compose logs backend" -ForegroundColor White
