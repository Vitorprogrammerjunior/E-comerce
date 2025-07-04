# Comando rápido para aplicar todas as correções

# 1. Rebuild backend com CORS melhorado
echo "🔄 Rebuilding backend..."
docker compose up --build backend -d

# 2. Aguardar backend inicializar  
echo "⏳ Aguardando backend..."
sleep 15

# 3. Rebuild frontend com URLs corretas
echo "🔄 Rebuilding frontend..."
docker compose up --build frontend -d

# 4. Aguardar frontend inicializar
echo "⏳ Aguardando frontend..."
sleep 20

echo "✅ Aplicação deve estar funcionando agora!"
echo "🌐 Acesse: http://134.122.117.211"
