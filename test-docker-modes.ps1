# Script para testar diferentes configurações Docker
param(
    [string]$Mode = "normal"
)

Write-Host "🔧 Testando configuração Docker - Modo: $Mode" -ForegroundColor Green

# Parar containers existentes
Write-Host "⏹️ Parando containers existentes..." -ForegroundColor Yellow
docker compose down -v 2>$null

switch ($Mode) {
    "ultra" {
        Write-Host "🚀 Usando docker-compose-ultra-simple.yml" -ForegroundColor Cyan
        docker compose -f docker-compose-ultra-simple.yml up --build
    }
    "simple" {
        Write-Host "🚀 Usando docker-compose-simple.yml" -ForegroundColor Cyan
        docker compose -f docker-compose-simple.yml up --build
    }
    default {
        Write-Host "🚀 Usando docker-compose.yml padrão" -ForegroundColor Cyan
        docker compose up --build
    }
}

Write-Host "`n💡 Se não funcionar, tente:" -ForegroundColor Cyan
Write-Host "   .\test-docker-modes.ps1 -Mode ultra" -ForegroundColor White
Write-Host "   .\test-docker-modes.ps1 -Mode simple" -ForegroundColor White
