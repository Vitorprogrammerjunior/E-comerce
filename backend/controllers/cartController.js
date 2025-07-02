const { asyncHandler } = require('../middleware/errorHandler');
const { query } = require('../config/database');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const cartQuery = `
    SELECT 
      ci.id, ci.product_id, ci.quantity, ci.price, ci.created_at,
      p.name, p.images, p.stock
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
    ORDER BY ci.created_at DESC
  `;

  const [cartItems] = await query(cartQuery, [userId]);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  // Format cart items
  const items = cartItems.map(item => ({
    id: item.id,
    productId: item.product_id,
    name: item.name,
    image: item.images && item.images !== 'null' ? (JSON.parse(item.images)[0] || null) : null,
    price: parseFloat(item.price),
    quantity: item.quantity,
    stock: item.stock,
    addedAt: item.created_at
  }));

  res.status(200).json({
    success: true,
    data: {
      items,
      total: Math.round(total * 100) / 100,
      itemCount: items.length
    }
  });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'Product ID is required'
    });
  }

  if (quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be positive'
    });
  }

  // Get product details
  const productQuery = `
    SELECT id, name, price, stock, images
    FROM products 
    WHERE id = ? AND is_active = TRUE
  `;

  const [products] = await query(productQuery, [productId]);

  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Product not found or inactive'
    });
  }

  const product = products[0];

  // Check stock availability
  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} items available in stock`
    });
  }

  // Check if item already exists in cart
  const existingItemQuery = `
    SELECT id, quantity 
    FROM cart_items 
    WHERE user_id = ? AND product_id = ?
  `;

  const [existingItems] = await query(existingItemQuery, [userId, productId]);

  if (existingItems.length > 0) {
    // Update existing item
    const newQuantity = existingItems[0].quantity + parseInt(quantity);
    
    // Check stock again for new quantity
    if (product.stock < newQuantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    const updateQuery = `
      UPDATE cart_items 
      SET quantity = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await query(updateQuery, [newQuantity, existingItems[0].id]);
  } else {
    // Add new item
    const insertQuery = `
      INSERT INTO cart_items (user_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `;

    await query(insertQuery, [userId, productId, quantity, product.price]);
  }

  // Get updated cart
  const cartQuery = `
    SELECT 
      ci.id, ci.product_id, ci.quantity, ci.price, ci.created_at,
      p.name, p.images, p.stock
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
    ORDER BY ci.created_at DESC
  `;

  const [cartItems] = await query(cartQuery, [userId]);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  // Format cart items
  const items = cartItems.map(item => ({
    id: item.id,
    productId: item.product_id,
    name: item.name,
    image: item.images && item.images !== 'null' ? (JSON.parse(item.images)[0] || null) : null,
    price: parseFloat(item.price),
    quantity: item.quantity,
    stock: item.stock,
    addedAt: item.created_at
  }));

  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    data: {
      items,
      total: Math.round(total * 100) / 100,
      itemCount: items.length
    }
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 0) {
    return res.status(400).json({
      success: false,
      message: 'Valid quantity is required'
    });
  }

  // Check if item exists in cart
  const existingItemQuery = `
    SELECT ci.id, p.stock 
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ? AND ci.product_id = ?
  `;

  const [existingItems] = await query(existingItemQuery, [userId, productId]);

  if (existingItems.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in cart'
    });
  }

  const cartItem = existingItems[0];

  if (quantity === 0) {
    // Remove item from cart
    const deleteQuery = `DELETE FROM cart_items WHERE id = ?`;
    await query(deleteQuery, [cartItem.id]);
  } else {
    // Check stock availability
    if (cartItem.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${cartItem.stock} items available in stock`
      });
    }

    // Update quantity
    const updateQuery = `
      UPDATE cart_items 
      SET quantity = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await query(updateQuery, [quantity, cartItem.id]);
  }

  // Get updated cart
  const cartQuery = `
    SELECT 
      ci.id, ci.product_id, ci.quantity, ci.price, ci.created_at,
      p.name, p.images, p.stock
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
    ORDER BY ci.created_at DESC
  `;

  const [cartItems] = await query(cartQuery, [userId]);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  // Format cart items
  const items = cartItems.map(item => ({
    id: item.id,
    productId: item.product_id,
    name: item.name,
    image: item.images && item.images !== 'null' ? (JSON.parse(item.images)[0] || null) : null,
    price: parseFloat(item.price),
    quantity: item.quantity,
    stock: item.stock,
    addedAt: item.created_at
  }));

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    data: {
      items,
      total: Math.round(total * 100) / 100,
      itemCount: items.length
    }
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  // Check if item exists in cart
  const existingItemQuery = `
    SELECT id 
    FROM cart_items 
    WHERE user_id = ? AND product_id = ?
  `;

  const [existingItems] = await query(existingItemQuery, [userId, productId]);

  if (existingItems.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in cart'
    });
  }

  // Remove item from cart
  const deleteQuery = `DELETE FROM cart_items WHERE id = ?`;
  await query(deleteQuery, [existingItems[0].id]);

  // Get updated cart
  const cartQuery = `
    SELECT 
      ci.id, ci.product_id, ci.quantity, ci.price, ci.created_at,
      p.name, p.images, p.stock
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
    ORDER BY ci.created_at DESC
  `;

  const [cartItems] = await query(cartQuery, [userId]);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  // Format cart items
  const items = cartItems.map(item => ({
    id: item.id,
    productId: item.product_id,
    name: item.name,
    image: item.images && item.images !== 'null' ? (JSON.parse(item.images)[0] || null) : null,
    price: parseFloat(item.price),
    quantity: item.quantity,
    stock: item.stock,
    addedAt: item.created_at
  }));

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    data: {
      items,
      total: Math.round(total * 100) / 100,
      itemCount: items.length
    }
  });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  
  // Delete all cart items for the user
  const deleteQuery = `DELETE FROM cart_items WHERE user_id = ?`;
  await query(deleteQuery, [userId]);

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
    data: {
      items: [],
      total: 0,
      itemCount: 0
    }
  });
});

