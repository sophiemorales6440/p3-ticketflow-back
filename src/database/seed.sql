SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE attachments;
TRUNCATE TABLE tickets;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
TRUNCATE TABLE items;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (firstname, lastname, email, password, role) VALUES
('Alice', 'Martin', 'alice@example.com', 'hashedpass1', 'client'),
('Bob', 'Durand', 'bob@example.com', 'hashedpass2', 'technician'),
('Admin', 'Root', 'admin@example.com', 'hashedpass3', 'admin');

INSERT INTO categories (name) VALUES
('Bug'),
('Demande'),
('Incident');

INSERT INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES
('Problème de connexion', 'Impossible de se connecter au compte.', 'open', 'high', 1, 2, 1),
('Erreur 500', 'Erreur serveur lors de la soumission du formulaire.', 'in_progress', 'critical', 1, 2, 1),
('Demande de mise à jour', 'Mettre à jour les informations du profil.', 'open', 'medium', 1, NULL, 2);


INSERT INTO attachments (url, filename, ticket_id) VALUES
('https://cdn.ticketflow.dev/uploads/screenshot-login-error.png', 'screenshot-login-error.png', 1),
('https://cdn.ticketflow.dev/uploads/error-log-2024-01-12.txt', 'error-log-2024-01-12.txt', 1),
('https://cdn.ticketflow.dev/uploads/capture-500.png', 'capture-500.png', 2),
('https://cdn.ticketflow.dev/uploads/server-stacktrace.txt', 'server-stacktrace.txt', 2),
('https://cdn.ticketflow.dev/uploads/request-update.pdf', 'request-update.pdf', 3),
('https://cdn.ticketflow.dev/uploads/profile-form.png', 'profile-form.png', 3);

<<<<<<< HEAD
=======
-- data fictive pour dev à mettre dans les tables
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
('Réseau'),SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE attachments;
TRUNCATE TABLE tickets;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
TRUNCATE TABLE items;

SET FOREIGN_KEY_CHECKS = 1;

------------------------------------------------------------
-- 1) USERS (tes données + données dev)
------------------------------------------------------------

INSERT INTO users (firstname, lastname, email, password, role) VALUES
-- Tes données
('Alice', 'Martin', 'alice@example.com', 'hashedpass1', 'client'),
('Bob', 'Durand', 'bob@example.com', 'hashedpass2', 'technician'),
('Admin', 'Root', 'admin@example.com', 'hashedpass3', 'admin'),

-- Données dev
('Admin', 'Test', 'admin@test.com', 'password123', 'admin'),
('Tech', 'Dupont', 'tech@test.com', 'password123', 'technician'),
('Client', 'Martin', 'client@test.com', 'password123', 'client');

------------------------------------------------------------
-- 2) CATEGORIES (tes données + données dev)
------------------------------------------------------------

INSERT INTO categories (name) VALUES
-- Tes données
('Bug'),
('Demande'),
('Incident'),

-- Données dev
('Matériel'),
('Logiciel'),
('Réseau'),
('Autre');

------------------------------------------------------------
-- 3) TICKETS (tes données + données dev)
------------------------------------------------------------

INSERT INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES
-- Tes données
('Problème de connexion', 'Impossible de se connecter au compte.', 'open', 'high', 1, 2, 1),
('Erreur 500', 'Erreur serveur lors de la soumission du formulaire.', 'in_progress', 'critical', 1, 2, 1),
('Demande de mise à jour', 'Mettre à jour les informations du profil.', 'open', 'medium', 1, NULL, 2),

-- Données dev
('Mon écran ne fonctionne plus', 'Ecran noir au démarrage', 'open', 'high', 6, 5, 4),
('Problème de connexion VPN', 'Impossible de se connecter au VPN', 'open', 'medium', 6, NULL, 6),
('Logiciel qui plante', 'Excel crash au démarrage', 'in_progress', 'low', 6, 5, 5);

------------------------------------------------------------
-- 4) ATTACHMENTS (tes données uniquement)
------------------------------------------------------------

INSERT INTO attachments (url, filename, ticket_id) VALUES
('https://cdn.ticketflow.dev/uploads/screenshot-login-error.png', 'screenshot-login-error.png', 1),
('https://cdn.ticketflow.dev/uploads/error-log-2024-01-12.txt', 'error-log-2024-01-12.txt', 1),
('https://cdn.ticketflow.dev/uploads/capture-500.png', 'capture-500.png', 2),
('https://cdn.ticketflow.dev/uploads/server-stacktrace.txt', 'server-stacktrace.txt', 2),
('https://cdn.ticketflow.dev/uploads/request-update.pdf', 'request-update.pdf', 3),
('https://cdn.ticketflow.dev/uploads/profile-form.png', 'profile-form.png', 3);
('Autre');

-- Tickets fictifs
INSERT IGNORE INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES
('Mon écran ne fonctionne plus', 'Ecran noir au démarrage', 'open', 'high', 3, 2, 1),
('Problème de connexion VPN', 'Impossible de se connecter au VPN', 'open', 'medium', 3, NULL, 3),
('Logiciel qui plante', 'Excel crash au démarrage', 'in_progress', 'low', 3, 2, 2);
>>>>>>> 0007b56447e93b521d363deb6d3289ef384d9d25
