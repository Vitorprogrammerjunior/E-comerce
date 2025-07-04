# Script para testar a aplicação Docker
# Execute este script após o docker-compose up --build

Write-Host "Testando conectividade dos serviços..." -ForegroundColor Green

# Aguardar alguns segundos para os serviços iniciarem
Start-Sleep -Seconds 10

# Testar backend
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/health" -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend está funcionando (porta 4000)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Backend não está respondendo na porta 4000" -ForegroundColor Red
    Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Testar frontend
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend está funcionando (porta 80)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend não está respondendo na porta 80" -ForegroundColor Red
    Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Testar banco de dados (se tiver cliente mysql instalado)
Write-Host "`nPara testar o banco de dados manualmente:" -ForegroundColor Cyan
Write-Host "mysql -h localhost -P 3306 -u user -p'Vitor@56' ecommerce" -ForegroundColor White

Write-Host "`nSe algum serviço não estiver funcionando:" -ForegroundColor Cyan
Write-Host "1. Verifique os logs: docker compose logs [service-name]" -ForegroundColor White
Write-Host "2. Rebuild: docker compose down -v && docker compose up --build" -ForegroundColor White
