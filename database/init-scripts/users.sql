-- Create roles and users
-- CREATE ROLE login_user WITH LOGIN PASSWORD 'Open@123' CONNECTION LIMIT 10;
CREATE ROLE worker WITH
    LOGIN
    PASSWORD 'iamworker'
    NOSUPERUSER
    INHERIT
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE todos TO worker;

-- Grant privileges to roles/users
-- GRANT SELECT ON SCHEMA authentication TO login_user;
-- GRANT INSERT ON TABLE authentication.authentication TO register_user;
-- GRANT ALL PRIVILEGES ON TABLE authentication.authentication_id_seq TO register_user;
-- GRANT INSERT, SELECT ON SCHEMA portfolios TO portfolio_user;
-- GRANT ALL PRIVILEGES ON TABLE portfolios.portfolios_id_seq TO portfolio_user;

-- Insert initial data
-- INSERT INTO authentication.authentication (full_name, email, phone_number, password) VALUES (
--     'test',
--     'test@gmail.com',
--     9999999999,
--     crypt('test', gen_salt('bf'))
-- );

CREATE TABLE authentication (
    email VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
    phone_number NUMERIC(10) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    creation_info TIMESTAMP DEFAULT Now()
);