require('dotenv').config();
const mysql = require('mysql2/promise');

const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Configuração da conexão com MySQL
const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

// Função para testar conexão
const testConnection = async () => {
  try {
    if (!config.database.host || !config.database.database) {
      console.log('⚠️  Database configuration not complete. Using mock data.');
      return null;
    }
    
    const connection = await pool.getConnection();
    console.log('✅ Conexão com MySQL estabelecida com sucesso');
    connection.release();
    return pool;
  } catch (error) {
    console.error('❌ Erro ao conectar com MySQL:', error.message);
    console.log('⚠️  Continuando com dados mock...');
    return null;
  }
};

// Função para executar queries
const query = async (text, params = []) => {
  try {
    const start = Date.now();
    const [rows, fields] = await pool.execute(text, params);
    const duration = Date.now() - start;
    
    if (config.nodeEnv === 'development') {
      console.log('Query executada:', { 
        text: text.substring(0, 100) + '...', 
        duration, 
        affectedRows: rows.affectedRows || rows.length 
      });
    }
    
    // Retornar no formato compatível com a destructuring usada no controller
    return [rows, fields];
  } catch (error) {
    console.error('Erro na query:', error.message);
    throw error;
  }
};

// Função para transações
const transaction = async (callback) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🔄 Fechando conexões com o banco...');
  pool.end().then(() => {
    console.log('✅ Pool de conexões encerrado');
    process.exit(0);
  });
});

module.exports = {
  config,
  pool,
  query,
  transaction,
  testConnection
};
