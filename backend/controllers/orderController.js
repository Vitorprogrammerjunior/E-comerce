const { asyncHandler } = require('../middleware/errorHandler');
const { query } = require('../config/database');

// Helper function to generate order ID
const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// Helper function to get order with items
const getOrderWithItems = async (orderId) => {
  const orderQuery = `
    SELECT 
      o.id, o.order_number, o.user_id, o.status, o.payment_status, o.payment_method, o.payment_id,
      o.subtotal, o.tax_amount, o.shipping_amount, o.total, o.shipping_address,
      o.created_at, o.updated_at, o.shipped_at, o.delivered_at, o.cancelled_at
    FROM orders o
    WHERE o.id = ?
  `;

  const [orders] = await query(orderQuery, [orderId]);
  if (orders.length === 0) return null;

  const order = orders[0];

  const itemsQuery = `
    SELECT 
      oi.product_id, oi.product_name, oi.product_image,
      oi.quantity, oi.price, oi.total
    FROM order_items oi
    WHERE oi.order_id = ?
  `;

  const [items] = await query(itemsQuery, [orderId]);

  return {
    id: order.id,
    orderNumber: order.order_number,
    userId: order.user_id,
    status: order.status,
    paymentStatus: order.payment_status,
    paymentMethod: order.payment_method,
    paymentId: order.payment_id,
    subtotal: parseFloat(order.subtotal),
    taxAmount: parseFloat(order.tax_amount),
    shippingAmount: parseFloat(order.shipping_amount),
    total: parseFloat(order.total),
    shippingAddress: typeof order.shipping_address === 'string' 
      ? JSON.parse(order.shipping_address) 
      : order.shipping_address,
    items: items.map(item => ({
      productId: item.product_id,
      name: item.product_name,
      image: item.product_image,
      quantity: item.quantity,
      price: parseFloat(item.price),
      total: parseFloat(item.total)
    })),
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    shippedAt: order.shipped_at,
    deliveredAt: order.delivered_at,
    cancelledAt: order.cancelled_at
  };
};

