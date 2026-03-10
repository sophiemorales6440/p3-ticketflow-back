INSERT INTO items (title) VALUES
  ('Premier item'),
  ('Deuxième item'),
  ('Troisième item');

-- data fictive pour dev à mettre dans les tables
USE ticketflow;
-- Users fictifs
INSERT INTO users (firstname, lastname, email, password, role) VALUES
('Admin', 'Test', 'admin@test.com', 'password123', 'admin'),
('Tech', 'Dupont', 'tech@test.com', 'password123', 'technician'),
('Client', 'Martin', 'client@test.com', 'password123', 'client');

-- Categories fictives
INSERT INTO categories (name) VALUES
('Matériel'),
('Logiciel'),
('Réseau'),
('Autre');

-- Tickets fictifs
INSERT INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES
('Mon écran ne fonctionne plus', 'Ecran noir au démarrage', 'open', 'high', 3, 2, 1),
('Problème de connexion VPN', 'Impossible de se connecter au VPN', 'open', 'medium', 3, NULL, 3),
('Logiciel qui plante', 'Excel crash au démarrage', 'in_progress', 'low', 3, 2, 2);