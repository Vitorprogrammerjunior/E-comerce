# Script para configurar URLs de produção
param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP
)

Write-Host "🔧 Configurando URLs para produção..." -ForegroundColor Green
Write-Host "   IP do servidor: $ServerIP" -ForegroundColor Cyan

# Atualizar frontend .env.production
$frontendEnv = @"
# Next.js Frontend Environment Variables for Production

# API URL pointing to backend service (accessible from browser)
NEXT_PUBLIC_API_URL=http://${ServerIP}:4000/api

# Stripe Public Key (for frontend)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key-here

# App Configuration
NEXT_PUBLIC_APP_NAME=SwiftShop
NEXT_PUBLIC_APP_URL=http://${ServerIP}

# Environment
NODE_ENV=production
"@

$frontendEnv | Out-File -FilePath "frontend\.env.production" -Encoding UTF8
Write-Host "✅ Atualizado frontend/.env.production" -ForegroundColor Green

# Atualizar backend .env
$backendEnvContent = Get-Content "backend\.env" -Raw
$backendEnvContent = $backendEnvContent -replace "CORS_ORIGIN=.*", "CORS_ORIGIN=http://${ServerIP}"
$backendEnvContent = $backendEnvContent -replace "FRONTEND_URL=.*", "FRONTEND_URL=http://${ServerIP}"

$backendEnvContent | Out-File -FilePath "backend\.env" -Encoding UTF8 -NoNewline
Write-Host "✅ Atualizado backend/.env" -ForegroundColor Green

Write-Host "`n🚀 Agora execute:" -ForegroundColor Cyan
Write-Host "   docker compose down" -ForegroundColor White
Write-Host "   docker compose up --build -d" -ForegroundColor White
Write-Host "`n🌐 Aplicação estará disponível em:" -ForegroundColor Cyan
Write-Host "   Frontend: http://${ServerIP}" -ForegroundColor White
Write-Host "   Backend API: http://${ServerIP}:4000" -ForegroundColor White
