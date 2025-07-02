const { asyncHandler } = require('../middleware/errorHandler');
const { query } = require('../config/database');

// Helper function to safely process product images
const processImages = (imagesData) => {
  let images = [];
  try {
    if (imagesData && imagesData !== 'null') {
      if (typeof imagesData === 'string') {
        images = JSON.parse(imagesData);
      } else {
        images = imagesData;
      }
    }
  } catch (e) {
    images = imagesData ? [imagesData] : [];
  }

  // Filter out empty strings and null values
  return Array.isArray(images) ? images.filter(img => img && img.trim() !== '') : [];
};

// @desc    Get all products with pagination and filters
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 12, 
    category, 
    search, 
    minPrice, 
    maxPrice, 
    sortBy = 'created_at', 
    sortOrder = 'DESC' 
  } = req.query;

  const offset = (page - 1) * limit;
  
  let whereClause = 'WHERE p.is_active = 1';
  let queryParams = [];

  // Filter by category
  if (category) {
    // Check if category is a number (ID) or string (name)
    if (!isNaN(category)) {
      whereClause += ` AND p.category_id = ${parseInt(category)}`;
    } else {
      // Filter by category name
      const categoryName = category.replace(/'/g, "''"); // Simple SQL escape
      whereClause += ` AND c.name = '${categoryName}'`;
    }
  }

  // Filter by search term
  if (search) {
    const searchTerm = search.replace(/'/g, "''"); // Simple SQL escape
    whereClause += ` AND (p.name LIKE '%${searchTerm}%' OR p.description LIKE '%${searchTerm}%')`;
  }

  // Filter by price range
  if (minPrice) {
    whereClause += ` AND p.price >= ${parseFloat(minPrice)}`;
  }

  if (maxPrice) {
    whereClause += ` AND p.price <= ${parseFloat(maxPrice)}`;
  }

  // Validate sort columns
  const allowedSortColumns = ['name', 'price', 'created_at', 'updated_at'];
  const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'created_at';
  const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const productsQuery = `
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.stock,
      p.category_id,
      p.created_at,
      p.updated_at,
      p.images,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${whereClause}
    ORDER BY p.${sortColumn} ${order}
    LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
  `;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${whereClause}
  `;

  // Execute queries
  const [products] = await query(productsQuery);
  const [countResult] = await query(countQuery);
  
  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  // Format products
  const formattedProducts = products.map(product => {
    const images = processImages(product.images);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: product.stock,
      categoryId: product.category_id,
      categoryName: product.category_name,
      images: images,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };
  });

  res.json({
    success: true,
    data: {
      products: formattedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    }
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id);

  const productQuery = `
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.stock,
      p.category_id,
      p.is_active,
      p.images,
      p.created_at,
      p.updated_at,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${productId} AND p.is_active = 1
  `;

  const [products] = await query(productQuery);
  
  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  const product = products[0];

  const images = processImages(product.images);

  const formattedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    stock: product.stock,
    categoryId: product.category_id,
    categoryName: product.category_name,
    images: images,
    createdAt: product.created_at,
    updatedAt: product.updated_at
  };

  res.json({
    success: true,
    data: formattedProduct
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  // Ensure limit is a valid number
  const validLimit = Math.max(1, Math.min(50, parseInt(limit) || 8));

  try {
    // Use string interpolation for now to avoid the parameter binding issue
    const productsQuery = `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.category_id,
        p.images,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
      ORDER BY p.created_at DESC
      LIMIT ${validLimit}
    `;

    console.log('Executing getFeaturedProducts query with limit:', validLimit);
    const [products] = await query(productsQuery);
    console.log('Query successful, found products:', products.length);

    const formattedProducts = products.map(product => {
      const images = processImages(product.images);

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        stock: product.stock,
        categoryId: product.category_id,
        categoryName: product.category_name,
        images: Array.isArray(images) ? images : []
      };
    });

    res.json({
      success: true,
      data: formattedProducts
    });
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error);
    throw error;
  }
});

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categoriesQuery = `
    SELECT 
      c.id,
      c.name,
      c.description,
      c.image,
      COUNT(p.id) as product_count
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
    WHERE c.is_active = 1 AND c.name IS NOT NULL AND c.name != ''
    GROUP BY c.id
    ORDER BY c.name ASC
  `;

  const [categories] = await query(categoriesQuery);

  const formattedCategories = categories.map(category => ({
    id: category.id,
    name: category.name || 'Categoria sem nome',
    description: category.description || '',
    imageUrl: category.image || '',
    productCount: parseInt(category.product_count) || 0
  }));

  res.json({
    success: true,
    data: formattedCategories
  });
});

// @desc    Get products for admin (includes inactive products)
// @route   GET /api/products/admin/list
// @access  Private/Admin
const getProductsForAdmin = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 20, 
    category, 
    search, 
    status = 'all',
    sortBy = 'created_at', 
    sortOrder = 'DESC' 
  } = req.query;

  const offset = (page - 1) * limit;
  
  let whereClause = 'WHERE 1=1';

  // Filter by category
  if (category) {
    whereClause += ` AND p.category_id = ${parseInt(category)}`;
  }

  // Filter by search term
  if (search) {
    const searchTerm = search.replace(/'/g, "''"); // Simple SQL escape
    whereClause += ` AND (p.name LIKE '%${searchTerm}%' OR p.description LIKE '%${searchTerm}%')`;
  }

  // Filter by status
  if (status === 'active') {
    whereClause += ' AND p.is_active = 1';
  } else if (status === 'inactive') {
    whereClause += ' AND p.is_active = 0';
  }
  // If status === 'all', don't add any filter

  // Validate sort columns
  const allowedSortColumns = ['name', 'price', 'stock', 'created_at', 'updated_at'];
  const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'created_at';
  const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const productsQuery = `
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.stock,
      p.category_id,
      p.is_active,
      p.is_featured,
      p.images,
      p.created_at,
      p.updated_at,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${whereClause}
    ORDER BY p.${sortColumn} ${order}
    LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
  `;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${whereClause}
  `;

  // Execute queries
  const [products] = await query(productsQuery);
  const [countResult] = await query(countQuery);
  
  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  // Format products for admin view
  const formattedProducts = products.map(product => {
    const images = processImages(product.images);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: product.stock,
      categoryId: product.category_id,
      categoryName: product.category_name,
      isActive: product.is_active === 1,
      isFeatured: product.is_featured === 1,
      images: images,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };
  });

  res.json({
    success: true,
    data: {
      products: formattedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    }
  });
});

module.exports = {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getCategories,
  getProductsForAdmin
};
