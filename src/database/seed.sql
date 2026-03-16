SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE attachments;
TRUNCATE TABLE tickets;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
TRUNCATE TABLE items;

SET FOREIGN_KEY_CHECKS = 1;

------------------------------------------------------------
-- 0) ITEMS (données dev)
------------------------------------------------------------

INSERT INTO items (title) VALUES
  ('Premier item'),
  ('Deuxième item'),
  ('test item test'),
  ('Troisième item');

-- data fictive pour dev à mettre dans les tables
INSERT INTO users (firstname, lastname, email, password)
VALUES 
('Tom', 'Doe', 'Tom@example.com', 'azerty'),
('Marie', 'Dupont', 'marie@example.com', '123456789'),
('James', 'Cook', 'james@example.com', 'motdepasse'),
('Victor', 'Doer', 'victor@example.com', 'gitgud'),
('John', 'Battlefield', 'John@example.com', 'getrekt');

USE ticketflow;
-- Users fictifs
INSERT IGNORE INTO users (firstname, lastname, email, password, role) VALUES
('Admin', 'Test', 'admin@test.com', 'password123', 'admin'),
('Tech', 'Dupont', 'tech@test.com', 'password123', 'technician'),
('Client', 'Martin', 'client@test.com', 'password123', 'client');

-- Categories fictives
INSERT IGNORE INTO categories (name) VALUES
('Matériel'),
('Logiciel'),
('Réseau'),
('Autre');

-- Tickets fictifs
INSERT IGNORE INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES
('Mon écran ne fonctionne plus', 'Ecran noir au démarrage', 'open', 'high', 3, 2, 1),
('Problème de connexion VPN', 'Impossible de se connecter au VPN', 'open', 'medium', 3, NULL, 3),
('Logiciel qui plante', 'Excel crash au démarrage', 'in_progress', 'low', 3, 2, 2);

INSERT INTO comments (content, author_id, ticket_id) VALUES
('premier commentaire', 1, 1),
('deuxiéme commentaire', 2, 1),
('troisiéme commentaire', 1, 2);