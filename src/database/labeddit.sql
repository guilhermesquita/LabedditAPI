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
    comments INT NOT NULL,
    like INT NOT NULL,
    dislike INT NOT NULL,
    rl_user TEXT NOT NULL REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE, 
    created_at TEXT DEFAULT (DATETIME()),
    edited_at TEXT,
    FOREIGN KEY (rl_user) REFERENCES user(id)
);

INSERT INTO post(id, content, comments, like, dislike, rl_user)
VALUES
	('p001', 'loremipsum', 1, 2, 0, 'u001'),
	('p002', 'lorem ipsum', 0, 0, 0, 'u002'),
    ('p003', 'loremipsum000111', 0, 0, 0, 'u002');


CREATE TABLE comment(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    content TEXT NOT NULL,
    comments INT NOT NULL,
    like INT NOT NULL,
    dislike INT NOT NULL,
    rl_user TEXT NOT NULL REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    rl_post TEXT REFERENCES post (id) ON DELETE CASCADE ON UPDATE CASCADE, 
    rl_comment TEXT REFERENCES comment (id) ON DELETE CASCADE ON UPDATE CASCADE, 
    created_at TEXT DEFAULT (DATETIME()),
    edited_at TEXT,
    FOREIGN KEY (rl_user) REFERENCES user(id),
    FOREIGN KEY (rl_post) REFERENCES post(id),
    FOREIGN KEY (rl_comment) REFERENCES comment(id)
);


INSERT INTO comment(id, content, comments, like, dislike, rl_user, rl_post)
VALUES
	('c001', 'teste de comentário', 1, 0, 0, 'u002', 'p001');

INSERT INTO comment(id, content, comments, like, dislike, rl_user, rl_comment)
VALUES
	('c002', 'teste de comentário de comentário', 0, 0, 0, 'u003', 'c001');

SELECT COUNT(*)
FROM comment
WHERE rl_post == 'p001';

CREATE TABLE rl_like_dislike_post(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    rl_user TEXT NOT NULL REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    rl_post TEXT NOT NULL REFERENCES post (id) ON DELETE CASCADE ON UPDATE CASCADE,
    like BOOLEAN NOT NULL,
    ----- RELATIONS
    FOREIGN KEY (rl_user) REFERENCES user(id),
    FOREIGN KEY (rl_post) REFERENCES post(id)
);

INSERT INTO rl_like_dislike_post(id, rl_user, rl_post, like)
VALUES
	('ld001', 'u002', 'p001', true),
    ('ld002', 'u003', 'p001', false);

CREATE TABLE rl_like_dislike_comment(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    rl_user TEXT NOT NULL REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    rl_comment TEXT NOT NULL REFERENCES comment (id) ON DELETE CASCADE ON UPDATE CASCADE,
    like BOOLEAN NOT NULL,
    ----- RELATIONS
    FOREIGN KEY (rl_user) REFERENCES user(id),
    FOREIGN KEY (rl_comment) REFERENCES comment(id)
);

INSERT INTO rl_like_dislike_comment(id, rl_user, rl_comment, like)
VALUES
	('ldc001', 'u001', 'c001', true);


------------- DROPS
DROP TABLE post;
DROP TABLE user;
DROP TABLE comment;
DROP TABLE rl_like_dislike_post;
DROP TABLE rl_like_dislike_comment;