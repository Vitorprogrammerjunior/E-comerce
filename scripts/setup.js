#!/usr/bin/env node

/**
 * Script de configuração inicial do projeto E-commerce
 * Instala dependências, configura ambiente e executa migrações
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'cyan') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const error = (message) => {
  console.error(`${colors.red}❌ ${message}${colors.reset}`);
};

const success = (message) => {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
};

const warning = (message) => {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
};

const info = (message) => {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
};

// Interface para input do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
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
 * Verifica se um arquivo existe
 */
const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 * Cria arquivo .env se não existir
 */
const createEnvFile = async (dir, templatePath, envPath) => {
  if (fileExists(envPath)) {
    warning(`Arquivo .env já existe em ${dir}`);
    return;
  }

  if (fileExists(templatePath)) {
    fs.copyFileSync(templatePath, envPath);
    success(`Arquivo .env criado em ${dir}`);
  } else {
    warning(`Template .env não encontrado em ${templatePath}`);
  }
};

/**
 * Configura variáveis de ambiente
 */
const setupEnvironment = async () => {
  log('🔧 Configurando ambiente...', 'magenta');

  // Backend .env
  await createEnvFile(
    'backend',
    path.join(__dirname, '..', 'backend', '.env.example'),
    path.join(__dirname, '..', 'backend', '.env')
  );

  // Frontend .env
  await createEnvFile(
    'frontend',
    path.join(__dirname, '..', 'frontend', '.env.example'),
    path.join(__dirname, '..', 'frontend', '.env.local')
  );

  success('Ambiente configurado!');
};

/**
 * Instala dependências
 */
const installDependencies = async () => {
  log('📦 Instalando dependências...', 'magenta');

  // Backend
  info('Instalando dependências do backend...');
  if (!runCommand('npm install', path.join(__dirname, '..', 'backend'))) {
    error('Falha ao instalar dependências do backend');
    process.exit(1);
  }

  // Frontend
  info('Instalando dependências do frontend...');
  if (!runCommand('npm install', path.join(__dirname, '..', 'frontend'))) {
    error('Falha ao instalar dependências do frontend');
    process.exit(1);
  }

  success('Dependências instaladas com sucesso!');
};

/**
 * Verifica se MySQL está rodando
 */
const checkMySQL = async () => {
  log('🗄️  Verificando MySQL...', 'magenta');

  try {
    execSync('mysqladmin ping', { stdio: 'ignore' });
    success('MySQL está rodando!');
    return true;
  } catch (error) {
    warning('MySQL não está rodando ou não está acessível');
    return false;
  }
};

/**
 * Executa migrações do banco
 */
const runMigrations = async () => {
  log('🗄️  Executando migrações do banco...', 'magenta');

  const mysqlRunning = await checkMySQL();
  if (!mysqlRunning) {
    warning('Pulando migrações - MySQL não disponível');
    return;
  }

  const dbHost = await question('Host do MySQL (localhost): ') || 'localhost';
  const dbUser = await question('Usuário do MySQL (root): ') || 'root';
  const dbPassword = await question('Senha do MySQL: ');
  const dbName = await question('Nome do banco (ecommerce): ') || 'ecommerce';

  try {
    // Criar banco se não existir
    const createDbCommand = `mysql -h ${dbHost} -u ${dbUser} -p${dbPassword} -e "CREATE DATABASE IF NOT EXISTS ${dbName};"`;
    if (runCommand(createDbCommand)) {
      success(`Banco ${dbName} criado/verificado!`);
    }

    // Executar schema
    const schemaPath = path.join(__dirname, '..', 'database', '01-schema.sql');
    if (fileExists(schemaPath)) {
      const schemaCommand = `mysql -h ${dbHost} -u ${dbUser} -p${dbPassword} ${dbName} < ${schemaPath}`;
      if (runCommand(schemaCommand)) {
        success('Schema criado com sucesso!');
      }
    }

    // Executar seed data
    const seedPath = path.join(__dirname, '..', 'database', '02-seed-data.sql');
    if (fileExists(seedPath)) {
      const seedCommand = `mysql -h ${dbHost} -u ${dbUser} -p${dbPassword} ${dbName} < ${seedPath}`;
      if (runCommand(seedCommand)) {
        success('Dados de exemplo inseridos!');
      }
    }

    success('Migrações executadas com sucesso!');
  } catch (error) {
    error('Falha ao executar migrações');
    warning('Execute manualmente os scripts em ./database/');
  }
};

/**
 * Testa conexão com banco
 */
const testConnection = async () => {
  log('🔍 Testando conexão com banco...', 'magenta');

  const testPath = path.join(__dirname, '..', 'backend', 'test-connection.js');
  if (fileExists(testPath)) {
    if (runCommand('node test-connection.js', path.join(__dirname, '..', 'backend'))) {
      success('Conexão testada com sucesso!');
    }
  } else {
    warning('Script de teste não encontrado');
  }
};

/**
 * Configura scripts npm
 */
const setupNpmScripts = () => {
  log('📝 Configurando scripts npm...', 'magenta');

  const rootPackage = path.join(__dirname, '..', 'package.json');
  if (!fileExists(rootPackage)) {
    const packageJson = {
      name: 'ecommerce-system',
      version: '1.0.0',
      description: 'Sistema completo de e-commerce',
      scripts: {
        'install:all': 'npm install && cd backend && npm install && cd ../frontend && npm install',
        'dev': 'concurrently \"npm run dev:backend\" \"npm run dev:frontend\"',
        'dev:backend': 'cd backend && npm run dev',
        'dev:frontend': 'cd frontend && npm run dev',
        'build': 'cd frontend && npm run build',
        'start': 'concurrently \"npm run start:backend\" \"npm run start:frontend\"',
        'start:backend': 'cd backend && npm start',
        'start:frontend': 'cd frontend && npm start',
        'test': 'cd backend && npm test && cd ../frontend && npm test',
        'clean': 'node scripts/clean.js',
        'setup': 'node scripts/setup.js'
      },
      devDependencies: {
        'concurrently': '^7.6.0'
      }
    };

    fs.writeFileSync(rootPackage, JSON.stringify(packageJson, null, 2));
    success('package.json criado na raiz do projeto');
  }

  // Instalar concurrently se não existir
  if (!runCommand('npm install concurrently --save-dev', path.join(__dirname, '..'))) {
    warning('Falha ao instalar concurrently');
  }
};

/**
 * Função principal
 */
const main = async () => {
  console.log(`${colors.bright}${colors.cyan}
  ███████╗      ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗██████╗  ██████╗███████╗
  ██╔════╝     ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔════╝██╔══██╗██╔════╝██╔════╝
  █████╗       ██║     ██║   ██║██╔████╔██║██╔████╔██║█████╗  ██████╔╝██║     █████╗  
  ██╔══╝       ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██╔══██╗██║     ██╔══╝  
  ███████╗     ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║  ██║╚██████╗███████╗
  ╚══════╝      ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝
  ${colors.reset}`);

  log('🚀 Iniciando configuração do projeto E-commerce...', 'bright');

  try {
    await setupEnvironment();
    await installDependencies();
    setupNpmScripts();
    await runMigrations();
    await testConnection();

    success('🎉 Configuração concluída com sucesso!');
    info('');
    info('Próximos passos:');
    info('1. Configure as variáveis de ambiente em backend/.env');
    info('2. Execute: npm run dev');
    info('3. Acesse: http://localhost:3000');
    info('');
    info('Para mais informações, consulte ./docs/README.md');

  } catch (error) {
    error('Falha na configuração do projeto');
    console.error(error);
    process.exit(1);
  } finally {
    rl.close();
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { main };
