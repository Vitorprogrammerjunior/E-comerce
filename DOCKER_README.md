# Docker Setup for E-commerce Application

Este projeto está configurado para rodar em Docker com um único comando.

## Estrutura Docker

- **Frontend**: Next.js rodando na porta 80
- **Backend**: Node.js API rodando na porta 4000  
- **Database**: MySQL 8 rodando na porta 3306 (com inicialização automática do schema)

## Como rodar

### 1. Pré-requisitos
- Docker Desktop instalado e rodando
- Portas 80, 4000 e 3306 livres

### 2. Executar a aplicação

```bash
# Parar containers existentes e limpar volumes
docker compose down -v

# Construir e iniciar todos os serviços
docker compose up --build

# Ou rodar em background
docker compose up --build -d
```

### 3. Testar a aplicação

Execute o script de teste:
```powershell
.\test-services.ps1
```

Ou teste manualmente:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:4000/api/health
- **Backend Products**: http://localhost:4000/api/products

### 4. Troubleshooting

#### Se os produtos não aparecerem:

1. **Verificar logs do backend:**
   ```bash
   docker compose logs backend
   ```

2. **Verificar logs do banco:**
   ```bash
   docker compose logs db
   ```

3. **Testar conectividade do banco:**
   ```bash
   # Entrar no container do backend
   docker compose exec backend sh
   
   # Testar conexão
   curl http://localhost:4000/api/health
   ```

4. **Verificar se as tabelas foram criadas:**
   ```bash
   # Conectar ao MySQL
   docker compose exec db mysql -u user -p'Vitor@56' ecommerce
   
   # Listar tabelas
   SHOW TABLES;
   
   # Verificar produtos
   SELECT COUNT(*) FROM products;
   ```

#### Comandos úteis:

```bash
# Ver status dos containers
docker compose ps

# Parar todos os serviços
docker compose down

# Parar e remover volumes (limpar banco)
docker compose down -v

# Ver logs em tempo real
docker compose logs -f

# Executar comandos dentro do container
docker compose exec backend npm run --version
docker compose exec db mysql -u root -p ecommerce

# Rebuild apenas um serviço
docker compose up --build backend
```

### 5. Configurações importantes

- **Banco de dados**: Inicialização automática com schema e dados de exemplo
- **Healthchecks**: Containers aguardam dependências ficarem prontas
- **Volumes persistentes**: Dados do MySQL são mantidos entre restarts
- **Rede interna**: Containers se comunicam pelos nomes dos serviços

### 6. Deploy em produção

Para deploy em um Droplet da DigitalOcean:

1. Clone o repositório no servidor
2. Configure as variáveis de ambiente de produção nos arquivos .env
3. Execute: `docker compose up --build -d`
4. Configure um proxy reverso (nginx) se necessário
