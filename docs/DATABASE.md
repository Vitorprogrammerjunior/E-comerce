# 🗄️ Configuração do Banco de Dados MySQL

Este projeto utiliza **MySQL** como banco de dados principal.

## 📋 Pré-requisitos

1. **MySQL Server** instalado (versão 8.0 ou superior recomendada)
2. **MySQL Workbench** ou cliente MySQL de sua preferência
3. **Node.js** configurado no projeto backend

## 🚀 Configuração Rápida

### 1. Instalar MySQL
```bash
# Windows (com Chocolatey)
choco install mysql

# macOS (com Homebrew)
brew install mysql

# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# Iniciar serviço MySQL
# Windows: Serviços do Windows > MySQL80
# macOS/Linux: sudo systemctl start mysql
```

### 2. Criar Banco de Dados
```sql
-- Conectar ao MySQL como root
mysql -u root -p

-- Criar banco de dados
CREATE DATABASE ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Criar usuário (opcional, mais seguro)
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;

-- Usar o banco criado
USE ecommerce;
```

### 3. Executar Schema
```bash
# No terminal, dentro da pasta do projeto
mysql -u root -p ecommerce < database/schema.sql
```

### 4. Inserir Dados de Teste
```bash
mysql -u root -p ecommerce < database/seed-data.sql
```

### 5. Configurar Backend
```bash
# Instalar dependência MySQL no backend
cd backend
npm install mysql2

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações
```

Exemplo de configuração `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=ecommerce
```

## 📊 Estrutura do Banco

### Tabelas Principais
- **users** - Usuários do sistema
- **user_addresses** - Endereços dos usuários
- **categories** - Categorias de produtos
- **products** - Produtos do e-commerce
- **product_reviews** - Avaliações dos produtos
- **cart_items** - Itens no carrinho
- **orders** - Pedidos realizados
- **order_items** - Itens dos pedidos

### Recursos Utilizados
- **JSON** - Para campos complexos (images, features, specifications)
- **Triggers** - Atualização automática de ratings
- **Índices** - Otimização de consultas
- **Foreign Keys** - Integridade referencial
- **Views** - Consultas simplificadas

## 🔧 Comandos Úteis

### Verificar Status
```sql
-- Verificar se as tabelas foram criadas
SHOW TABLES;

-- Verificar estrutura de uma tabela
DESCRIBE products;

-- Contar registros
SELECT 
    'Usuários' as tabela, COUNT(*) as total FROM users
UNION ALL
SELECT 'Produtos', COUNT(*) FROM products
UNION ALL
SELECT 'Pedidos', COUNT(*) FROM orders;
```

### Backup e Restore
```bash
# Fazer backup
mysqldump -u root -p ecommerce > backup_ecommerce.sql

# Restaurar backup
mysql -u root -p ecommerce < backup_ecommerce.sql
```

### Reset Completo
```sql
-- CUIDADO: Apaga todos os dados
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce;

-- Depois execute novamente schema.sql e seed-data.sql
```

## 🔐 Configuração de Produção

### Usuário Específico
```sql
-- Criar usuário específico para produção
CREATE USER 'ecommerce_prod'@'%' IDENTIFIED BY 'senha_muito_segura';
GRANT SELECT, INSERT, UPDATE, DELETE ON ecommerce.* TO 'ecommerce_prod'@'%';
FLUSH PRIVILEGES;
```

### Configurações Recomendadas
```sql
-- Configurações de performance (my.cnf)
[mysqld]
innodb_buffer_pool_size = 1G
max_connections = 200
query_cache_size = 128M
innodb_log_file_size = 256M
```

## 📝 Queries de Exemplo

### Produtos Populares
```sql
SELECT 
    p.name,
    p.price,
    p.rating,
    p.sold_count,
    c.name as category
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
ORDER BY p.sold_count DESC, p.rating DESC
LIMIT 10;
```

