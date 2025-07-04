# Script para debug do Docker Compose
Write-Host "🔍 Verificando status dos containers..." -ForegroundColor Green

# Verificar containers em execução
Write-Host "`n📋 Status dos containers:" -ForegroundColor Cyan
docker compose ps

# Verificar logs do banco
Write-Host "`n🗄️ Logs do banco de dados (últimas 20 linhas):" -ForegroundColor Cyan
docker compose logs --tail=20 db

# Verificar logs do backend
Write-Host "`n🔧 Logs do backend (últimas 20 linhas):" -ForegroundColor Cyan
docker compose logs --tail=20 backend

# Tentar conectar diretamente ao MySQL
Write-Host "`n🔌 Testando conexão direta ao MySQL..." -ForegroundColor Cyan
try {
    # Testar se a porta está aberta
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    $tcpClient.Connect("localhost", 3306)
    $tcpClient.Close()
    Write-Host "✅ Porta 3306 está acessível" -ForegroundColor Green
} catch {
    Write-Host "❌ Porta 3306 não está acessível" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n💡 Comandos úteis:" -ForegroundColor Cyan
Write-Host "1. Ver logs em tempo real: docker compose logs -f" -ForegroundColor White
Write-Host "2. Entrar no container do banco: docker compose exec db bash" -ForegroundColor White
Write-Host "3. Reiniciar apenas o backend: docker compose restart backend" -ForegroundColor White
Write-Host "4. Rebuild completo: docker compose down -v && docker compose up --build" -ForegroundColor White
