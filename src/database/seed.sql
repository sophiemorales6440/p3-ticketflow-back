SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE attachments;
TRUNCATE TABLE comments;
TRUNCATE TABLE tickets;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
TRUNCATE TABLE items;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO items (title) VALUES
  ('Premier item'),
  ('Deuxième item'),
  ('test item test'),
  ('Troisième item');

INSERT INTO users (firstname, lastname, email, password)
VALUES 
('Tom', 'Doe', 'Tom@example.com', 'azerty'),
('Marie', 'Dupont', 'marie@example.com', '123456789'),
('James', 'Cook', 'james@example.com', 'motdepasse'),
('Victor', 'Doer', 'victor@example.com', 'gitgud'),
('John', 'Battlefield', 'John@example.com', 'getrekt');

INSERT IGNORE INTO categories (name) VALUES
('Matériel'),
('Logiciel'),
('Réseau'),
('Autre');

INSERT IGNORE INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES
('Mon écran ne fonctionne plus', 'Ecran noir au démarrage', 'open', 'high', 3, 2, 1),
('Problème de connexion VPN', 'Impossible de se connecter au VPN', 'open', 'medium', 3, NULL, 3),
('Logiciel qui plante', 'Excel crash au démarrage', 'in_progress', 'low', 3, 2, 2);

INSERT INTO comments (content, author_id, ticket_id) VALUES
('premier commentaire', 1, 1),
('deuxiéme commentaire', 2, 1),
('troisiéme commentaire', 1, 2);