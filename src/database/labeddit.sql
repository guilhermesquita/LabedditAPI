-- Active: 1681243087309@@127.0.0.1@3306
CREATE TABLE user(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO user(id, name, email, password)
VALUES
	('u001', 'Fulano', 'fulano@email.com', 'fulano123'),
	('u002', 'Beltrana', 'beltrana@email.com', 'beltrana00'),
	('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99');

CREATE TABLE post(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    content TEXT NOT NULL,
    like INT NOT NULL,
    dislike INT NOT NULL,
    rl_user TEXT NOT NULL REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE, 
    created_at TEXT DEFAULT (DATETIME()),
    edited_at TEXT,
    FOREIGN KEY (rl_user) REFERENCES user(id)
);

INSERT INTO post(id, content, like, dislike, rl_user)
VALUES
	('p001', 'loremipsum', 2, 0, 'u001'),
	('p002', 'lorem ipsum', 0, 0, 'u002'),
    ('p003', 'loremipsum000111', 0, 0, 'u002');

CREATE TABLE rl_like_dislike(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    rl_user TEXT NOT NULL REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    rl_post TEXT NOT NULL REFERENCES post (id) ON DELETE CASCADE ON UPDATE CASCADE,
    like BOOLEAN NOT NULL,
    FOREIGN KEY (rl_user) REFERENCES user(id),
    FOREIGN KEY (rl_post) REFERENCES post(id)
);

INSERT INTO rl_like_dislike(id, rl_user, rl_post, like)
VALUES
	('ld001', 'u002', 'p001', true),
    ('ld002', 'u003', 'p001', false);



------------- DROPS
DROP TABLE post;
DROP TABLE user;
DROP TABLE rl_like_dislike;