// @desc    Create new order (checkout)
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { 
    items, 
    total, 
    shippingAddress, 
    paymentMethod,
    paymentDetails 
  } = req.body;

  // Validation
  if (!items || !items.length) {
    return res.status(400).json({
      success: false,
      message: 'Order items are required'
    });
  }

  if (!total || total <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Valid total amount is required'
    });
  }

  if (!shippingAddress || (!shippingAddress.street && !shippingAddress.address) || !shippingAddress.city) {
    return res.status(400).json({
      success: false,
      message: 'Complete shipping address is required'
    });
  }

  if (!paymentMethod) {
    return res.status(400).json({
      success: false,
      message: 'Payment method is required'
    });
  }

  // Calculate shipping cost (simple logic)
  const shippingCost = total > 200 ? 0 : 15.99;
  const taxAmount = total * 0.1; // 10% tax
  const finalTotal = total + shippingCost + taxAmount;

  // Generate unique order ID
  const orderId = generateOrderId();

  // Process payment (MOCK - for portfolio only)
  let paymentStatus = 'pending';
  let paymentId = null;
  let orderStatus = 'processing';

  try {
    const paymentResult = await processPayment({
      amount: finalTotal,
      method: paymentMethod,
      details: paymentDetails
    });

    if (paymentResult.success) {
      paymentStatus = 'paid';
      paymentId = paymentResult.transactionId;
    } else {
      paymentStatus = 'failed';
      orderStatus = 'cancelled';
    }
  } catch (error) {
    paymentStatus = 'failed';
    orderStatus = 'cancelled';
  }

  // Create order in database
  const orderQuery = `
    INSERT INTO orders (
      order_number, user_id, status, payment_status, payment_method, payment_id,
      subtotal, tax_amount, shipping_amount, total, shipping_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [orderResult] = await query(orderQuery, [
    orderId,
    userId,
    orderStatus,
    paymentStatus,
    paymentMethod,
    paymentId,
    total,
    taxAmount,
    shippingCost,
    finalTotal,
    typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress)
  ]);

  const dbOrderId = orderResult.insertId;

  // Create order items
  for (const item of items) {
    const itemQuery = `
      INSERT INTO order_items (
        order_id, product_id, product_name, product_image, 
        quantity, price, total
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await query(itemQuery, [
      dbOrderId,
      item.productId,
      item.name,
      item.image || '',
      item.quantity,
      item.price,
      item.price * item.quantity
    ]);
  }

  // Fetch the created order with items
  const createdOrder = await getOrderWithItems(dbOrderId);

  // Clear cart after successful order creation (only if payment succeeded)
  if (paymentStatus === 'paid') {
    try {
      const clearCartQuery = `DELETE FROM cart_items WHERE user_id = ?`;
      await query(clearCartQuery, [userId]);
    } catch (error) {
      console.warn('Failed to clear cart:', error.message);
      // Continue execution even if cart clearing fails
    }
  }

  res.status(201).json({
    success: true,
    message: paymentStatus === 'paid' ? 'Order created successfully' : 'Order created but payment failed',
    data: createdOrder
  });
});

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { page = 1, limit = 10, status } = req.query;

  const offset = (page - 1) * limit;
  
  let whereClause = 'WHERE o.user_id = ?';
  let queryParams = [userId];

  // Filter by status if provided
  if (status) {
    whereClause += ' AND o.status = ?';
    queryParams.push(status);
  }

  const ordersQuery = `
    SELECT 
      o.id, o.status, o.payment_status, o.payment_method,
      o.subtotal, o.tax_amount, o.shipping_amount, o.total,
      o.created_at, o.updated_at, o.delivered_at,
      COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    ${whereClause}
    GROUP BY o.id
    ORDER BY o.created_at DESC
    LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
  `;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM orders o
    ${whereClause}
  `;

  const [orders] = await query(ordersQuery, queryParams);
  const [countResult] = await query(countQuery, queryParams);

  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  const formattedOrders = orders.map(order => ({
    id: order.id,
    status: order.status,
    paymentStatus: order.payment_status,
    paymentMethod: order.payment_method,
    subtotal: parseFloat(order.subtotal),
    taxAmount: parseFloat(order.tax_amount),
    shippingAmount: parseFloat(order.shipping_amount),
    total: parseFloat(order.total),
    itemCount: order.item_count,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    deliveredAt: order.delivered_at
  }));

  res.status(200).json({
    success: true,
    count: formattedOrders.length,
    total: total,
    page: parseInt(page),
    pages: totalPages,
    data: formattedOrders
  });
});

// @desc    Get single order details
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  const order = await getOrderWithItems(id);

  if (!order || order.userId !== userId) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  // Check if order exists and belongs to user
  const order = await getOrderWithItems(id);

  if (!order || order.userId !== userId) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if order can be cancelled
  if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      message: 'Order cannot be cancelled at this stage'
    });
  }

  // Update order status
  const updateQuery = `
    UPDATE orders 
    SET status = 'cancelled', cancelled_at = NOW(), updated_at = NOW()
    WHERE id = ?
  `;

  await query(updateQuery, [id]);

  // Get updated order
  const updatedOrder = await getOrderWithItems(id);

  res.status(200).json({
    success: true,
    message: 'Order cancelled successfully',
    data: updatedOrder
  });
});

// @desc    Track order status
// @route   GET /api/orders/:id/tracking
// @access  Private
const trackOrder = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  const order = await getOrderWithItems(id);

  if (!order || order.userId !== userId) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Mock tracking information
  const trackingSteps = [
    {
      status: 'confirmed',
      title: 'Pedido Confirmado',
      description: 'Seu pedido foi confirmado e está sendo preparado',
      timestamp: order.createdAt,
      completed: true
    },
    {
      status: 'processing',
      title: 'Preparando Envio',
      description: 'Separando itens e preparando para envio',
      timestamp: order.status !== 'confirmed' ? order.updatedAt : null,
      completed: ['processing', 'shipped', 'delivered'].includes(order.status)
    },
    {
      status: 'shipped',
      title: 'Enviado',
      description: 'Produto enviado e a caminho do destino',
      timestamp: order.shippedAt || (order.status === 'shipped' || order.status === 'delivered' ? order.updatedAt : null),
      completed: ['shipped', 'delivered'].includes(order.status)
    },
    {
      status: 'delivered',
      title: 'Entregue',
      description: 'Produto entregue no endereço de destino',
      timestamp: order.deliveredAt || null,
      completed: order.status === 'delivered'
    }
  ];

  res.status(200).json({
    success: true,
    data: {
      order: {
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      },
      tracking: trackingSteps,
      currentStep: trackingSteps.findIndex(step => step.status === order.status)
    }
  });
});

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Valid status is required. Valid options: ' + validStatuses.join(', ')
    });
  }

  // Check if order exists
  const order = await getOrderWithItems(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Prepare update fields
  let updateFields = ['status = ?', 'updated_at = NOW()'];
  let updateValues = [status];

  if (status === 'delivered') {
    updateFields.push('delivered_at = NOW()');
  }
  if (status === 'shipped') {
    updateFields.push('shipped_at = NOW()');
  }

  // Update order status in database
  const updateQuery = `
    UPDATE orders 
    SET ${updateFields.join(', ')}
    WHERE id = ?
  `;

  await query(updateQuery, [...updateValues, id]);

  // Get updated order
  const updatedOrder = await getOrderWithItems(id);

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: updatedOrder
  });
});

// @desc    Add item to order (admin only)
// @route   POST /api/orders/:id/items
// @access  Private/Admin
const addOrderItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productId, name, price, quantity, image } = req.body;

  // Validate required fields
  if (!productId || !name || !price || !quantity) {
    return res.status(400).json({
      success: false,
      message: 'Product ID, name, price, and quantity are required'
    });
  }

  if (quantity <= 0 || price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be positive and price cannot be negative'
    });
  }

  // Check if order exists
  const order = await getOrderWithItems(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if order can be modified
  if (['delivered', 'cancelled'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      message: 'Cannot modify items of delivered or cancelled orders'
    });
  }

  // Check if item already exists in order
  const existingItem = order.items.find(item => item.productId === parseInt(productId));
  
  if (existingItem) {
    // Update existing item quantity
    const newQuantity = existingItem.quantity + parseInt(quantity);
    const newTotal = existingItem.price * newQuantity;

    const updateQuery = `
      UPDATE order_items 
      SET quantity = ?, total = ?, updated_at = NOW()
      WHERE order_id = ? AND product_id = ?
    `;

    await query(updateQuery, [newQuantity, newTotal, id, productId]);
  } else {
    // Add new item
    const itemTotal = parseFloat(price) * parseInt(quantity);
    const insertQuery = `
      INSERT INTO order_items (
        order_id, product_id, product_name, product_image, 
        quantity, price, total
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await query(insertQuery, [
      id,
      productId,
      name,
      image || '',
      quantity,
      price,
      itemTotal
    ]);
  }

  // Recalculate order totals
  const recalcQuery = `
    SELECT SUM(total) as subtotal 
    FROM order_items 
    WHERE order_id = ?
  `;

  const [totals] = await query(recalcQuery, [id]);
  const newSubtotal = parseFloat(totals[0].subtotal) || 0;
  const shippingCost = newSubtotal > 200 ? 0 : 15.99;
  const tax = newSubtotal * 0.1; // 10% tax
  const newTotal = newSubtotal + shippingCost + tax;

  // Update order totals
  const updateOrderQuery = `
    UPDATE orders 
    SET subtotal = ?, tax_amount = ?, shipping_amount = ?, total = ?, updated_at = NOW()
    WHERE id = ?
  `;

  await query(updateOrderQuery, [newSubtotal, tax, shippingCost, newTotal, id]);

  // Get updated order
  const updatedOrder = await getOrderWithItems(id);

  res.status(200).json({
    success: true,
    message: 'Item added to order successfully',
    data: updatedOrder
  });
});

