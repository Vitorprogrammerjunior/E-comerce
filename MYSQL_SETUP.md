# Configuração do MySQL - E-commerce

## ✅ Status da Migração para MySQL

### Arquivos Adaptados
- [x] `database/schema.sql` - Convertido de PostgreSQL para MySQL
- [x] `database/seed-data.sql` - Convertido de PostgreSQL para MySQL  
- [x] `backend/config/database.js` - Adaptado para usar mysql2
- [x] `backend/package.json` - Dependência mysql2 adicionada
- [x] `backend/.env.example` - Configurações MySQL
- [x] `backend/.env` - Configurações MySQL
- [x] `database/README.md` - Instruções atualizadas para MySQL
- [x] `README.md` principal - Atualizado para MySQL

### Principais Mudanças Realizadas

#### 1. Schema SQL (PostgreSQL → MySQL)
- `SERIAL` → `INT AUTO_INCREMENT`
- `REFERENCES table(id)` → `FOREIGN KEY (col) REFERENCES table(id)`
- `JSONB` → `JSON`
- `TEXT[]` → `JSON` (arrays)
- Triggers e funções adaptadas para sintaxe MySQL
- Índices full-text adaptados

#### 2. Dados de Teste
- `TRUNCATE ... RESTART IDENTITY CASCADE` → `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE ...`
- Arrays JSON PostgreSQL → `JSON_ARRAY()` MySQL
- Sintaxe de inserção JSON adaptada

#### 3. Backend
- `pg` (PostgreSQL) → `mysql2` 
- Pool de conexões adaptado
- Queries adaptadas para MySQL
- Variáveis de ambiente atualizadas

## 🚀 Como Criar o Banco

### 1. Instalar MySQL
```bash
# Windows (usando Chocolatey)
choco install mysql

# Ubuntu/Debian
sudo apt install mysql-server

# macOS (usando Homebrew)
brew install mysql
```

### 2. Criar o Banco de Dados
```sql
-- Conectar ao MySQL como root
mysql -u root -p

-- Criar o banco
CREATE DATABASE ecommerce;

-- Criar um usuário específico (opcional mas recomendado)
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;

-- Sair
EXIT;
```

### 3. Executar os Scripts
```bash
# Executar o schema (estrutura das tabelas)
mysql -u root -p ecommerce < database/schema.sql

# Executar os dados de teste (opcional)
mysql -u root -p ecommerce < database/seed-data.sql
```

### 4. Configurar o Backend
Atualizar o arquivo `backend/.env`:
```env
# Database Configuration - MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=ecommerce
```

### 5. Instalar Dependências e Iniciar
```bash
cd backend
npm install
npm run dev
```

## 🔍 Verificação

### Testar Conexão
O backend tentará conectar automaticamente. Verifique o console:
- ✅ "Conexão com MySQL estabelecida com sucesso"
- ❌ "Erro ao conectar com MySQL" (verificar configurações)

### Testar API
```bash
# Testar endpoint de produtos
curl http://localhost:4000/api/products

# Testar endpoint de categorias  
curl http://localhost:4000/api/products/categories
```

### Verificar Dados no MySQL
```sql
-- Conectar ao banco
mysql -u root -p ecommerce

-- Verificar tabelas criadas
SHOW TABLES;

-- Verificar dados inseridos
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM users;
```

## 🛠️ Comandos Úteis

### Backup do Banco
```bash
mysqldump -u root -p ecommerce > backup_ecommerce.sql
```

### Restaurar Backup
```bash
mysql -u root -p ecommerce < backup_ecommerce.sql
```

### Reset Complete
```bash
# Apagar e recriar o banco
mysql -u root -p -e "DROP DATABASE IF EXISTS ecommerce; CREATE DATABASE ecommerce;"

# Reexecutar scripts
mysql -u root -p ecommerce < database/schema.sql
mysql -u root -p ecommerce < database/seed-data.sql
```

## 🚨 Solução de Problemas

### Erro de Conexão
1. Verificar se o MySQL está rodando: `sudo systemctl status mysql`
2. Verificar credenciais no `.env`
3. Verificar se o banco existe: `SHOW DATABASES;`

### Erro de Sintaxe SQL
1. Verificar compatibilidade da versão MySQL (recomendado 8.0+)
2. Executar scripts um de cada vez para identificar linha do erro

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## ✨ Status Final

**🎉 TUDO PRONTO!** O projeto está completamente adaptado para MySQL e pronto para uso.

### Próximos Passos
1. Criar o banco MySQL (`CREATE DATABASE ecommerce;`)
2. Executar o schema (`mysql -u root -p ecommerce < database/schema.sql`)
3. Executar os dados de teste (`mysql -u root -p ecommerce < database/seed-data.sql`)
4. Configurar o `.env` com suas credenciais MySQL
5. Iniciar o backend (`npm run dev`)
6. Iniciar o frontend (`npm run dev`)

**Pronto para desenvolvimento! 🚀**
