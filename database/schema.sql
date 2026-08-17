CREATE DATABASE IF NOT EXISTS bangalore_pincode_db;
USE bangalore_pincode_db;

CREATE TABLE IF NOT EXISTS pincodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pincode VARCHAR(6) NOT NULL,
    area VARCHAR(150) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100),
    post_office VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_pincode (pincode),
    INDEX idx_area (area),
    UNIQUE KEY unique_pincode_area_post_office (pincode, area, post_office)
);