// @desc    Update order item (admin only)
// @route   PUT /api/orders/:id/items/:productId
// @access  Private/Admin
const updateOrderItem = asyncHandler(async (req, res) => {
  const { id, productId } = req.params;
  const { quantity, price } = req.body;

  if (!quantity && !price) {
    return res.status(400).json({
      success: false,
      message: 'Quantity or price must be provided'
    });
  }

  if (quantity && quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be positive'
    });
  }

  if (price && price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Price cannot be negative'
    });
  }

  // Check if order exists
  const order = await getOrderWithItems(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if order can be modified
  if (['delivered', 'cancelled'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      message: 'Cannot modify items of delivered or cancelled orders'
    });
  }

  // Check if item exists in order
  const existingItem = order.items.find(item => item.productId === parseInt(productId));

  if (!existingItem) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in order'
    });
  }

  // Prepare update fields
  let updateFields = [];
  let updateValues = [];

  if (quantity) {
    updateFields.push('quantity = ?');
    updateValues.push(parseInt(quantity));
  }

  if (price) {
    updateFields.push('price = ?');
    updateValues.push(parseFloat(price));
  }

  // Calculate new total for the item
  const newQuantity = quantity || existingItem.quantity;
  const newPrice = price || existingItem.price;
  const newItemTotal = newQuantity * newPrice;

  updateFields.push('total = ?');
  updateValues.push(newItemTotal);

  // Update item
  const updateQuery = `
    UPDATE order_items 
    SET ${updateFields.join(', ')}
    WHERE order_id = ? AND product_id = ?
  `;

  await query(updateQuery, [...updateValues, id, productId]);

  // Recalculate order totals
  const recalcQuery = `
    SELECT SUM(total) as subtotal 
    FROM order_items 
    WHERE order_id = ?
  `;

  const [totals] = await query(recalcQuery, [id]);
  const newSubtotal = parseFloat(totals[0].subtotal) || 0;
  const shippingCost = newSubtotal > 200 ? 0 : 15.99;
  const tax = newSubtotal * 0.1; // 10% tax
  const orderTotal = newSubtotal + shippingCost + tax;

  // Update order totals
  const updateOrderQuery = `
    UPDATE orders 
    SET subtotal = ?, tax_amount = ?, shipping_amount = ?, total = ?, updated_at = NOW()
    WHERE id = ?
  `;

  await query(updateOrderQuery, [newSubtotal, tax, shippingCost, orderTotal, id]);

  // Get updated order
  const updatedOrder = await getOrderWithItems(id);

  res.status(200).json({
    success: true,
    message: 'Order item updated successfully',
    data: updatedOrder
  });
});

