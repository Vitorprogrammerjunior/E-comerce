-- ====================================
-- ATUALIZAR IMAGENS DOS PRODUTOS
-- Script para adicionar imagens reais aos produtos existentes
-- ====================================

-- Atualizar imagens dos produtos existentes
UPDATE products SET images = '["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop"]' WHERE id = 1;

UPDATE products SET images = '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1587614295999-6c1c3a7ebf15?w=500&h=500&fit=crop"]' WHERE id = 2;

UPDATE products SET images = '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"]' WHERE id = 3;

UPDATE products SET images = '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop"]' WHERE id = 4;

UPDATE products SET images = '["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1585789575045-7b1c5e154a5e?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop"]' WHERE id = 5;

-- Adicionar mais produtos com imagens se necessário
INSERT IGNORE INTO products (name, slug, description, price, compare_price, category_id, stock, is_featured, is_active, images) VALUES
('iPhone 14 Pro Max', 'iphone-14-pro-max', 'iPhone com chip A16 Bionic, tela Super Retina XDR de 6.7", câmera Pro com zoom óptico 3x', 5999.99, 6999.99, 2, 20, true, true, '["https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop"]'),

('MacBook Pro 14"', 'macbook-pro-14', 'MacBook Pro com chip M2 Pro, 16GB RAM, SSD 512GB, tela Liquid Retina XDR', 12999.99, 14999.99, 3, 15, true, true, '["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=500&h=500&fit=crop"]'),

('AirPods Pro 2', 'airpods-pro-2', 'Fones sem fio com cancelamento de ruído ativo, áudio espacial e até 6h de bateria', 1499.99, 1799.99, 4, 60, false, true, '["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop"]'),

('Apple Watch Series 9', 'apple-watch-series-9', 'Apple Watch com chip S9, GPS, resistente à água, monitoramento de saúde avançado', 2299.99, 2699.99, 5, 35, true, true, '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?w=500&h=500&fit=crop"]'),

('iPad Air 5', 'ipad-air-5', 'iPad Air com chip M1, tela 10.9", 256GB, compatível com Apple Pencil', 3999.99, 4499.99, 1, 25, true, true, '["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1585789575045-7b1c5e154a5e?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop"]'),

('Samsung Galaxy S23 Ultra', 'samsung-galaxy-s23-ultra', 'Smartphone Android com S Pen, câmera de 200MP, tela Dynamic AMOLED 2X de 6.8"', 4999.99, 5999.99, 2, 30, true, true, '["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop"]'),

('Dell XPS 13', 'dell-xps-13', 'Notebook ultra-portátil com Intel i7, 16GB RAM, SSD 1TB, tela InfinityEdge 13.4"', 6499.99, 7999.99, 3, 20, false, true, '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=500&h=500&fit=crop"]'),

('Sony WH-1000XM4', 'sony-wh-1000xm4', 'Fone over-ear com cancelamento de ruído líder da indústria, 30h de bateria', 1299.99, 1599.99, 4, 45, false, true, '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"]'),

('Garmin Forerunner 955', 'garmin-forerunner-955', 'Smartwatch esportivo com GPS, mapeamento, bateria de 15 dias, métricas avançadas', 2799.99, 3299.99, 5, 25, false, true, '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop"]'),

('Microsoft Surface Pro 9', 'microsoft-surface-pro-9', 'Tablet 2-em-1 com Intel i7, 16GB RAM, SSD 512GB, tela touchscreen 13"', 7999.99, 8999.99, 1, 18, true, true, '["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1585789575045-7b1c5e154a5e?w=500&h=500&fit=crop", "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop"]');

-- Atualizar imagens das categorias também
UPDATE categories SET image = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop' WHERE id = 1;
UPDATE categories SET image = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop' WHERE id = 2;
UPDATE categories SET image = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop' WHERE id = 3;
UPDATE categories SET image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop' WHERE id = 4;
UPDATE categories SET image = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop' WHERE id = 5;
