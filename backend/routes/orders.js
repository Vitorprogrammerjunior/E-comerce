const express = require('express');
const { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  cancelOrder,
  trackOrder,
  updateOrderStatus,
  addOrderItem,
  updateOrderItem,
  removeOrderItem,
  getAllOrders
} = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All order routes require authentication
router.use(authenticateToken);

// Admin routes (should add admin middleware in production)
router.get('/admin/all', getAllOrders); // GET /api/orders/admin/all
router.post('/:id/items', addOrderItem); // POST /api/orders/:id/items
router.put('/:id/items/:productId', updateOrderItem); // PUT /api/orders/:id/items/:productId
router.delete('/:id/items/:productId', removeOrderItem); // DELETE /api/orders/:id/items/:productId
router.put('/:id/status', updateOrderStatus); // PUT /api/orders/:id/status (admin only)

// User routes
router.post('/', createOrder);  // POST /api/orders (checkout)
router.get('/', getUserOrders); // GET /api/orders (user order history)
router.get('/:id', getOrderById); // GET /api/orders/:id (single order)
router.get('/:id/tracking', trackOrder); // GET /api/orders/:id/tracking (track order)
router.put('/:id/cancel', cancelOrder); // PUT /api/orders/:id/cancel (cancel order)

module.exports = router;