// @desc    Remove item from order (admin only)
// @route   DELETE /api/orders/:id/items/:productId
// @access  Private/Admin
const removeOrderItem = asyncHandler(async (req, res) => {
  const { id, productId } = req.params;

  // Check if order exists
  const order = await getOrderWithItems(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if order can be modified
  if (['delivered', 'cancelled'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      message: 'Cannot modify items of delivered or cancelled orders'
    });
  }

  // Check if item exists in order
  const existingItem = order.items.find(item => item.productId === parseInt(productId));

  if (!existingItem) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in order'
    });
  }

  // Check if this is the last item
  if (order.items.length === 1) {
    return res.status(400).json({
      success: false,
      message: 'Cannot remove the last item from order. Cancel the order instead.'
    });
  }

  // Remove item from database
  const deleteQuery = `
    DELETE FROM order_items 
    WHERE order_id = ? AND product_id = ?
  `;

  await query(deleteQuery, [id, productId]);

  // Recalculate order totals
  const recalcQuery = `
    SELECT COALESCE(SUM(total), 0) as subtotal 
    FROM order_items 
    WHERE order_id = ?
  `;

  const [totals] = await query(recalcQuery, [id]);
  const newSubtotal = parseFloat(totals[0].subtotal) || 0;
  const shippingCost = newSubtotal > 200 ? 0 : 15.99;
  const tax = newSubtotal * 0.1; // 10% tax
  const orderTotal = newSubtotal + shippingCost + tax;

  // Update order totals
  const updateOrderQuery = `
    UPDATE orders 
    SET subtotal = ?, tax_amount = ?, shipping_amount = ?, total = ?, updated_at = NOW()
    WHERE id = ?
  `;

  await query(updateOrderQuery, [newSubtotal, tax, shippingCost, orderTotal, id]);

  // Get updated order
  const updatedOrder = await getOrderWithItems(id);

  res.status(200).json({
    success: true,
    message: 'Item removed from order successfully',
    data: updatedOrder
  });
});

// @desc    Get all orders (admin only)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, userId } = req.query;

  const offset = (page - 1) * limit;
  
  let whereClause = 'WHERE 1=1';
  let queryParams = [];

  // Filter by status if provided
  if (status) {
    whereClause += ' AND o.status = ?';
    queryParams.push(status);
  }

  // Filter by userId if provided
  if (userId) {
    whereClause += ' AND o.user_id = ?';
    queryParams.push(parseInt(userId));
  }

  const ordersQuery = `
    SELECT 
      o.id, o.user_id, o.status, o.payment_status, o.payment_method,
      o.subtotal, o.tax_amount, o.shipping_amount, o.total,
      o.created_at, o.updated_at, o.delivered_at,
      u.name as user_name, u.email as user_email,
      COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    ${whereClause}
    GROUP BY o.id
    ORDER BY o.created_at DESC
    LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
  `;

  const countQuery = `
    SELECT COUNT(DISTINCT o.id) as total
    FROM orders o
    ${whereClause}
  `;

  const [orders] = await query(ordersQuery, queryParams);
  const [countResult] = await query(countQuery, queryParams);

  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  const formattedOrders = orders.map(order => ({
    id: order.id,
    userId: order.user_id,
    userName: order.user_name,
    userEmail: order.user_email,
    status: order.status,
    paymentStatus: order.payment_status,
    paymentMethod: order.payment_method,
    subtotal: parseFloat(order.subtotal),
    taxAmount: parseFloat(order.tax_amount),
    shippingAmount: parseFloat(order.shipping_amount),
    total: parseFloat(order.total),
    itemCount: order.item_count,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    deliveredAt: order.delivered_at
  }));

  res.status(200).json({
    success: true,
    count: formattedOrders.length,
    total: total,
    page: parseInt(page),
    pages: totalPages,
    data: formattedOrders
  });
});

// Stub payment processing function
const processPayment = async ({ amount, method, details }) => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For development/demo purposes, always succeed
  const success = true;
  
  // Generate a transaction ID
  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log(`[MOCK PAYMENT] Processing payment of ${amount} via ${method}`);
  console.log(`[MOCK PAYMENT] Transaction ID: ${transactionId}`);
  
  return {
    success,
    transactionId,
    message: 'Payment processed successfully'
  };
};

module.exports = {
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
};
