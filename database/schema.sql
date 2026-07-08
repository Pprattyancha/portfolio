CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    category VARCHAR(100),
    description TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    region VARCHAR(100)
);

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT
);

CREATE TABLE hire_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    project_details TEXT,
    budget VARCHAR(50)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    rating INT,
    comment TEXT
);

CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(255),
    role VARCHAR(100),
    duration VARCHAR(100),
    description TEXT,
    tech TEXT
);