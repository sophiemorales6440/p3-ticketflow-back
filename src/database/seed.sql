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

INSERT INTO users (firstname, lastname, role, email, password)
VALUES
('Sophie', 'Doe', 'admin', 'sophie@example.com', '$2a$08$lSRA0Wc.5QcIzgvLrUhcneV0SPBLSFLkVesBQtAzF3vME8sscgOyW'),
('Marine', 'Dupont', 'admin', 'marine@example.com', '$2a$08$m73cbtW68CXw8EGSuvswgeF.uLdtrrtdKrFky9bWZNPrXT6bDkIhG'),
('Kuider', 'Cook', 'technician', 'kuider@example.com', '$2a$08$BHeiWN3hWXQRonI30NECOOkqSkf3gMohU7UkZlHcS2W1I5dDePOo.'),
('Karim', 'Doer', 'technician', 'karim@example.com', '$2a$08$j2sYeM4lCOTe7c8b7jik4eblmt.mfF/1lXsC2UCPAOW0PNLvIgp12'),
('Victor', 'Battlefield', 'client', 'victor@example.com', '$2a$08$EGi0CkkPbrWZWfpWMzwhEe3oHAJHpK5wvuVW1VMXY2rvU.vDTJz.u'),
('Kevan', 'Golem', 'client', 'kevan@example.com', '$2a$08$EGi0CkkPbrWZWfpWMzwhEe3oHAJHpK5wvuVW1VMXY2rvU.vDTJz.u'),
('Manu', 'Tecktonik', 'client', 'loulou@example.com', '$2a$08$EGi0CkkPbrWZWfpWMzwhEe3oHAJHpK5wvuVW1VMXY2rvU.vDTJz.u'),
('Prescillia', 'Strassfleur', 'client', 'prescillia@example.com', '$2a$08$EGi0CkkPbrWZWfpWMzwhEe3oHAJHpK5wvuVW1VMXY2rvU.vDTJz.u'),
('John', 'Helldivers', 'client', 'jhd@example.com', '$2a$08$EGi0CkkPbrWZWfpWMzwhEe3oHAJHpK5wvuVW1VMXY2rvU.vDTJz.u'),
('Yavuz', 'Kutukutuk', 'client', 'yavuz@example.com', '$2a$08$EGi0CkkPbrWZWfpWMzwhEe3oHAJHpK5wvuVW1VMXY2rvU.vDTJz.u'),
('Yavinci', 'Lou', 'client', 'yavinci@example.com', '$2a$08$EGi0CkkPbrWZWfpWMzwhEe3oHAJHpK5wvuVW1VMXY2rvU.vDTJz.u');

INSERT IGNORE INTO categories (name) VALUES
('Matériel'),
('Logiciel'),
('Réseau'),
('Autre');

INSERT IGNORE INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES
('Mon écran ne fonctionne plus', 'Ecran noir au démarrage', 'open', 'high', 5, 3, 1),
('Problème de connexion VPN', 'Impossible de se connecter au VPN', 'open', 'medium', 5, NULL, 3),
('Logiciel qui plante', 'Excel crash au démarrage', 'in_progress', 'low', 5, 3, 2);

INSERT IGNORE INTO attachments (url, filename, ticket_id) VALUES
('https://cdn.example.com/screenshot1.png', 'screenshot1.png', 1),
('https://cdn.example.com/logs.txt', 'logs.txt', 1),
('https://cdn.example.com/capture.png', 'capture.png', 2);

INSERT INTO comments (content, author_id, ticket_id) VALUES
('premier commentaire', 1, 1),
('deuxiéme commentaire', 2, 1),
('troisiéme commentaire', 1, 2);