### Pedidos por Status
```sql
SELECT 
    status,
    COUNT(*) as quantidade,
    SUM(total) as valor_total
FROM orders
GROUP BY status
ORDER BY quantidade DESC;
```

### Busca de Produtos (Full-Text)
```sql
-- Busca usando índice FULLTEXT
SELECT *
FROM products
WHERE MATCH(name, description) AGAINST('smartphone camera' IN NATURAL LANGUAGE MODE)
AND is_active = true;
```

## 🚨 Problemas Comuns

### Erro de Conexão
```bash
# Verificar se MySQL está rodando
sudo systemctl status mysql

# Verificar porta
netstat -tlnp | grep :3306
```

### Erro de Charset
```sql
-- Verificar charset do banco
SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME 
FROM information_schema.SCHEMATA 
WHERE SCHEMA_NAME = 'ecommerce';

-- Corrigir se necessário
ALTER DATABASE ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Erro de Foreign Key
```sql
-- Verificar foreign keys
SELECT * FROM information_schema.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_SCHEMA = 'ecommerce';

-- Desabilitar temporariamente (apenas para debug)
SET FOREIGN_KEY_CHECKS = 0;
-- ... suas operações ...
SET FOREIGN_KEY_CHECKS = 1;
```

## 📈 Monitoramento

### Consultas Úteis
```sql
-- Ver queries em execução
SHOW PROCESSLIST;

-- Status do servidor
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Innodb_buffer_pool%';

-- Tabelas com mais registros
SELECT 
    table_name,
    table_rows
FROM information_schema.tables
WHERE table_schema = 'ecommerce'
ORDER BY table_rows DESC;
```

## 🎯 Next Steps

1. **Performance**: Configure índices adicionais conforme necessário
2. **Backup**: Configure backup automático
3. **Monitoring**: Configure alertas de performance
4. **Scaling**: Considere réplicas para leitura
5. **Security**: Configure SSL e firewall

---

Para mais informações sobre MySQL, consulte a [documentação oficial](https://dev.mysql.com/doc/).

## Pré-requisitos

### PostgreSQL
- PostgreSQL 13+ instalado
- Cliente psql ou pgAdmin
- Usuário com privilégios para criar banco

### Alternativas
- **Docker**: `docker run --name postgres-ecommerce -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres:15`
- **Supabase**: Banco PostgreSQL gratuito na nuvem
- **Railway**: Hosting PostgreSQL com plano gratuito

## Passo a Passo

### 1. Criar o Banco de Dados

```sql
-- Conectar como superuser (postgres)
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

-- Conectar ao banco ecommerce_db
\c ecommerce_db;
GRANT ALL ON SCHEMA public TO ecommerce_user;
```

### 2. Executar o Schema Principal

```bash
# Via psql
psql -h localhost -U ecommerce_user -d ecommerce_db -f database/schema.sql

# Ou copiar e colar o conteúdo no pgAdmin
```

### 3. Inserir Dados de Teste

```bash
# Via psql  
psql -h localhost -U ecommerce_user -d ecommerce_db -f database/seed-data.sql

# Ou executar no pgAdmin/cliente SQL
```

### 4. Configurar Variáveis de Ambiente

#### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=ecommerce_user
DB_PASSWORD=sua_senha_aqui
DB_SSL=false

# Ou URL completa
DATABASE_URL=postgresql://ecommerce_user:sua_senha_aqui@localhost:5432/ecommerce_db

# Outras variáveis
PORT=4000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
NODE_ENV=development
```

## Configurações para Produção

