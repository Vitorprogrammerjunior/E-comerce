/**
 * Script para testar conexão com banco de dados MySQL
 * Usado para verificar se as configurações estão corretas
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

// Configurações do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  charset: 'utf8mb4',
  timezone: '+00:00'
};

/**
 * Testa conexão com o banco de dados
 */
async function testConnection() {
  console.log('🔍 Testando conexão com banco de dados...');
  console.log('📋 Configurações:');
  console.log(`   Host: ${dbConfig.host}`);
  console.log(`   Port: ${dbConfig.port}`);
  console.log(`   User: ${dbConfig.user}`);
  console.log(`   Database: ${dbConfig.database}`);
  console.log(`   Password: ${dbConfig.password ? '[CONFIGURADA]' : '[NÃO CONFIGURADA]'}`);
  
  let connection;
  
  try {
    // Tentar conectar
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Testar consulta simples
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Consulta de teste executada com sucesso!');
    
    // Verificar se tabelas existem
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📊 Tabelas encontradas: ${tables.length}`);
    
    if (tables.length > 0) {
      console.log('📋 Tabelas disponíveis:');
      tables.forEach((table, index) => {
        const tableName = table[`Tables_in_${dbConfig.database}`];
        console.log(`   ${index + 1}. ${tableName}`);
      });
    } else {
      console.log('⚠️  Nenhuma tabela encontrada. Execute os scripts de migração.');
    }
    
    // Testar tabelas principais
    const mainTables = ['users', 'products', 'categories', 'orders', 'cart_items'];
    const existingTables = tables.map(table => table[`Tables_in_${dbConfig.database}`]);
    
    console.log('\n🔍 Verificando tabelas principais:');
    for (const table of mainTables) {
      const exists = existingTables.includes(table);
      console.log(`   ${table}: ${exists ? '✅ Existe' : '❌ Não existe'}`);
    }
    
    // Testar dados de exemplo
    if (existingTables.includes('users')) {
      const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
      console.log(`👥 Total de usuários: ${users[0].count}`);
    }
    
    if (existingTables.includes('products')) {
      const [products] = await connection.execute('SELECT COUNT(*) as count FROM products');
      console.log(`🛍️  Total de produtos: ${products[0].count}`);
    }
    
    if (existingTables.includes('categories')) {
      const [categories] = await connection.execute('SELECT COUNT(*) as count FROM categories');
      console.log(`📂 Total de categorias: ${categories[0].count}`);
    }
    
    console.log('\n🎉 Teste de conexão concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na conexão com banco de dados:');
    console.error(`   Código: ${error.code}`);
    console.error(`   Mensagem: ${error.message}`);
    
    // Sugestões de solução baseadas no erro
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Possíveis soluções:');
      console.log('   1. Verifique se o MySQL está rodando');
      console.log('   2. Confirme o host e porta no arquivo .env');
      console.log('   3. Verifique se não há firewall bloqueando');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Possíveis soluções:');
      console.log('   1. Verifique o usuário e senha no arquivo .env');
      console.log('   2. Confirme se o usuário tem permissões adequadas');
      console.log('   3. Teste a conexão manualmente com mysql -u user -p');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Possíveis soluções:');
      console.log('   1. Crie o banco de dados: CREATE DATABASE ecommerce;');
      console.log('   2. Verifique o nome do banco no arquivo .env');
      console.log('   3. Execute os scripts de migração');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔒 Conexão fechada.');
    }
  }
}

/**
 * Função principal
 */
async function main() {
  try {
    await testConnection();
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { testConnection };
