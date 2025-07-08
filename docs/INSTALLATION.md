# Guia de Instalação

## Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn
- MySQL 8.0 ou superior
- Git

## Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd E-commerce
```

### 2. Configuração do Backend

#### Instalar dependências
```bash
cd backend
npm install
```

#### Configurar variáveis de ambiente
Crie o arquivo `.env` no diretório `backend/`:

```env
# Server Configuration
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=ecommerce

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Configurar banco de dados
```bash
# Executar scripts SQL
mysql -u root -p < database/01-schema.sql
mysql -u root -p < database/02-seed-data.sql
```

### 3. Configuração do Frontend

#### Instalar dependências
```bash
cd frontend
npm install
```

#### Configurar variáveis de ambiente
Crie o arquivo `.env.local` no diretório `frontend/`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000

# App Configuration
NEXT_PUBLIC_APP_NAME=E-commerce
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Executar o Sistema

### 1. Iniciar o Backend
```bash
cd backend
npm run dev
```

### 2. Iniciar o Frontend
```bash
cd frontend
npm run dev
```

### 3. Acessar a aplicação
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Verificação da Instalação

### Testar conexão com banco de dados
```bash
cd backend
node test-connection.js
```

### Executar testes
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## Solução de Problemas

### Erro de conexão com MySQL
1. Verifique se o MySQL está rodando
2. Confirme as credenciais no arquivo `.env`
3. Certifique-se de que o banco de dados existe

### Erro de porta em uso
1. Verifique se as portas 3000 e 4000 estão disponíveis
2. Altere as portas nos arquivos de configuração se necessário

### Erro de dependências
1. Limpe o cache do npm: `npm cache clean --force`
2. Remova node_modules: `rm -rf node_modules`
3. Reinstale: `npm install`

## Configuração de Desenvolvimento

### Configurar Git Hooks
```bash
# Instalar husky para hooks
npm install --save-dev husky
npx husky init
```

### Configurar ESLint e Prettier
```bash
# Frontend
cd frontend
npm install --save-dev eslint prettier
```

### Configurar Jest para testes
```bash
# Backend
cd backend
npm install --save-dev jest supertest
```

## Próximos Passos

1. Execute `npm run dev` em ambos os diretórios
2. Acesse http://localhost:3000
3. Teste as funcionalidades principais
4. Consulte a documentação da API em `/docs/API.md`
