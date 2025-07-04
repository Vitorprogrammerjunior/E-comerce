# Script para testar a aplicação Docker
# Execute este script após o docker-compose up --build

Write-Host "🔍 Testando conectividade dos serviços..." -ForegroundColor Green

# Aguardar alguns segundos para os serviços iniciarem
Write-Host "⏳ Aguardando 15 segundos para os serviços iniciarem..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Testar backend health
Write-Host "`n🔧 Testando Backend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/health" -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend está funcionando (porta 4000)" -ForegroundColor Green
        $content = $response.Content | ConvertFrom-Json
        Write-Host "   Status: $($content.status)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Backend não está respondendo na porta 4000" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Testar produtos API
Write-Host "`n📦 Testando API de Produtos..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/products" -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        $products = $response.Content | ConvertFrom-Json
        Write-Host "✅ API de produtos funcionando" -ForegroundColor Green
        Write-Host "   Produtos encontrados: $($products.products.Count)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ API de produtos não está funcionando" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Testar frontend
Write-Host "`n🌐 Testando Frontend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend está funcionando (porta 80)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend não está respondendo na porta 80" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n🔧 Comandos úteis para troubleshooting:" -ForegroundColor Cyan
Write-Host "1. Ver logs do backend: docker compose logs backend" -ForegroundColor White
Write-Host "2. Ver logs do banco: docker compose logs db" -ForegroundColor White
Write-Host "3. Ver status dos containers: docker compose ps" -ForegroundColor White
Write-Host "4. Testar conexão do banco: docker compose exec db mysql -u user -p'Vitor@56' ecommerce" -ForegroundColor White
Write-Host "5. Entrar no backend: docker compose exec backend sh" -ForegroundColor White
Write-Host "6. Rebuild completo: docker compose down -v && docker compose up --build" -ForegroundColor White
