# Scripts de Automação E-commerce

Scripts para facilitar o desenvolvimento, deployment e manutenção do sistema.

## Scripts Disponíveis

### setup.js
Configuração inicial do projeto
- Instala dependências
- Configura variáveis de ambiente
- Executa migrações do banco

### dev.js
Ambiente de desenvolvimento
- Inicia backend e frontend simultaneamente
- Watch mode habilitado
- Hot reload

### build.js
Build de produção
- Build otimizado do frontend
- Verificação de tipos TypeScript
- Compressão de assets

### test.js
Execução de testes
- Testes unitários
- Testes de integração
- Coverage report

### deploy.js
Deploy automatizado
- Build de produção
- Upload para servidor
- Restart de serviços

### backup.js
Backup do banco de dados
- Dump do MySQL
- Compressão
- Upload para storage

### clean.js
Limpeza de arquivos
- Remove node_modules
- Limpa cache
- Remove builds antigos

## Uso

```bash
# Configuração inicial
node scripts/setup.js

# Desenvolvimento
node scripts/dev.js

# Build de produção
node scripts/build.js

# Executar testes
node scripts/test.js

# Deploy
node scripts/deploy.js

# Backup
node scripts/backup.js

# Limpeza
node scripts/clean.js
```

## Configuração

Os scripts usam variáveis de ambiente do arquivo `.env`:

```env
# Scripts Configuration
SCRIPTS_ENV=development
AUTO_INSTALL_DEPS=true
AUTO_MIGRATE_DB=true
BACKUP_DIR=./backups
DEPLOY_SERVER=production-server.com
```
