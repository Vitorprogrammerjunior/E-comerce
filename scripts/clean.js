#!/usr/bin/env node

/**
 * Script de limpeza do projeto E-commerce
 * Remove arquivos temporários, cache e builds antigos
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'cyan') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const success = (message) => {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
};

const warning = (message) => {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
};

/**
 * Remove diretório recursivamente
 */
const removeDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    success(`Removido: ${dirPath}`);
  } else {
    warning(`Não encontrado: ${dirPath}`);
  }
};

/**
 * Remove arquivo
 */
const removeFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    success(`Removido: ${filePath}`);
  } else {
    warning(`Não encontrado: ${filePath}`);
  }
};

/**
 * Lista arquivos para remover
 */
const getFilesToRemove = () => {
  const baseDir = path.join(__dirname, '..');
  
  return [
    // Arquivos de fix temporários
    'CATEGORY_FILTER_FIX.md',
    'FOOTER_FIX.md', 
    'IMAGE_FIXES.md',
    'IMAGES_AND_REVIEWS_IMPLEMENTATION.md',
    'MIGRATION_COMPLETED.md',
    'MODERN_REDESIGN_REPORT.md',
    'NEXTJS_IMAGE_CONFIG_FIX.md',
    'FIX_COMMANDS.txt',
    
    // Scripts de debug temporários
    'debug-baseurl.ps1',
    'debug-docker.ps1',
    'debug-frontend-issue.ps1',
    'fix-frontend.ps1',
    'fix-mysql-downgrade.ps1',
    'fix-mysql-downgrade.sh',
    'force-frontend-rebuild.ps1',
    'force-frontend-rebuild.sh',
    'test-docker-modes.ps1',
    'test-services.ps1',
    'verify-production.ps1',
    'setup-production.ps1',
    'quick-fix.sh',
    'monitor.sh',
    
    // Docker compose simplificados (manter apenas o principal)
    'docker-compose-simple.yml',
    'docker-compose-ultra-simple.yml'
  ].map(file => path.join(baseDir, file));
};

/**
 * Lista diretórios para remover
 */
const getDirectoriesToRemove = () => {
  const baseDir = path.join(__dirname, '..');
  
  return [
    // Node modules
    path.join(baseDir, 'node_modules'),
    path.join(baseDir, 'backend', 'node_modules'),
    path.join(baseDir, 'frontend', 'node_modules'),
    
    // Build outputs
    path.join(baseDir, 'frontend', '.next'),
    path.join(baseDir, 'frontend', 'dist'),
    path.join(baseDir, 'backend', 'dist'),
    
    // Cache directories
    path.join(baseDir, '.cache'),
    path.join(baseDir, 'backend', '.cache'),
    path.join(baseDir, 'frontend', '.cache'),
    
    // Log directories
    path.join(baseDir, 'logs'),
    path.join(baseDir, 'backend', 'logs'),
    
    // Temp directories
    path.join(baseDir, 'tmp'),
    path.join(baseDir, 'temp')
  ];
};

/**
 * Limpa cache do npm
 */
const cleanNpmCache = () => {
  try {
    log('🧹 Limpando cache do npm...', 'yellow');
    execSync('npm cache clean --force', { stdio: 'inherit' });
    success('Cache do npm limpo!');
  } catch (error) {
    warning('Falha ao limpar cache do npm');
  }
};

/**
 * Reorganiza documentação
 */
const reorganizeDocumentation = () => {
  log('📚 Reorganizando documentação...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const docsDir = path.join(baseDir, 'docs');
  
  // Mover documentação relevante para docs/
  const docsToMove = [
    { from: 'MYSQL_SETUP.md', to: 'DATABASE_SETUP.md' },
    { from: 'DOCKER_README.md', to: 'DOCKER.md' },
    { from: 'copilot-instructions.md', to: 'COPILOT.md' }
  ];
  
  docsToMove.forEach(({ from, to }) => {
    const fromPath = path.join(baseDir, from);
    const toPath = path.join(docsDir, to);
    
    if (fs.existsSync(fromPath)) {
      fs.copyFileSync(fromPath, toPath);
      fs.unlinkSync(fromPath);
      success(`Movido: ${from} → docs/${to}`);
    }
  });
  
  // Mover READMEs específicos
  const readmesToMove = [
    { from: 'database/README.md', to: 'docs/DATABASE.md' },
    { from: 'database/README_MYSQL.md', to: 'docs/DATABASE_MYSQL.md' },
    { from: 'database/README_REVIEWS.md', to: 'docs/DATABASE_REVIEWS.md' }
  ];
  
  readmesToMove.forEach(({ from, to }) => {
    const fromPath = path.join(baseDir, from);
    const toPath = path.join(baseDir, to);
    
    if (fs.existsSync(fromPath)) {
      fs.copyFileSync(fromPath, toPath);
      fs.unlinkSync(fromPath);
      success(`Movido: ${from} → ${to}`);
    }
  });
};

/**
 * Cria .gitignore se não existir
 */
const createGitignore = () => {
  const baseDir = path.join(__dirname, '..');
  const gitignorePath = path.join(baseDir, '.gitignore');
  
  if (!fs.existsSync(gitignorePath)) {
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
.next/
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Cache
.cache/
.npm/
.yarn/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
tmp/
temp/
*.tmp
*.temp

# Database
*.db
*.sqlite
*.sqlite3

# Backup files
*.backup
*.bak

# Coverage reports
coverage/
.nyc_output/

# Docker
.docker/

# Misc
.sass-cache/
.connect.lock
.coverage
.grunt
.lock-wscript
.wafpickle-N
.*.swp
.DS_Store
.project
.settings
.tmtags
.cache
.tmp
.sass-cache
node_modules
npm-debug.log
.npm
.node_repl_history
*.tgz
*.tar.gz
`;
    
    fs.writeFileSync(gitignorePath, gitignoreContent);
    success('Criado .gitignore');
  }
};

/**
 * Função principal
 */
const main = () => {
  log('🧹 Iniciando limpeza do projeto...', 'cyan');
  
  // Remove arquivos desnecessários
  log('📄 Removendo arquivos desnecessários...', 'yellow');
  getFilesToRemove().forEach(removeFile);
  
  // Remove diretórios
  log('📁 Removendo diretórios...', 'yellow');
  getDirectoriesToRemove().forEach(removeDirectory);
  
  // Limpa cache
  cleanNpmCache();
  
  // Reorganiza documentação
  reorganizeDocumentation();
  
  // Cria .gitignore
  createGitignore();
  
  success('🎉 Limpeza concluída!');
  log('💡 Para reinstalar dependências: npm run install:all', 'blue');
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { main };