// @desc    Get cart items for checkout
// @route   GET /api/cart/checkout
// @access  Private
const getCartForCheckout = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const cartQuery = `
    SELECT 
      ci.id, ci.product_id, ci.quantity, ci.price,
      p.name, p.images, p.stock, p.weight
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ? AND p.is_active = TRUE
    ORDER BY ci.created_at DESC
  `;

  const [cartItems] = await query(cartQuery, [userId]);

  if (cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Cart is empty'
    });
  }

  // Check stock availability for all items
  let stockIssues = [];
  
  for (const item of cartItems) {
    if (item.stock < item.quantity) {
      stockIssues.push({
        productId: item.product_id,
        name: item.name,
        requested: item.quantity,
        available: item.stock
      });
    }
  }

  if (stockIssues.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Some items are out of stock',
      stockIssues
    });
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const shippingCost = subtotal > 200 ? 0 : 15.99;
  const taxAmount = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + taxAmount;

  // Format items for checkout
  const items = cartItems.map(item => ({
    productId: item.product_id,
    name: item.name,
    image: item.images && item.images !== 'null' ? (JSON.parse(item.images)[0] || null) : null,
    price: parseFloat(item.price),
    quantity: item.quantity,
    weight: parseFloat(item.weight) || 0
  }));

  res.status(200).json({
    success: true,
    data: {
      items,
      totals: {
        subtotal: Math.round(subtotal * 100) / 100,
        shipping: Math.round(shippingCost * 100) / 100,
        tax: Math.round(taxAmount * 100) / 100,
        total: Math.round(total * 100) / 100
      },
      itemCount: items.length
    }
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartForCheckout
};
