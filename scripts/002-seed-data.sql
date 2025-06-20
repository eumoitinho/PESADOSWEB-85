-- Seed initial data for Pesados Web (PostgreSQL/Neon)

-- Insert categories
INSERT INTO categories (name, slug) VALUES
('Caminhões', 'caminhoes'),
('Tratores', 'tratores'),
('Implementos Agrícolas', 'implementos')
ON CONFLICT (slug) DO NOTHING;

-- Insert brands for trucks
INSERT INTO brands (name, category_id) VALUES
('Volvo', 1),
('Scania', 1),
('Mercedes-Benz', 1),
('DAF', 1),
('Iveco', 1),
('Ford', 1),
('Volkswagen', 1)
ON CONFLICT DO NOTHING;

-- Insert brands for tractors
INSERT INTO brands (name, category_id) VALUES
('John Deere', 2),
('Case IH', 2),
('New Holland', 2),
('Massey Ferguson', 2),
('Valtra', 2),
('Fendt', 2)
ON CONFLICT DO NOTHING;

-- Insert brands for implements
INSERT INTO brands (name, category_id) VALUES
('Jumil', 3),
('Semeato', 3),
('Marchesan', 3),
('Baldan', 3),
('Tatu', 3),
('Piccin', 3)
ON CONFLICT DO NOTHING;

-- Insert admin user
INSERT INTO users (id, email, password_hash, name, phone, location, role, email_verified) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@pesadosweb.com.br', '$2b$10$rQZ9QmjytWIeJqNdNdNdNOQZ9QmjytWIeJqNdNdNdNO', 'Admin Pesados Web', '(41) 99999-0000', 'Curitiba, PR', 'admin', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Insert test user
INSERT INTO users (id, email, password_hash, name, phone, location, role, email_verified) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'user@test.com', '$2b$10$rQZ9QmjytWIeJqNdNdNdNOQZ9QmjytWIeJqNdNdNdNO', 'João Silva', '(41) 99999-1111', 'Curitiba, PR', 'user', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Insert sample vehicles
INSERT INTO vehicles (id, user_id, category_id, brand_id, model, year, price, mileage, condition_type, description, location, status, expires_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 1, 1, 'FH 540 6x4', 2020, 450000.00, 120000, 'used', 'Caminhão Volvo FH 540 em excelente estado de conservação. Revisões em dia, pneus novos.', 'Curitiba, PR', 'approved', CURRENT_DATE + INTERVAL '30 days'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 1, 2, 'R 450 A6x2', 2021, 520000.00, 85000, 'used', 'Scania R 450 com baixa quilometragem. Único dono, todas as revisões na concessionária.', 'São José dos Pinhais, PR', 'approved', CURRENT_DATE + INTERVAL '25 days'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440001', 1, 3, 'Actros 2651', 2022, 680000.00, 45000, 'used', 'Mercedes-Benz Actros seminovo, garantia de fábrica ainda válida.', 'Curitiba, PR', 'pending', CURRENT_DATE + INTERVAL '30 days'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440001', 2, 8, '6110J', 2023, 320000.00, 1200, 'new', 'Trator John Deere 6110J zero quilômetro, direto da concessionária.', 'Ponta Grossa, PR', 'approved', CURRENT_DATE + INTERVAL '30 days')
ON CONFLICT (id) DO NOTHING;

-- Insert vehicle images
INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440010', '/images/volvo-truck-1.jpg', TRUE, 1),
('550e8400-e29b-41d4-a716-446655440011', '/images/pink-scania.jpg', TRUE, 1),
('550e8400-e29b-41d4-a716-446655440012', '/images/mercedes-truck.jpg', TRUE, 1),
('550e8400-e29b-41d4-a716-446655440013', '/images/red-volvo.jpg', TRUE, 1)
ON CONFLICT DO NOTHING;

-- Insert banner ads
INSERT INTO banner_ads (id, company_name, image_url, link_url, placement, location_target, price, status, start_date, end_date) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'Scania Cotrasa', '/images/scania-banner.png', 'https://scania.com.br', 'header', 'Paraná', 600.00, 'approved', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days'),
('550e8400-e29b-41d4-a716-446655440021', 'Volvo Trucks Curitiba', '/images/volvo-truck-1.jpg', 'https://volvo.com', 'sidebar', 'Curitiba', 400.00, 'approved', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample payments
INSERT INTO payments (user_id, vehicle_id, amount, payment_method, payment_status, transaction_id) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 50.00, 'credit_card', 'completed', 'TXN_001'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', 50.00, 'pix', 'completed', 'TXN_002'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440012', 50.00, 'boleto', 'pending', 'TXN_003')
ON CONFLICT DO NOTHING;
