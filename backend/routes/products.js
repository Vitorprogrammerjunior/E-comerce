const express = require('express');
const { 
  getProducts, 
  getProduct, 
  getFeaturedProducts, 
  getCategories,
  getProductsForAdmin
} = require('../controllers/productController');

const router = express.Router();

// Admin routes (should be protected with admin middleware)
router.get('/admin/list', getProductsForAdmin);

// Public routes
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/', getProducts);
router.get('/:id', getProduct);

module.exports = router;
