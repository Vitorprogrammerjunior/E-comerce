const { asyncHandler } = require('../middleware/errorHandler');
const { query } = require('../config/database');

// @desc    Get all products (admin)
// @route   GET /api/admin/products
// @access  Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, search, status } = req.query;

  let whereClause = 'WHERE 1=1';
  let queryParams = [];

  // Filter by category
  if (category) {
    whereClause += ' AND p.category_id = ?';
    queryParams.push(category);
  }

  // Filter by search
  if (search) {
    whereClause += ' AND (p.name LIKE ? OR p.description LIKE ?)';
    queryParams.push(`%${search}%`, `%${search}%`);
  }

  // Filter by status
  if (status) {
    whereClause += ' AND p.is_active = ?';
    queryParams.push(status === 'active' ? 1 : 0);
  }

  try {
    // Count total products
    const [countResult] = await query(
      `SELECT COUNT(*) as total 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       ${whereClause}`,
      queryParams
    );
    const total = countResult[0].total;

    // Get products with pagination
    const offset = (page - 1) * limit;
    const [products] = await query(
      `SELECT 
        p.id, p.name, p.description, p.price, p.original_price,
        p.stock, p.is_active, p.is_featured, p.created_at, p.updated_at,
        c.name as category_name, c.id as category_id
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       ${whereClause}
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), offset]
    );

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single product (admin)
// @route   GET /api/admin/products/:id
// @access  Private/Admin
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [products] = await query(
      `SELECT 
        p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get product images
    const [images] = await query(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order',
      [id]
    );

    const product = {
      ...products[0],
      images: images.map(img => ({
        id: img.id,
        url: img.image_url,
        alt: img.alt_text,
        isPrimary: img.is_primary
      }))
    };

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    originalPrice,
    categoryId,
    stock,
    isFeatured = false,
    isActive = true,
    images = []
  } = req.body;

  // Validation
  if (!name || !description || !price || !categoryId) {
    return res.status(400).json({
      success: false,
      message: 'Name, description, price, and category are required'
    });
  }

  if (price <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Price must be greater than 0'
    });
  }

  if (stock < 0) {
    return res.status(400).json({
      success: false,
      message: 'Stock cannot be negative'
    });
  }

  try {
    // Check if category exists
    const [categories] = await query(
      'SELECT id FROM categories WHERE id = ? AND is_active = true',
      [categoryId]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    // Create product
    const [result] = await query(
      `INSERT INTO products 
       (name, description, price, original_price, category_id, stock, is_featured, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, originalPrice || price, categoryId, stock || 0, isFeatured, isActive]
    );

    const productId = result.insertId;

    // Add images if provided
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        await query(
          `INSERT INTO product_images 
           (product_id, image_url, alt_text, is_primary, sort_order)
           VALUES (?, ?, ?, ?, ?)`,
          [productId, image.url, image.alt || name, i === 0, i]
        );
      }
    }

    // Get the created product
    const [newProduct] = await query(
      `SELECT 
        p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [productId]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct[0]
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    originalPrice,
    categoryId,
    stock,
    isFeatured,
    isActive
  } = req.body;

  try {
    // Check if product exists
    const [existingProduct] = await query(
      'SELECT id FROM products WHERE id = ?',
      [id]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Validation
    if (price && price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be greater than 0'
      });
    }

    if (stock && stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock cannot be negative'
      });
    }

    // Check category if provided
    if (categoryId) {
      const [categories] = await query(
        'SELECT id FROM categories WHERE id = ? AND is_active = true',
        [categoryId]
      );

      if (categories.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category'
        });
      }
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (description) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (price) {
      updateFields.push('price = ?');
      updateValues.push(price);
    }
    if (originalPrice) {
      updateFields.push('original_price = ?');
      updateValues.push(originalPrice);
    }
    if (categoryId) {
      updateFields.push('category_id = ?');
      updateValues.push(categoryId);
    }
    if (stock !== undefined) {
      updateFields.push('stock = ?');
      updateValues.push(stock);
    }
    if (isFeatured !== undefined) {
      updateFields.push('is_featured = ?');
      updateValues.push(isFeatured);
    }
    if (isActive !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(isActive);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    // Update product
    await query(
      `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated product
    const [updatedProduct] = await query(
      `SELECT 
        p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct[0]
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check if product exists
    const [existingProduct] = await query(
      'SELECT id FROM products WHERE id = ?',
      [id]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete - just mark as inactive
    await query(
      'UPDATE products SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get categories for product form
// @route   GET /api/admin/categories
// @access  Private/Admin
const getCategories = asyncHandler(async (req, res) => {
  try {
    const [categories] = await query(
      'SELECT id, name, slug FROM categories WHERE is_active = true ORDER BY name'
    );

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
};
