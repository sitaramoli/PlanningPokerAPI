-- Active: 1685340440390@@127.0.0.1@3306@planning_poker
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE sessions(
    id VARCHAR(500) PRIMARY KEY NOT NULL,
    name VARCHAR(500) NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Active', 'Closed') NOT NULL DEFAULT 'Active'
);

CREATE TABLE participants(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    role ENUM('Moderator', 'Member') NOT NULL DEFAULT 'Member',
    session_id VARCHAR(500) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    UNIQUE(user_id, session_id)
);

CREATE TABLE stories(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(500) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status ENUM('Active', 'Closed') DEFAULT 'Active',
    revealed BOOLEAN DEFAULT false
);

CREATE TABLE story_points(
    story_id INT NOT NULL,
    FOREIGN KEY (story_id) REFERENCES stories (id),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    points INT NOT NULL,
    PRIMARY KEY(story_id, user_id)
);

DELETE FROM
    participants
WHERE
    user_id = 8;

DELETE FROM
    sessions
WHERE
    status = 'Active';

SELECT
    *
FROM
    sessions;