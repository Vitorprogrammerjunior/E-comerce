const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const checkoutRoutes = require('./routes/checkout');
const adminRoutes = require('./routes/admin');

const { errorHandler } = require('./middleware/errorHandler');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());

// Configuração de CORS mais flexível
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.CORS_ORIGIN || 'http://localhost:80',
      'http://134.122.117.211',
      'http://localhost',
      'http://localhost:80'
    ];
    
    // Permitir requests sem origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'E-commerce API is running',
    timestamp: new Date().toISOString()
  });
});

// Endpoints temporários removidos - sistema em produção

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
  console.log(`🗄️  Database Host: ${process.env.DB_HOST}`);
  console.log(`🗄️  Database Name: ${process.env.DB_NAME}`);
  
  // Test database connection with retry logic
  const dbConnection = await testConnection();
  
  if (dbConnection) {
    console.log('🎉 Sistema inicializado com sucesso - banco conectado!');
  } else {
    console.log('⚠️  Sistema inicializado em modo mock - sem banco de dados');
  }
});

module.exports = app;
