const db = require('../config/db');

const getProducts = async (filters = {}) => {
    let sql = 'SELECT * FROM products WHERE status = "active"';
    const params = [];
    if (filters.category_id) {
        sql += ' AND category_id = ?';
        params.push(filters.category_id);
    }
    if (filters.search) {
        sql += ' AND product_name LIKE ?';
        params.push(`%${filters.search}%`);
    }
    const [rows] = await db.execute(sql, params);
    return rows;
};

const getProductById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM products WHERE product_id = ?', [id]);
    return rows[0];
};

const createProduct = async (product) => {
    const { category_id, product_name, description, price, stock, image_url, status } = product;
    const [result] = await db.execute(
        'INSERT INTO products (category_id, product_name, description, price, stock, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [category_id, product_name, description, price, stock, image_url, status]
    );
    return result.insertId;
};

const updateProduct = async (id, product) => {
    const { category_id, product_name, description, price, stock, image_url, status } = product;
    await db.execute(
        'UPDATE products SET category_id = ?, product_name = ?, description = ?, price = ?, stock = ?, image_url = ?, status = ? WHERE product_id = ?',
        [category_id, product_name, description, price, stock, image_url, status, id]
    );
};

const deleteProduct = async (id) => {
    await db.execute('DELETE FROM products WHERE product_id = ?', [id]);
};

const getAdminProducts = async () => {
    const [rows] = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getAdminProducts };
