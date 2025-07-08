#!/usr/bin/env node

/**
 * Script de build para produção
 * Executa build otimizado do frontend e backend
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

const error = (message) => {
  console.error(`${colors.red}❌ ${message}${colors.reset}`);
};

/**
 * Executa comando com tratamento de erro
 */
const runCommand = (command, cwd = process.cwd()) => {
  try {
    log(`Executando: ${command}`, 'yellow');
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    error(`Falha ao executar: ${command}`);
    return false;
  }
};

/**
 * Verifica se arquivo existe
 */
const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 * Cria diretório se não existir
 */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Verifica dependências
 */
const checkDependencies = () => {
  log('🔍 Verificando dependências...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const backendDir = path.join(baseDir, 'backend');
  const frontendDir = path.join(baseDir, 'frontend');
  
  // Verificar node_modules
  if (!fileExists(path.join(backendDir, 'node_modules'))) {
    error('Dependências do backend não instaladas');
    log('Execute: cd backend && npm install', 'blue');
    return false;
  }
  
  if (!fileExists(path.join(frontendDir, 'node_modules'))) {
    error('Dependências do frontend não instaladas');
    log('Execute: cd frontend && npm install', 'blue');
    return false;
  }
  
  success('Dependências verificadas!');
  return true;
};

/**
 * Executa linting
 */
const runLinting = () => {
  log('🔍 Executando linting...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const frontendDir = path.join(baseDir, 'frontend');
  
  // Frontend linting
  if (fileExists(path.join(frontendDir, 'eslint.config.mjs'))) {
    if (!runCommand('npm run lint', frontendDir)) {
      error('Linting falhou no frontend');
      return false;
    }
  }
  
  success('Linting concluído!');
  return true;
};

/**
 * Executa verificação de tipos TypeScript
 */
const runTypeCheck = () => {
  log('🔍 Verificando tipos TypeScript...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const frontendDir = path.join(baseDir, 'frontend');
  
  // Frontend type checking
  if (fileExists(path.join(frontendDir, 'tsconfig.json'))) {
    if (!runCommand('npx tsc --noEmit', frontendDir)) {
      error('Verificação de tipos falhou no frontend');
      return false;
    }
  }
  
  success('Verificação de tipos concluída!');
  return true;
};

/**
 * Executa testes
 */
const runTests = () => {
  log('🧪 Executando testes...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const backendDir = path.join(baseDir, 'backend');
  const frontendDir = path.join(baseDir, 'frontend');
  
  // Backend tests
  if (fileExists(path.join(backendDir, 'package.json'))) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(backendDir, 'package.json')));
    if (packageJson.scripts && packageJson.scripts.test) {
      if (!runCommand('npm test', backendDir)) {
        error('Testes falharam no backend');
        return false;
      }
    }
  }
  
  // Frontend tests
  if (fileExists(path.join(frontendDir, 'package.json'))) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(frontendDir, 'package.json')));
    if (packageJson.scripts && packageJson.scripts.test) {
      if (!runCommand('npm test', frontendDir)) {
        error('Testes falharam no frontend');
        return false;
      }
    }
  }
  
  success('Testes concluídos!');
  return true;
};

/**
 * Build do frontend
 */
const buildFrontend = () => {
  log('⚛️  Fazendo build do frontend...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const frontendDir = path.join(baseDir, 'frontend');
  
  // Limpar build anterior
  const buildDir = path.join(frontendDir, '.next');
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }
  
  // Executar build
  if (!runCommand('npm run build', frontendDir)) {
    error('Build do frontend falhou');
    return false;
  }
  
  success('Build do frontend concluído!');
  return true;
};

/**
 * Prepara backend para produção
 */
const prepareBackend = () => {
  log('🔧 Preparando backend para produção...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const backendDir = path.join(baseDir, 'backend');
  
  // Instalar apenas dependências de produção
  if (!runCommand('npm ci --only=production', backendDir)) {
    error('Falha ao instalar dependências de produção');
    return false;
  }
  
  success('Backend preparado para produção!');
  return true;
};

/**
 * Gera relatório de build
 */
const generateBuildReport = () => {
  log('📊 Gerando relatório de build...', 'yellow');
  
  const baseDir = path.join(__dirname, '..');
  const buildDir = path.join(baseDir, 'build');
  const reportPath = path.join(buildDir, 'build-report.json');
  
  ensureDir(buildDir);
  
  const report = {
    timestamp: new Date().toISOString(),
    version: require('../package.json').version || '1.0.0',
    frontend: {
      framework: 'Next.js 15',
      language: 'TypeScript',
      buildSize: 'N/A'
    },
    backend: {
      framework: 'Express.js',
      language: 'JavaScript',
      nodeVersion: process.version
    },
    status: 'success'
  };
  
  // Verificar tamanho do build do frontend
  const frontendBuildDir = path.join(baseDir, 'frontend', '.next');
  if (fs.existsSync(frontendBuildDir)) {
    const stats = fs.statSync(frontendBuildDir);
    report.frontend.buildSize = `${(stats.size / 1024 / 1024).toFixed(2)} MB`;
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  success(`Relatório gerado: ${reportPath}`);
};

/**
 * Função principal
 */
const main = () => {
  console.log(`${colors.cyan}
  ██████╗ ██╗   ██╗██╗██╗     ██████╗ 
  ██╔══██╗██║   ██║██║██║     ██╔══██╗
  ██████╔╝██║   ██║██║██║     ██║  ██║
  ██╔══██╗██║   ██║██║██║     ██║  ██║
  ██████╔╝╚██████╔╝██║███████╗██████╔╝
  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ 
  ${colors.reset}`);

  log('🚀 Iniciando build de produção...', 'cyan');
  
  const startTime = Date.now();
  
  try {
    // Verificações pré-build
    if (!checkDependencies()) process.exit(1);
    if (!runLinting()) process.exit(1);
    if (!runTypeCheck()) process.exit(1);
    if (!runTests()) process.exit(1);
    
    // Build
    if (!buildFrontend()) process.exit(1);
    if (!prepareBackend()) process.exit(1);
    
    // Relatório
    generateBuildReport();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    success(`🎉 Build concluído com sucesso em ${duration}s!`);
    
    log('', 'cyan');
    log('📁 Arquivos de build:', 'cyan');
    log('   Frontend: ./frontend/.next/', 'blue');
    log('   Backend:  ./backend/', 'blue');
    log('   Relatório: ./build/build-report.json', 'blue');
    log('', 'cyan');
    log('🚀 Próximos passos:', 'cyan');
    log('   1. Testar build localmente', 'blue');
    log('   2. Configurar variáveis de ambiente', 'blue');
    log('   3. Fazer deploy para produção', 'blue');
    
  } catch (error) {
    error('Falha no build de produção');
    console.error(error);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { main };
