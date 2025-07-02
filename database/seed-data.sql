-- ====================================
-- DADOS DE TESTE PARA E-COMMERCE
-- Execute após criar o schema principal
-- ====================================

-- Limpar dados existentes (cuidado em produção!)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE product_reviews;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE user_addresses;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ====================================
-- USUÁRIOS DE TESTE
-- ====================================
INSERT INTO users (name, email, password, phone) VALUES
('Admin Teste', 'admin@ecommerce.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 99999-9999'),
('João Silva', 'joao@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 98888-8888'),
('Maria Santos', 'maria@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 97777-7777'),
('Pedro Costa', 'pedro@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 96666-6666'),
('Ana Paula', 'ana@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 95555-5555');

-- Senha para todos os usuários: 123456

-- ====================================
-- ENDEREÇOS DOS USUÁRIOS
-- ====================================
INSERT INTO user_addresses (user_id, first_name, last_name, street, city, state, zip_code, is_default) VALUES
(1, 'Admin', 'Teste', 'Av. Paulista, 1000', 'São Paulo', 'SP', '01310-100', true),
(2, 'João', 'Silva', 'Rua das Flores, 123', 'São Paulo', 'SP', '01234-567', true),
(3, 'Maria', 'Santos', 'Av. Rio Branco, 456', 'Rio de Janeiro', 'RJ', '20040-020', true),
(4, 'Pedro', 'Costa', 'Rua da Praia, 789', 'Salvador', 'BA', '40070-110', true),
(5, 'Ana', 'Paula', 'Av. Boa Viagem, 321', 'Recife', 'PE', '51011-000', true);

