-- Inserir categorias
INSERT IGNORE INTO categories (id, name, slug, description, is_active) VALUES
(1, 'Eletrônicos', 'eletronicos', 'Produtos eletrônicos e tecnologia', true),
(2, 'Smartphones', 'smartphones', 'Celulares e smartphones', true),
(3, 'Notebooks', 'notebooks', 'Notebooks e laptops', true),
(4, 'Áudio', 'audio', 'Fones e equipamentos de áudio', true),
(5, 'Wearables', 'wearables', 'Smartwatches e dispositivos vestíveis', true);

-- Inserir produtos de exemplo (matching the actual schema)
INSERT IGNORE INTO products (id, name, slug, description, price, compare_price, category_id, stock, is_featured, is_active, images) VALUES
(1, 'Smartphone Premium X1', 'smartphone-premium-x1', 'Smartphone com tecnologia avançada e design elegante. Tela AMOLED de 6.7", processador octa-core, 128GB de armazenamento e câmera tripla de 48MP.', 1299.99, 1599.99, 2, 50, true, true, '["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop"]'),
(2, 'Notebook Profissional Pro', 'notebook-profissional-pro', 'Notebook para trabalho e jogos com alta performance. Intel i7, 16GB RAM, SSD 512GB, placa de vídeo dedicada.', 2499.99, 2899.99, 3, 30, true, true, '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1587614295999-6c1c3a7ebf15?w=500&h=500&fit=crop"]'),
(3, 'Fone Bluetooth Premium', 'fone-bluetooth-premium', 'Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de 30h e qualidade de som superior.', 399.99, 599.99, 4, 75, false, true, '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"]'),
(4, 'Smartwatch Esportivo Pro', 'smartwatch-esportivo-pro', 'Relógio inteligente com GPS, monitor cardíaco, resistente à água e bateria de 7 dias.', 899.99, 1199.99, 5, 40, true, true, '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop"]'),
(5, 'Tablet Pro 11 Premium', 'tablet-pro-11-premium', 'Tablet profissional com tela 11", processador M1, 128GB, compatível com caneta digital.', 1899.99, 2199.99, 1, 25, true, true, '["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1585789575045-7b1c5e154a5e?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop"]');
