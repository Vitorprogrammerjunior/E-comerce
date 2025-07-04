# Debug para verificar URLs do frontend
Write-Host "🔍 Verificando configurações do frontend..." -ForegroundColor Green

Write-Host "`n📄 Arquivo .env.production:" -ForegroundColor Cyan
Get-Content "frontend\.env.production" | Write-Host

Write-Host "`n🔧 Configuração no código (api.ts):" -ForegroundColor Cyan
$apiContent = Get-Content "frontend\src\lib\api.ts" | Select-String -Pattern "API_URL|baseURL" | Select-Object -First 3
$apiContent | Write-Host

Write-Host "`n🏗️ Status do build do frontend:" -ForegroundColor Cyan
docker images | Select-String "frontend" | Write-Host

Write-Host "`n📦 Container do frontend:" -ForegroundColor Cyan
docker compose ps frontend | Write-Host

Write-Host "`n💡 Para corrigir o baseURL:" -ForegroundColor Yellow
Write-Host "1. Execute: .\force-frontend-rebuild.ps1" -ForegroundColor White
Write-Host "2. Ou manual: docker compose build --no-cache frontend && docker compose up frontend -d" -ForegroundColor White

Write-Host "`n🌐 URLs que devem funcionar após rebuild:" -ForegroundColor Cyan
Write-Host "   Frontend: http://134.122.117.211" -ForegroundColor White
Write-Host "   Backend: http://134.122.117.211:4000/api/health" -ForegroundColor White
