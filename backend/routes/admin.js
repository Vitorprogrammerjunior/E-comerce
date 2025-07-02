const express = require('express');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication
// TODO: Add admin role check middleware
router.use(authenticateToken);

// Product management routes
router.get('/products', getAllProducts);           // GET /api/admin/products
router.get('/products/:id', getProduct);          // GET /api/admin/products/:id
router.post('/products', createProduct);          // POST /api/admin/products
router.put('/products/:id', updateProduct);       // PUT /api/admin/products/:id
router.delete('/products/:id', deleteProduct);    // DELETE /api/admin/products/:id

// Category routes
router.get('/categories', getCategories);         // GET /api/admin/categories

module.exports = router;
