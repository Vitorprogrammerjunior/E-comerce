-- ====================================
-- E-COMMERCE DATABASE SETUP
-- MySQL Schema
-- ====================================

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS product_reviews;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS user_addresses;
DROP TABLE IF EXISTS users;

-- ====================================
-- USERS TABLE
-- ====================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ====================================
-- USER ADDRESSES TABLE
-- ====================================
CREATE TABLE user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(50) DEFAULT 'shipping', -- shipping, billing
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'Brasil',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ====================================
-- CATEGORIES TABLE
-- ====================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500),
    parent_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ====================================
-- PRODUCTS TABLE
-- ====================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2), -- original price for discounts
    cost_price DECIMAL(10,2),
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    stock INT DEFAULT 0,
    min_stock INT DEFAULT 0,
    weight DECIMAL(8,2), -- in kg
    dimensions JSON, -- {length, width, height}
    category_id INT,
    images JSON, -- array of image URLs
    features JSON, -- array of product features
    specifications JSON, -- key-value pairs
    tags JSON, -- array of tags
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00, -- average rating
    review_count INT DEFAULT 0,
    sold_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ====================================
-- PRODUCT REVIEWS TABLE
-- ====================================
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    order_id INT, -- will reference orders table
    rating INT CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    images JSON, -- array of review image URLs
    is_verified BOOLEAN DEFAULT FALSE, -- verified purchase
    is_approved BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (product_id, user_id, order_id)
);

-- ====================================
-- CART ITEMS TABLE
-- ====================================
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL, -- price at time of adding to cart
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id)
);

-- ====================================
-- ORDERS TABLE
-- ====================================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled, refunded
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
    payment_method VARCHAR(50), -- credit_card, debit_card, pix, boleto
    payment_id VARCHAR(255), -- external payment ID
    
    -- Amounts
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    shipping_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL,
    
    -- Shipping
    shipping_address JSON NOT NULL, -- complete address object
    billing_address JSON, -- if different from shipping
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(100),
    
    -- Dates
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    
    -- Notes
    notes TEXT,
    admin_notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ====================================
-- ORDER ITEMS TABLE
-- ====================================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_name VARCHAR(255) NOT NULL, -- snapshot at time of order
    product_sku VARCHAR(100),
    product_image VARCHAR(500),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- price at time of order
    total DECIMAL(10,2) NOT NULL, -- quantity * price
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- ====================================
-- INDEXES FOR PERFORMANCE
-- ====================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- User Addresses
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_default ON user_addresses(user_id, is_default);

-- Categories
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active, sort_order);

-- Products
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured, is_active);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_stock ON products(stock);
CREATE INDEX idx_products_rating ON products(rating);
-- MySQL full-text search index
CREATE FULLTEXT INDEX idx_products_search ON products(name, description);

-- Product Reviews
CREATE INDEX idx_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_reviews_user ON product_reviews(user_id);
CREATE INDEX idx_reviews_rating ON product_reviews(rating);
CREATE INDEX idx_reviews_approved ON product_reviews(is_approved, created_at);

-- Cart
CREATE INDEX idx_cart_user ON cart_items(user_id);
CREATE INDEX idx_cart_product ON cart_items(product_id);

-- Orders
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Order Items
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- ====================================
-- TRIGGERS FOR UPDATED_AT (MySQL uses ON UPDATE CURRENT_TIMESTAMP)
-- ====================================
-- MySQL automatically handles updated_at with ON UPDATE CURRENT_TIMESTAMP in table definitions

-- ====================================
-- SAMPLE DATA
-- ====================================

