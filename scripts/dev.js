#!/usr/bin/env node

/**
 * Script de desenvolvimento para E-commerce
 * Inicia backend e frontend simultaneamente
 */

const { spawn } = require('child_process');
const path = require('path');

// Cores para output
const colors = {
  reset: '\x1b[0m',
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

/**
 * Inicia um processo com cores específicas
 */
const startProcess = (command, args, cwd, color, prefix) => {
  const process = spawn(command, args, { 
    cwd, 
    stdio: 'pipe',
    shell: true 
  });

  process.stdout.on('data', (data) => {
    const output = data.toString();
    output.split('\n').forEach(line => {
      if (line.trim()) {
        console.log(`${colors[color]}[${prefix}]${colors.reset} ${line}`);
      }
    });
  });

  process.stderr.on('data', (data) => {
    const output = data.toString();
    output.split('\n').forEach(line => {
      if (line.trim()) {
        console.log(`${colors.red}[${prefix}]${colors.reset} ${line}`);
      }
    });
  });

  process.on('close', (code) => {
    if (code !== 0) {
      console.log(`${colors.red}[${prefix}] Processo encerrado com código ${code}${colors.reset}`);
    }
  });

  return process;
};

/**
 * Função principal
 */
const main = () => {
  console.log(`${colors.cyan}
  ██████╗ ███████╗██╗   ██╗    ███╗   ███╗ ██████╗ ██████╗ ███████╗
  ██╔══██╗██╔════╝██║   ██║    ████╗ ████║██╔═══██╗██╔══██╗██╔════╝
  ██║  ██║█████╗  ██║   ██║    ██╔████╔██║██║   ██║██║  ██║█████╗  
  ██║  ██║██╔══╝  ╚██╗ ██╔╝    ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  
  ██████╔╝███████╗ ╚████╔╝     ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗
  ╚═════╝ ╚══════╝  ╚═══╝      ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
  ${colors.reset}`);

  log('🚀 Iniciando modo de desenvolvimento...', 'cyan');
  
  const baseDir = path.join(__dirname, '..');
  const backendDir = path.join(baseDir, 'backend');
  const frontendDir = path.join(baseDir, 'frontend');

  // Verificar se os diretórios existem
  const fs = require('fs');
  if (!fs.existsSync(backendDir)) {
    console.error(`${colors.red}❌ Diretório backend não encontrado: ${backendDir}${colors.reset}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(frontendDir)) {
    console.error(`${colors.red}❌ Diretório frontend não encontrado: ${frontendDir}${colors.reset}`);
    process.exit(1);
  }

  // Iniciar processos
  log('🔧 Iniciando backend...', 'yellow');
  const backend = startProcess('npm', ['run', 'dev'], backendDir, 'blue', 'BACKEND');

  log('⚛️  Iniciando frontend...', 'yellow');
  const frontend = startProcess('npm', ['run', 'dev'], frontendDir, 'green', 'FRONTEND');

  // Informações úteis
  setTimeout(() => {
    console.log(`
${colors.cyan}🎉 Serviços iniciados com sucesso!${colors.reset}

${colors.green}Frontend:${colors.reset} http://localhost:3000
${colors.blue}Backend:${colors.reset}  http://localhost:4000

${colors.yellow}Comandos úteis:${colors.reset}
• Ctrl+C para parar ambos os serviços
• Logs do backend em azul
• Logs do frontend em verde

${colors.magenta}Dicas:${colors.reset}
• Hot reload habilitado
• Mudanças são aplicadas automaticamente
• Verifique os logs para erros
    `);
  }, 3000);

  // Tratar encerramento
  process.on('SIGINT', () => {
    log('🛑 Encerrando serviços...', 'yellow');
    backend.kill('SIGINT');
    frontend.kill('SIGINT');
    
    setTimeout(() => {
      log('👋 Serviços encerrados!', 'cyan');
      process.exit(0);
    }, 1000);
  });

  // Manter o processo principal vivo
  process.stdin.resume();
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { main };