-- ====================================
-- CATEGORIAS
-- ====================================
INSERT INTO categories (name, slug, description, image, sort_order) VALUES
('Eletrônicos', 'eletronicos', 'Smartphones, laptops, tablets, fones de ouvido e acessórios tecnológicos', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', 1),
('Roupas e Moda', 'roupas-moda', 'Roupas masculinas, femininas, calçados e acessórios de moda', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', 2),
('Casa e Decoração', 'casa-decoracao', 'Móveis, decoração, utensílios domésticos e jardim', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 3),
('Esportes e Fitness', 'esportes-fitness', 'Equipamentos esportivos, roupas fitness e suplementos', 'https://images.unsplash.com/photo-1571019613914-85e35ad35544?w=400', 4),
('Livros e Educação', 'livros-educacao', 'Livros técnicos, literatura, cursos e materiais educacionais', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 5),
('Beleza e Cuidados', 'beleza-cuidados', 'Cosméticos, perfumes, cuidados pessoais e produtos de beleza', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', 6);

-- Subcategorias
INSERT INTO categories (name, slug, description, parent_id, sort_order) VALUES
('Smartphones', 'smartphones', 'iPhones, Samsung, Xiaomi e outras marcas', 1, 1),
('Laptops', 'laptops', 'Notebooks para trabalho, jogos e estudos', 1, 2),
('Fones de Ouvido', 'fones-ouvido', 'Fones bluetooth, com fio e gamers', 1, 3),
('Roupas Masculinas', 'roupas-masculinas', 'Camisetas, calças, jaquetas masculinas', 2, 1),
('Roupas Femininas', 'roupas-femininas', 'Vestidos, blusas, saias femininas', 2, 2),
('Calçados', 'calcados', 'Tênis, sapatos, sandálias e botas', 2, 3);

-- ====================================
-- PRODUTOS DETALHADOS
-- ====================================
INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, stock, category_id, images, features, specifications, tags, is_featured, rating, review_count) VALUES

-- ELETRÔNICOS
('iPhone 15 Pro 128GB Titânio Natural', 'iphone-15-pro-128gb-titanio', 
'O iPhone 15 Pro redefine o que um smartphone pode ser. Com o revolucionário chip A17 Pro, sistema de câmera Pro avançado com zoom óptico 3x, e design premium em titânio grau aeroespacial. Tela Super Retina XDR de 6,1 polegadas com ProMotion e Always-On display.', 
'iPhone 15 Pro com chip A17 Pro, câmera 48MP e design em titânio', 
8999.00, 9999.00, 'IP15P128TN', 45, 7,
JSON_ARRAY('https://images.unsplash.com/photo-1592286130937-7c2e6d8d57a9?w=600', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'),
JSON_ARRAY('Chip A17 Pro', 'Câmera tripla 48MP', 'Zoom óptico 3x', 'Design em titânio', 'USB-C', '5G'),
JSON_OBJECT('tela', '6.1 Super Retina XDR', 'chip', 'A17 Pro', 'camera', '48MP + 12MP + 12MP', 'bateria', 'Até 23h de vídeo', 'armazenamento', '128GB', 'peso', '187g'),
JSON_ARRAY('smartphone', 'apple', 'iphone', 'premium', 'titanio'),
true, 4.8, 156),

('Samsung Galaxy S24 Ultra 256GB', 'samsung-galaxy-s24-ultra-256gb',
'O Galaxy S24 Ultra eleva a fotografia mobile a um novo patamar com sua câmera de 200MP e zoom espacial de 100x. S Pen integrada, tela Dynamic AMOLED 2X de 6.8 polegadas e processador Snapdragon 8 Gen 3 garantem performance excepcional.',
'Galaxy S24 Ultra com S Pen, câmera 200MP e zoom 100x',
7999.00, 8999.00, 'SGS24U256', 32, 7,
JSON_ARRAY('https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600', 'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=600'),
JSON_ARRAY('S Pen integrada', 'Câmera 200MP', 'Zoom 100x', 'Tela 6.8 AMOLED', 'Snapdragon 8 Gen 3', '5G'),
JSON_OBJECT('tela', '6.8 Dynamic AMOLED 2X', 'chip', 'Snapdragon 8 Gen 3', 'camera', '200MP + 50MP + 12MP + 10MP', 'bateria', '5000mAh', 'armazenamento', '256GB', 'peso', '232g'),
JSON_ARRAY('smartphone', 'samsung', 'galaxy', 's-pen', 'camera'),
true, 4.7, 203),

('MacBook Air M3 13" 256GB', 'macbook-air-m3-13-256gb',
'O MacBook Air mais poderoso de todos os tempos. Com o chip M3 da Apple, oferece performance até 60% mais rápida que o M1. Tela Liquid Retina de 13 polegadas, até 18 horas de bateria e design ultrafino em apenas 1,24kg.',
'MacBook Air M3 ultrafino, poderoso e eficiente',
12999.00, 14999.00, 'MBA13M3256', 28, 8,
JSON_ARRAY('https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'),
JSON_ARRAY('Chip M3', 'Tela Liquid Retina 13', 'Até 18h de bateria', '1.24kg', 'MagSafe', '2x Thunderbolt'),
JSON_OBJECT('tela', '13.6 Liquid Retina', 'chip', 'Apple M3', 'memoria', '8GB RAM', 'armazenamento', '256GB SSD', 'bateria', 'Até 18 horas', 'peso', '1.24kg'),
JSON_ARRAY('macbook', 'apple', 'laptop', 'm3', 'ultrabook'),
true, 4.9, 89),

('AirPods Pro 2ª Geração USB-C', 'airpods-pro-2-usb-c',
'AirPods Pro com cancelamento ativo de ruído 2x mais eficaz, áudio espacial personalizado e até 6 horas de reprodução. Estojo com carregamento USB-C e MagSafe.',
'AirPods Pro com cancelamento de ruído avançado',
2199.00, 2499.00, 'APP2USBC', 60, 9,
JSON_ARRAY('https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600'),
JSON_ARRAY('Cancelamento ativo de ruído', 'Áudio espacial', 'USB-C', 'MagSafe', 'À prova de suor'),
JSON_OBJECT('bateria', '6h + 24h estojo', 'conectividade', 'Bluetooth 5.3', 'resistencia', 'IPX4', 'chip', 'H2'),
JSON_ARRAY('airpods', 'apple', 'fones', 'bluetooth', 'premium'),
true, 4.6, 134),

-- ROUPAS E MODA
('Camiseta Premium 100% Algodão', 'camiseta-premium-algodao',
'Camiseta básica premium confeccionada em 100% algodão penteado, com acabamento diferenciado e modelagem ajustada. Disponível em diversas cores e tamanhos.',
'Camiseta premium de algodão com qualidade superior',
89.90, 119.90, 'CAM001', 200, 10,
JSON_ARRAY('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', 'https://images.unsplash.com/photo-1583743814966-8936f37f4a25?w=600'),
JSON_ARRAY('100% algodão penteado', 'Modelagem ajustada', 'Acabamento premium', 'Várias cores', 'Tamanhos P ao GG'),
JSON_OBJECT('material', '100% Algodão penteado', 'gramatura', '160g/m²', 'modelagem', 'Ajustada', 'origem', 'Brasil'),
JSON_ARRAY('camiseta', 'algodao', 'basica', 'premium', 'casual'),
false, 4.5, 267),

('Jeans Skinny Feminino', 'jeans-skinny-feminino',
'Calça jeans skinny feminina com elastano para maior conforto e mobilidade. Modelagem que valoriza o corpo e lavagem moderna.',
'Jeans skinny confortável com elastano',
159.90, 199.90, 'JEA001F', 150, 11,
JSON_ARRAY('https://images.unsplash.com/photo-1582418702614-e4776b1e1ee?w=600'),
JSON_ARRAY('98% algodão + 2% elastano', 'Modelagem skinny', 'Cintura média', 'Lavagem stonewash'),
JSON_OBJECT('material', '98% Algodão, 2% Elastano', 'modelagem', 'Skinny', 'cintura', 'Média'),
JSON_ARRAY('jeans', 'feminino', 'skinny', 'elastano', 'conforto'),
false, 4.3, 89),

('Tênis Running Profissional', 'tenis-running-profissional',
'Tênis desenvolvido para corrida com tecnologia de amortecimento avançada, solado antiderrapante e cabedal respirável. Ideal para treinos e competições.',
'Tênis profissional para corrida e performance',
349.90, 449.90, 'TEN001', 85, 12,
JSON_ARRAY('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600'),
JSON_ARRAY('Amortecimento avançado', 'Solado antiderrapante', 'Cabedal respirável', 'Drop 8mm', 'Peso 280g'),
JSON_OBJECT('peso', '280g', 'drop', '8mm', 'solado', 'Borracha antiderrapante', 'cabedal', 'Mesh respirável'),
JSON_ARRAY('tenis', 'running', 'corrida', 'esporte', 'performance'),
true, 4.7, 145),

-- CASA E DECORAÇÃO
('Sofá 3 Lugares Cinza Moderno', 'sofa-3-lugares-cinza-moderno',
'Sofá moderno de 3 lugares em tecido cinza claro, estrutura em madeira maciça e espuma de alta densidade. Design contemporâneo que combina com qualquer ambiente.',
'Sofá moderno e confortável para sala de estar',
1899.00, 2399.00, 'SOF001', 12, 3,
JSON_ARRAY('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'),
JSON_ARRAY('Estrutura madeira maciça', 'Espuma alta densidade', 'Tecido resistente', 'Design moderno', '3 lugares'),
JSON_OBJECT('dimensoes', '210x90x75cm', 'material', 'Madeira + Tecido', 'peso', '45kg', 'cor', 'Cinza claro'),
JSON_ARRAY('sofa', 'moveis', 'sala', 'moderno', 'conforto'),
false, 4.4, 67),

('Kit Panelas Antiaderente 5 Peças', 'kit-panelas-antiaderente-5pecas',
'Conjunto de panelas antiaderente com revestimento cerâmico, cabo ergonômico e fundo triplo para distribuição uniforme do calor.',
'Kit completo de panelas antiaderente',
299.90, 399.90, 'PAN001', 40, 3,
JSON_ARRAY('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'),
JSON_ARRAY('Revestimento cerâmico', 'Cabo ergonômico', 'Fundo triplo', '5 peças', 'Livre de PFOA'),
JSON_OBJECT('pecas', '5 panelas', 'material', 'Alumínio + Cerâmica', 'compatibilidade', 'Todas as fontes de calor'),
JSON_ARRAY('panelas', 'cozinha', 'antiaderente', 'ceramica', 'kit'),
false, 4.2, 123),

-- ESPORTES E FITNESS
('Halteres Ajustáveis 2x10kg', 'halteres-ajustaveis-2x10kg',
'Par de halteres ajustáveis com placas removíveis, sistema de trava seguro e pegada antiderrapante. Ideais para treino em casa.',
'Halteres versáteis para exercícios em casa',
249.90, 319.90, 'HAL001', 35, 4,
JSON_ARRAY('https://images.unsplash.com/photo-1571019613914-85e35ad35544?w=600'),
JSON_ARRAY('Peso ajustável', 'Sistema de trava', 'Pegada antiderrapante', 'Placas removíveis', '2x10kg'),
JSON_OBJECT('peso_max', '10kg cada', 'material', 'Ferro fundido', 'sistema', 'Rosca de trava'),
JSON_ARRAY('halteres', 'musculacao', 'casa', 'fitness', 'peso'),
false, 4.5, 89),

-- LIVROS
('JavaScript: O Guia Definitivo 7ª Ed', 'javascript-guia-definitivo-7ed',
'A referência completa para programadores JavaScript. Cobre desde os fundamentos até recursos avançados do ES2020, com exemplos práticos e projetos.',
'Guia completo e atualizado de JavaScript',
149.90, 179.90, 'LIV001', 45, 5,
JSON_ARRAY('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600'),
JSON_ARRAY('7ª Edição', 'ES2020', '1200 páginas', 'Exemplos práticos', 'Projetos reais'),
JSON_OBJECT('paginas', '1200', 'edicao', '7ª', 'idioma', 'Português', 'editora', 'Novatec'),
JSON_ARRAY('javascript', 'programacao', 'livro', 'tecnico', 'desenvolvimento'),
false, 4.8, 156),

-- BELEZA
('Perfume Masculino Elegance 100ml', 'perfume-masculino-elegance-100ml',
'Fragrância masculina sofisticada com notas de bergamota, lavanda e madeira de sândalo. Fixação de 8 horas.',
'Perfume masculino elegante e duradouro',
189.90, 249.90, 'PER001M', 25, 6,
JSON_ARRAY('https://images.unsplash.com/photo-1541643600914-78b084683601?w=600'),
JSON_ARRAY('Fixação 8h', 'Notas amadeiradas', '100ml', 'Frasco premium', 'Fragrância importada'),
JSON_OBJECT('volume', '100ml', 'familia', 'Amadeirada', 'fixacao', '8 horas', 'concentracao', 'Eau de Parfum'),
JSON_ARRAY('perfume', 'masculino', 'fragrancia', 'elegance', 'amadeirado'),
false, 4.3, 78);

-- ====================================
-- AVALIAÇÕES DOS PRODUTOS
-- ====================================
INSERT INTO product_reviews (product_id, user_id, rating, title, comment, is_approved) VALUES
(1, 2, 5, 'iPhone incrível!', 'Melhor smartphone que já tive. Câmera excepcional e bateria dura o dia todo.', true),
(1, 3, 5, 'Vale cada centavo', 'Design premium e performance impecável. Recomendo muito!', true),
(1, 4, 4, 'Muito bom, mas caro', 'Produto excelente, mas o preço é bem salgado. Qualidade Apple como sempre.', true),

(2, 2, 5, 'S Pen é fantástica', 'A S Pen faz toda a diferença. Uso para trabalho e é perfeita.', true),
(2, 5, 4, 'Câmera impressionante', 'As fotos ficam incríveis, principalmente com zoom. Bateria boa também.', true),

(3, 3, 5, 'MacBook perfeito', 'Chip M3 é muito rápido. Bateria dura o dia inteiro de trabalho.', true),
(3, 4, 5, 'Melhor compra do ano', 'Leve, potente e silencioso. Ideal para programação e design.', true),

(7, 2, 4, 'Bom custo-benefício', 'Halteres de boa qualidade, sistema de trava funciona bem.', true),
(7, 5, 5, 'Excelente para casa', 'Perfeitos para treino em casa. Economizei na academia!', true),

(5, 3, 4, 'Camiseta de qualidade', 'Tecido macio e durável. Não desbota na lavagem.', true),
(5, 4, 5, 'Muito confortável', 'Modelagem perfeita e algodão de primeira. Recomendo.', true);

-- ====================================
-- CARRINHO DE COMPRAS (exemplo)
-- ====================================
INSERT INTO cart_items (user_id, product_id, quantity, price) VALUES
(2, 1, 1, 8999.00),  -- João tem iPhone no carrinho
(2, 4, 1, 2199.00),  -- João tem AirPods no carrinho
(3, 3, 1, 12999.00), -- Maria tem MacBook no carrinho
(4, 7, 2, 249.90);   -- Pedro tem 2 halteres no carrinho

-- ====================================
-- PEDIDOS DE EXEMPLO
-- ====================================
INSERT INTO orders (user_id, status, payment_status, payment_method, subtotal, shipping_amount, total, shipping_address, notes) VALUES
(2, 'delivered', 'paid', 'credit_card', 11198.00, 0.00, 11198.00, 
'{"firstName": "João", "lastName": "Silva", "street": "Rua das Flores, 123", "city": "São Paulo", "state": "SP", "zipCode": "01234-567", "country": "Brasil"}',
'Entrega rápida, produto em perfeito estado'),

(3, 'shipped', 'paid', 'pix', 12999.00, 0.00, 12999.00,
'{"firstName": "Maria", "lastName": "Santos", "street": "Av. Rio Branco, 456", "city": "Rio de Janeiro", "state": "RJ", "zipCode": "20040-020", "country": "Brasil"}',
'Pagamento via PIX processado'),

(4, 'processing', 'paid', 'credit_card', 499.80, 29.90, 529.70,
'{"firstName": "Pedro", "lastName": "Costa", "street": "Rua da Praia, 789", "city": "Salvador", "state": "BA", "zipCode": "40070-110", "country": "Brasil"}',
'Pedido em preparação');

-- ====================================
-- ITENS DOS PEDIDOS
-- ====================================
INSERT INTO order_items (order_id, product_id, product_name, product_sku, quantity, price, total) VALUES
-- Pedido 1 (João)
(1, 1, 'iPhone 15 Pro 128GB Titânio Natural', 'IP15P128TN', 1, 8999.00, 8999.00),
(1, 4, 'AirPods Pro 2ª Geração USB-C', 'APP2USBC', 1, 2199.00, 2199.00),

-- Pedido 2 (Maria) 
(2, 3, 'MacBook Air M3 13" 256GB', 'MBA13M3256', 1, 12999.00, 12999.00),

-- Pedido 3 (Pedro)
(3, 7, 'Halteres Ajustáveis 2x10kg', 'HAL001', 2, 249.90, 499.80);

-- ====================================
-- ATUALIZAR CONTADORES
-- ====================================

-- Atualizar contagem de vendas dos produtos
UPDATE products SET sold_count = (
    SELECT COALESCE(SUM(oi.quantity), 0)
    FROM order_items oi 
    JOIN orders o ON oi.order_id = o.id 
    WHERE oi.product_id = products.id 
    AND o.status IN ('shipped', 'delivered')
);

-- Atualizar ratings baseados nas reviews
UPDATE products SET 
    rating = (
        SELECT ROUND(AVG(rating), 2) 
        FROM product_reviews 
        WHERE product_id = products.id AND is_approved = true
    ),
    review_count = (
        SELECT COUNT(*) 
        FROM product_reviews 
        WHERE product_id = products.id AND is_approved = true
    );

-- ====================================
-- VERIFICAÇÃO DOS DADOS
-- ====================================

-- Verificar se tudo foi inserido corretamente
SELECT 'Usuários' as tabela, COUNT(*) as total FROM users
UNION ALL
SELECT 'Categorias', COUNT(*) FROM categories
UNION ALL  
SELECT 'Produtos', COUNT(*) FROM products
UNION ALL
SELECT 'Reviews', COUNT(*) FROM product_reviews
UNION ALL
SELECT 'Itens no Carrinho', COUNT(*) FROM cart_items
UNION ALL
SELECT 'Pedidos', COUNT(*) FROM orders
UNION ALL
SELECT 'Itens de Pedidos', COUNT(*) FROM order_items;

-- Ver produtos mais vendidos
SELECT 
    p.name,
    p.sold_count,
    p.rating,
    p.price
FROM products p
ORDER BY p.sold_count DESC, p.rating DESC
LIMIT 5;
