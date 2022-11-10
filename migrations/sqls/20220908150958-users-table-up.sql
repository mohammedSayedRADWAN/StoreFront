CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    password_digest VARCHAR NOT NULL,
    lastname VARCHAR(100) NOT NULL
);

