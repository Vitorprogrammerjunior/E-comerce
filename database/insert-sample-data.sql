-- Inserir categorias
INSERT IGNORE INTO categories (id, name, slug, description, is_active) VALUES
(1, 'Eletrônicos', 'eletronicos', 'Produtos eletrônicos e tecnologia', true),
(2, 'Smartphones', 'smartphones', 'Celulares e smartphones', true),
(3, 'Notebooks', 'notebooks', 'Notebooks e laptops', true),
(4, 'Áudio', 'audio', 'Fones e equipamentos de áudio', true),
(5, 'Wearables', 'wearables', 'Smartwatches e dispositivos vestíveis', true);

-- Inserir produtos de exemplo (matching the actual schema)
INSERT IGNORE INTO products (id, name, slug, description, price, compare_price, category_id, stock, is_featured, is_active, images) VALUES
(1, 'Smartphone Premium X1', 'smartphone-premium-x1', 'Smartphone com tecnologia avançada e design elegante. Tela AMOLED de 6.7", processador octa-core, 128GB de armazenamento e câmera tripla de 48MP.', 1299.99, 1599.99, 2, 50, true, true, '["https://via.placeholder.com/500x500/FF6B6B/ffffff?text=Smartphone+X1", "https://via.placeholder.com/500x500/4ECDC4/ffffff?text=Smartphone+X1+Side"]'),
(2, 'Notebook Profissional Pro', 'notebook-profissional-pro', 'Notebook para trabalho e jogos com alta performance. Intel i7, 16GB RAM, SSD 512GB, placa de vídeo dedicada.', 2499.99, 2899.99, 3, 30, true, true, '["https://via.placeholder.com/500x500/45B7D1/ffffff?text=Notebook+Pro", "https://via.placeholder.com/500x500/96CEB4/ffffff?text=Notebook+Keyboard"]'),
(3, 'Fone Bluetooth Premium', 'fone-bluetooth-premium', 'Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de 30h e qualidade de som superior.', 399.99, 599.99, 4, 75, false, true, '["https://via.placeholder.com/500x500/FECA57/ffffff?text=Headphone+Premium"]'),
(4, 'Smartwatch Esportivo Pro', 'smartwatch-esportivo-pro', 'Relógio inteligente com GPS, monitor cardíaco, resistente à água e bateria de 7 dias.', 899.99, 1199.99, 5, 40, true, true, '["https://via.placeholder.com/500x500/FF9FF3/ffffff?text=Smartwatch+Pro"]'),
(5, 'Tablet Pro 11 Premium', 'tablet-pro-11-premium', 'Tablet profissional com tela 11", processador M1, 128GB, compatível com caneta digital.', 1899.99, 2199.99, 1, 25, true, true, '["https://via.placeholder.com/500x500/54A0FF/ffffff?text=Tablet+Pro+11"]');
