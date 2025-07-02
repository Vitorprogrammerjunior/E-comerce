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
