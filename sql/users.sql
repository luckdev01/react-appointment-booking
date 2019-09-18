CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    forename VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    image VARCHAR(255),
    krankenkasse_name VARCHAR(255),
    krankenkasse_coverage VARCHAR(255),
    surgery TEXT,
    hospital TEXT,
    medication TEXT,
    diseases TEXT,
    recommendations TEXT,
    important TEXT,
    history TEXT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
