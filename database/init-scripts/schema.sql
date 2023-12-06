SET TIMEZONE = 'Asia/Kolkata';

-- Create the necessary schema and extensions
CREATE EXTENSION pgcrypto;

-- Define the 'authentication' schema and table
CREATE SCHEMA IF NOT EXISTS authentication;


CREATE TABLE todos (
    id VARCHAR(225) UNIQUE PRIMARY KEY,
    email VARCHAR(255),
    title VARCHAR(30),
    start VARCHAR(11),
    completed BOOLEAN,
    progress INTEGER NOT NULL
);

INSERT INTO todos VALUES (
    'test-id-string-1',
    'test@gmail.com',
    'Go to Gym',
    '2023-12-01',
    FALSE,
    70
);

INSERT INTO todos VALUES (
    'test-id-string-2',
    'test@gmail.com',
    'Go to Gym Twice',
    '2023-12-02',
    TRUE,
    30
);