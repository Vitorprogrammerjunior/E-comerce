# Docker Setup for E-commerce Application

Este projeto está configurado para rodar em Docker com um único comando.

## Estrutura Docker

- **Frontend**: Next.js rodando na porta 80
- **Backend**: Node.js API rodando na porta 4000  
- **Database**: MySQL 8 rodando na porta 3306

## Como rodar

### 1. Pré-requisitos
- Docker instalado
- Docker Compose instalado

### 2. Configuração inicial

Certifique-se de que os arquivos `.env` estão configurados:

- `backend/.env` - Configurações do servidor e banco
- `frontend/.env.production` - Configurações do frontend

### 3. Executar a aplicação

```bash
# Construir e iniciar todos os serviços
docker-compose up --build

# Ou rodar em background
docker-compose up --build -d
```

### 4. Acessar a aplicação

- **Frontend**: http://localhost
- **Backend API**: http://localhost:4000
- **MySQL**: localhost:3306

### 5. Comandos úteis

```bash
# Parar todos os serviços
docker-compose down

# Parar e remover volumes (limpar banco)
docker-compose down -v

# Ver logs de um serviço específico
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Executar comandos dentro do container
docker-compose exec backend npm run migrate
docker-compose exec db mysql -u user -p swiftshop
```

### 6. Deploy em Droplet

Para fazer deploy em um Droplet da DigitalOcean:

1. Clone o repositório no servidor
2. Configure as variáveis de ambiente de produção
3. Execute `docker-compose up --build -d`
4. Configure um proxy reverso (nginx) se necessário

### 7. Troubleshooting

- Verifique se as portas 80, 4000 e 3306 estão livres
- Para resetar o banco: `docker-compose down -v && docker-compose up --build`
- Para ver logs em tempo real: `docker-compose logs -f`
