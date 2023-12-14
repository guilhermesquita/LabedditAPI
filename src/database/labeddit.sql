-- Active: 1681243087309@@127.0.0.1@3306
CREATE TABLE user (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO user (id, name, email, password)
VALUES
	('u001', 'Fulano', 'fulano@email.com', 'fulano123'),
	('u002', 'Beltrana', 'beltrana@email.com', 'beltrana00'),
	('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99');