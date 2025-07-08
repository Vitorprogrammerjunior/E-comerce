# Guia de Deployment

## Visão Geral

Este guia cobre o deployment do sistema E-commerce em diferentes ambientes.

## Ambiente de Produção

### Pré-requisitos
- Servidor Linux (Ubuntu 20.04+ recomendado)
- Node.js 18+ instalado
- MySQL 8.0+ instalado
- Nginx para proxy reverso
- SSL Certificate (Let's Encrypt recomendado)
- PM2 para gerenciamento de processos

### 1. Configuração do Servidor

#### Instalar dependências
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Instalar Nginx
sudo apt install nginx -y

# Instalar PM2
sudo npm install -g pm2
```

#### Configurar MySQL
```bash
# Criar banco de dados
sudo mysql -u root -p
CREATE DATABASE ecommerce;
CREATE USER 'ecommerce'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2. Deploy do Backend

#### Clone e configure o projeto
```bash
cd /var/www
sudo git clone <repository-url> ecommerce
sudo chown -R $USER:$USER /var/www/ecommerce
cd /var/www/ecommerce/backend
```

#### Instalar dependências
```bash
npm ci --only=production
```

#### Configurar variáveis de ambiente
```bash
sudo nano .env
```

```env
# Production Environment
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://yourdomain.com

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRES_IN=7d

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=ecommerce
DB_PASSWORD=secure_password
DB_NAME=ecommerce

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com
```

#### Configurar banco de dados
```bash
mysql -u ecommerce -p ecommerce < ../database/01-schema.sql
mysql -u ecommerce -p ecommerce < ../database/02-seed-data.sql
```

#### Configurar PM2
```bash
# Criar arquivo ecosystem
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'ecommerce-backend',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

#### Iniciar aplicação
```bash
mkdir logs
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Deploy do Frontend

#### Build da aplicação
```bash
cd /var/www/ecommerce/frontend
npm ci
npm run build
```

#### Configurar variáveis de ambiente
```bash
nano .env.production
```

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_APP_NAME=E-commerce
```

#### Configurar PM2 para Next.js
```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'ecommerce-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/ecommerce/frontend',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### Iniciar aplicação
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 4. Configurar Nginx

#### Configurar proxy reverso
```bash
sudo nano /etc/nginx/sites-available/ecommerce
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Ativar configuração
```bash
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Configurar SSL com Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Docker Deployment

### 1. Dockerfile para Backend

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 4000

USER node

CMD ["npm", "start"]
```

### 2. Dockerfile para Frontend

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
```

### 3. Docker Compose

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: ecommerce
      MYSQL_USER: ecommerce
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database:/docker-entrypoint-initdb.d
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    environment:
      NODE_ENV: production
      DB_HOST: mysql
      DB_USER: ecommerce
      DB_PASSWORD: password
      DB_NAME: ecommerce
      JWT_SECRET: your-jwt-secret
    depends_on:
      - mysql
    ports:
      - "4000:4000"

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:4000
    depends_on:
      - backend
    ports:
      - "3000:3000"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  mysql_data:
```

## Monitoramento

### 1. PM2 Monitoring

```bash
# Visualizar logs
pm2 logs

# Monitorar recursos
pm2 monit

# Restart aplicação
pm2 restart all

# Verificar status
pm2 status
```

### 2. Logs e Alertas

```bash
# Configurar logrotate
sudo nano /etc/logrotate.d/ecommerce
```

```
/var/www/ecommerce/backend/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
    postrotate
        pm2 reloadLogs
    endscript
}
```

## Backup

### 1. Backup do Banco de Dados

```bash
# Script de backup
nano backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/ecommerce"
DB_NAME="ecommerce"
DB_USER="ecommerce"
DB_PASSWORD="password"

mkdir -p $BACKUP_DIR

mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_DIR/ecommerce_$DATE.sql

# Manter apenas últimos 7 dias
find $BACKUP_DIR -name "*.sql" -type f -mtime +7 -delete

echo "Backup completed: ecommerce_$DATE.sql"
```

### 2. Agendar Backup

```bash
# Adicionar ao crontab
crontab -e

# Backup diário às 2h
0 2 * * * /var/www/ecommerce/scripts/backup.sh
```

## Verificação de Saúde

```bash
# Verificar se serviços estão rodando
sudo systemctl status nginx
sudo systemctl status mysql
pm2 status

# Verificar conectividade
curl -f http://localhost:3000/health
curl -f http://localhost:4000/health
```

## Rollback

```bash
# Fazer rollback usando PM2
pm2 stop all
git checkout previous-version
npm ci
pm2 start ecosystem.config.js
```