### Supabase (Gratuito)
1. Criar conta em [supabase.com](https://supabase.com)
2. Criar novo projeto
3. Ir em SQL Editor e executar o schema.sql
4. Executar seed-data.sql para dados de teste
5. Copiar a connection string

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

### Railway
1. Criar conta em [railway.app](https://railway.app)
2. Criar novo projeto PostgreSQL
3. Conectar e executar os scripts SQL
4. Usar a connection string fornecida

### Heroku Postgres
```bash
# Adicionar addon
heroku addons:create heroku-postgresql:mini

# Executar migrations
heroku pg:psql < database/schema.sql
heroku pg:psql < database/seed-data.sql
```

## Estrutura das Tabelas

### Principais Entidades
- **users**: Usuários do sistema
- **categories**: Categorias de produtos
- **products**: Catálogo de produtos
- **cart_items**: Itens no carrinho
- **orders**: Pedidos realizados
- **order_items**: Itens dos pedidos
- **product_reviews**: Avaliações dos produtos
- **user_addresses**: Endereços dos usuários

### Relacionamentos
```
users (1:N) user_addresses
users (1:N) cart_items
users (1:N) orders
users (1:N) product_reviews

categories (1:N) products
categories (1:N) categories (self-reference)

products (1:N) cart_items
products (1:N) order_items
products (1:N) product_reviews

orders (1:N) order_items
```

## Dados de Teste Incluídos

### Usuários (senha: 123456)
- admin@ecommerce.com
- joao@email.com  
- maria@email.com
- pedro@email.com
- ana@email.com

### Produtos
- 11 produtos em diferentes categorias
- Preços realistas
- Imagens do Unsplash
- Avaliações e reviews
- Dados de estoque

### Pedidos
- 3 pedidos de exemplo
- Diferentes status (entregue, enviado, processando)
- Múltiplos métodos de pagamento

## Queries Úteis para Desenvolvimento

### Verificar dados
```sql
-- Contagem geral
SELECT 'users' as tabela, COUNT(*) FROM users
UNION ALL SELECT 'products', COUNT(*) FROM products
UNION ALL SELECT 'orders', COUNT(*) FROM orders;

-- Produtos mais vendidos
SELECT name, sold_count, rating FROM products 
ORDER BY sold_count DESC LIMIT 5;

-- Pedidos recentes
SELECT order_number, status, total, created_at 
FROM orders ORDER BY created_at DESC LIMIT 10;
```

### Resetar dados
```sql
-- Limpar apenas dados, manter estrutura
TRUNCATE TABLE order_items, orders, cart_items, 
product_reviews, products, categories, 
user_addresses, users RESTART IDENTITY CASCADE;

-- Reexecutar seed-data.sql
```

## Integração com o Backend

### Instalar Driver PostgreSQL
```bash
cd backend
npm install pg
npm install --save-dev @types/pg
```

### Configurar Conexão
```javascript
// config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
```

### Exemplo de Query
```javascript
// controllers/productController.js
const pool = require('../config/database');

exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = true 
      ORDER BY p.created_at DESC
    `);
    
    res.json({ success: true, products: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

## Backup e Restore

### Backup
```bash
# Backup completo
pg_dump -h localhost -U ecommerce_user ecommerce_db > backup.sql

# Apenas dados
pg_dump -h localhost -U ecommerce_user --data-only ecommerce_db > data-backup.sql
```

### Restore
```bash
# Restore completo
psql -h localhost -U ecommerce_user -d ecommerce_db < backup.sql

# Apenas dados
psql -h localhost -U ecommerce_user -d ecommerce_db < data-backup.sql
```

## Troubleshooting

### Erro de Conexão
- Verificar se PostgreSQL está rodando
- Conferir host, porta, usuário e senha
- Testar conexão: `psql -h localhost -U ecommerce_user -d ecommerce_db`

### Erro de Permissão
```sql
-- Dar todas as permissões ao usuário
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecommerce_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ecommerce_user;
```

### Performance
- Os índices já estão criados no schema
- Para mais performance, considere adicionar índices específicos conforme uso
- Monitor slow queries: `log_min_duration_statement = 1000` no postgresql.conf

## Próximos Passos

1. **Substituir dados mock**: Modificar controllers para usar PostgreSQL
2. **Migrations**: Implementar sistema de migrations para mudanças futuras
3. **Seeds**: Criar seeds mais robustos para diferentes ambientes
4. **Monitoring**: Implementar logs e métricas de banco
5. **Backup automático**: Configurar backups regulares em produção
