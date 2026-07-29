-- ============================================
-- DATABASE: ecommerce_db
-- ============================================
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('USER','ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: categories
-- ============================================
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- ============================================
-- TABLE: products
-- ============================================
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    image_url VARCHAR(255),
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- ============================================
-- TABLE: cart
-- ============================================
CREATE TABLE cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================
-- TABLE: cart_items
-- ============================================
CREATE TABLE cart_items (
    cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY unique_cart_product (cart_id, product_id)
);

-- ============================================
-- TABLE: orders
-- ============================================
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    payment_method ENUM('COD','Card','UPI') DEFAULT 'COD',
    payment_status ENUM('Pending','Paid','Failed') DEFAULT 'Pending',
    order_status ENUM('Pending','Processing','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
    shipping_address TEXT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================
-- TABLE: order_items
-- ============================================
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_name ON products(product_name);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);

-- ============================================
-- SAMPLE DATA
-- ============================================
-- Admin (password: admin123)
INSERT INTO users (name, email, password, phone, address, role) VALUES
('Admin', 'admin@shop.com', '$2b$10$jJ9ZJbZmZx5GxLJkR7u9rOeZJkLjK2M2E9yH5z6Vq2X8WnL1Yt6S', '1234567890', '123 Admin St', 'ADMIN');

-- Users (password: user123)
INSERT INTO users (name, email, password, phone, address, role) VALUES
('John Doe', 'john@example.com', '$2b$10$jJ9ZJbZmZx5GxLJkR7u9rOeZJkLjK2M2E9yH5z6Vq2X8WnL1Yt6S', '9876543210', '456 User Ave', 'USER'),
('Jane Smith', 'jane@example.com', '$2b$10$jJ9ZJbZmZx5GxLJkR7u9rOeZJkLjK2M2E9yH5z6Vq2X8WnL1Yt6S', '5551234567', '789 Elm St', 'USER');

-- Categories
INSERT INTO categories (category_name, description) VALUES
('Electronics', 'Gadgets and devices'),
('Clothing', 'Men and Women fashion'),
('Books', 'Fiction, non‑fiction and more'),
('Home & Kitchen', 'Furniture, appliances and decor'),
('Sports', 'Outdoor and indoor sports gear');

-- Products (20 sample)
INSERT INTO products (category_id, product_name, description, price, stock, image_url, status) VALUES
(1, 'Smartphone X', 'Latest 5G smartphone with 128GB storage', 699.99, 50, 'https://via.placeholder.com/150', 'active'),
(1, 'Wireless Headphones', 'Noise‑cancelling over‑ear headphones', 149.99, 30, 'https://via.placeholder.com/150', 'active'),
(1, 'Laptop Pro', '15‑inch laptop with 16GB RAM and 512GB SSD', 999.99, 20, 'https://via.placeholder.com/150', 'active'),
(1, 'Smartwatch', 'Fitness tracker with heart rate monitor', 199.99, 40, 'https://via.placeholder.com/150', 'active'),
(1, 'Tablet', '10‑inch tablet with stylus support', 399.99, 15, 'https://via.placeholder.com/150', 'active'),
(2, 'T‑Shirt (Pack of 2)', 'Cotton t‑shirts, assorted colors', 29.99, 100, 'https://via.placeholder.com/150', 'active'),
(2, 'Jeans', 'Slim fit denim jeans', 49.99, 60, 'https://via.placeholder.com/150', 'active'),
(2, 'Jacket', 'Winter jacket, waterproof', 89.99, 25, 'https://via.placeholder.com/150', 'active'),
(2, 'Sneakers', 'Casual sneakers, size 10', 69.99, 35, 'https://via.placeholder.com/150', 'active'),
(2, 'Sunglasses', 'Polarized UV protection sunglasses', 39.99, 50, 'https://via.placeholder.com/150', 'active'),
(3, 'The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 12.99, 80, 'https://via.placeholder.com/150', 'active'),
(3, 'Sapiens', 'A brief history of humankind', 18.99, 45, 'https://via.placeholder.com/150', 'active'),
(3, 'Programming with Python', 'Learn Python from scratch', 34.99, 30, 'https://via.placeholder.com/150', 'active'),
(3, 'Cookbook', '500 recipes for everyday cooking', 24.99, 20, 'https://via.placeholder.com/150', 'active'),
(3, 'Science Fiction Anthology', 'Stories from the best sci‑fi authors', 16.99, 40, 'https://via.placeholder.com/150', 'active'),
(4, 'Coffee Maker', 'Drip coffee machine with timer', 79.99, 12, 'https://via.placeholder.com/150', 'active'),
(4, 'Blender', 'High‑speed blender for smoothies', 59.99, 18, 'https://via.placeholder.com/150', 'active'),
(4, 'Desk Lamp', 'LED desk lamp with adjustable arm', 29.99, 40, 'https://via.placeholder.com/150', 'active'),
(5, 'Yoga Mat', 'Non‑slip exercise mat', 25.99, 60, 'https://via.placeholder.com/150', 'active'),
(5, 'Dumbbell Set', 'Adjustable dumbbells 5‑50 lbs', 149.99, 10, 'https://via.placeholder.com/150', 'active');

-- Create carts for existing users (optional)
INSERT INTO cart (user_id) VALUES (2), (3);