-- Insert sample categories
INSERT INTO categories (name, slug, description, image, sort_order) VALUES
('Eletrônicos', 'eletronicos', 'Smartphones, laptops, tablets e mais', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', 1),
('Roupas', 'roupas', 'Moda masculina e feminina', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', 2),
('Casa e Jardim', 'casa-jardim', 'Decoração, móveis e utensílios', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 3),
('Esportes', 'esportes', 'Artigos esportivos e fitness', 'https://images.unsplash.com/photo-1571019613914-85e35ad35544?w=400', 4),
('Livros', 'livros', 'Literatura, técnicos e educacionais', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 5);

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, stock, category_id, images, is_featured, rating, review_count) VALUES
('iPhone 15 Pro 128GB', 'iphone-15-pro-128gb', 'O iPhone 15 Pro traz o chip A17 Pro revolucionário, sistema de câmera Pro avançado e design em titânio.', 'iPhone 15 Pro com chip A17 Pro e câmera de 48MP', 8999.00, 9999.00, 'IP15P128', 50, 1, JSON_ARRAY('https://images.unsplash.com/photo-1592286130937-7c2e6d8d57a9?w=500'), true, 4.8, 124),
('Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Galaxy S24 Ultra com S Pen integrada, câmera de 200MP e tela Dynamic AMOLED 2X.', 'Galaxy S24 Ultra com S Pen e câmera 200MP', 7999.00, 8499.00, 'SGS24U', 30, 1, JSON_ARRAY('https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500'), true, 4.7, 89),
('MacBook Air M3 13"', 'macbook-air-m3-13', 'MacBook Air com chip M3, tela Liquid Retina de 13 polegadas e até 18 horas de bateria.', 'MacBook Air M3 ultrafino e poderoso', 12999.00, 13999.00, 'MBA13M3', 25, 1, JSON_ARRAY('https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'), true, 4.9, 67),
('Camiseta Básica Premium', 'camiseta-basica-premium', 'Camiseta 100% algodão com acabamento premium. Disponível em várias cores.', 'Camiseta premium 100% algodão', 79.90, 99.90, 'CAM001', 200, 2, JSON_ARRAY('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'), false, 4.5, 234),
('Tênis Running Pro', 'tenis-running-pro', 'Tênis para corrida com tecnologia de amortecimento avançada e design respirável.', 'Tênis profissional para corrida', 299.90, 399.90, 'TEN001', 75, 4, JSON_ARRAY('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'), true, 4.6, 156),
('Sofá 3 Lugares Cinza', 'sofa-3-lugares-cinza', 'Sofá moderno de 3 lugares em tecido cinza, estrutura em madeira maciça.', 'Sofá moderno e confortável', 1899.00, 2299.00, 'SOF001', 15, 3, JSON_ARRAY('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'), false, 4.4, 45),
('Kit Halteres 10kg', 'kit-halteres-10kg', 'Kit com 2 halteres ajustáveis de 10kg cada, ideais para treino em casa.', 'Kit halteres para exercícios', 249.90, 299.90, 'HAL001', 40, 4, JSON_ARRAY('https://images.unsplash.com/photo-1571019613914-85e35ad35544?w=500'), false, 4.3, 78),
('JavaScript: O Guia Definitivo', 'javascript-guia-definitivo', 'Livro completo sobre JavaScript, desde conceitos básicos até técnicas avançadas.', 'Guia completo de JavaScript', 149.90, 179.90, 'LIV001', 60, 5, JSON_ARRAY('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500'), false, 4.7, 92);

-- Insert sample user (password is: 123456 - hashed with bcrypt)
INSERT INTO users (name, email, password) VALUES
('João Silva', 'joao@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Maria Santos', 'maria@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert sample user address
INSERT INTO user_addresses (user_id, first_name, last_name, street, city, state, zip_code, is_default) VALUES
(1, 'João', 'Silva', 'Rua das Flores, 123', 'São Paulo', 'SP', '01234-567', true);

-- ====================================
-- VIEWS FOR COMMON QUERIES
-- ====================================

-- Product view with category information
CREATE VIEW products_with_category AS
SELECT 
    p.*,
    c.name as category_name,
    c.slug as category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true;

-- Order view with user information
CREATE VIEW orders_with_user AS
SELECT 
    o.*,
    u.name as user_name,
    u.email as user_email
FROM orders o
JOIN users u ON o.user_id = u.id;

-- ====================================
-- TRIGGERS FOR BUSINESS LOGIC
-- ====================================

-- Trigger to update product rating when review is added/updated
DELIMITER //
CREATE TRIGGER update_product_rating_trigger
    AFTER INSERT ON product_reviews
    FOR EACH ROW
BEGIN
    UPDATE products 
    SET 
        rating = (
            SELECT ROUND(AVG(rating), 2) 
            FROM product_reviews 
            WHERE product_id = NEW.product_id AND is_approved = true
        ),
        review_count = (
            SELECT COUNT(*) 
            FROM product_reviews 
            WHERE product_id = NEW.product_id AND is_approved = true
        )
    WHERE id = NEW.product_id;
END//

CREATE TRIGGER update_product_rating_update_trigger
    AFTER UPDATE ON product_reviews
    FOR EACH ROW
BEGIN
    UPDATE products 
    SET 
        rating = (
            SELECT ROUND(AVG(rating), 2) 
            FROM product_reviews 
            WHERE product_id = NEW.product_id AND is_approved = true
        ),
        review_count = (
            SELECT COUNT(*) 
            FROM product_reviews 
            WHERE product_id = NEW.product_id AND is_approved = true
        )
    WHERE id = NEW.product_id;
END//

-- Trigger to generate order number
CREATE TRIGGER generate_order_number_trigger
    BEFORE INSERT ON orders
    FOR EACH ROW
BEGIN
    DECLARE next_val INT;
    
    -- Get next sequence value (simulate sequence with a variable)
    SET @order_seq = COALESCE(@order_seq, 0) + 1;
    SET next_val = @order_seq;
    
    SET NEW.order_number = CONCAT('EC', DATE_FORMAT(CURDATE(), '%Y%m%d'), LPAD(next_val, 6, '0'));
END//

DELIMITER ;

-- ====================================
-- PERFORMANCE OPTIMIZATION
-- ====================================

-- MySQL uses ANALYZE TABLE for optimization
-- These can be run periodically in production
-- ANALYZE TABLE users;
-- ANALYZE TABLE categories;
-- ANALYZE TABLE products;
-- ANALYZE TABLE orders;
-- ANALYZE TABLE order_items;
-- ANALYZE TABLE cart_items;
-- ANALYZE TABLE product_reviews;
-- ANALYZE TABLE user_addresses;

-- ====================================
-- USEFUL QUERIES FOR DEVELOPMENT
-- ====================================

-- Get products with category and reviews
/*
SELECT 
    p.id,
    p.name,
    p.price,
    p.rating,
    p.review_count,
    c.name as category_name,
    p.stock
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
ORDER BY p.created_at DESC;
*/

-- Get user orders with items
/*
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.total,
    o.created_at,
    oi.product_name,
    oi.quantity,
    oi.price
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = 1
ORDER BY o.created_at DESC;
*/

-- Get cart items for user
/*
SELECT 
    ci.id,
    ci.quantity,
    p.name,
    p.price,
    JSON_UNQUOTE(JSON_EXTRACT(p.images, '$[0]')) as image,
    (ci.quantity * p.price) as total
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
WHERE ci.user_id = 1;
*/
