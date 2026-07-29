const db = require('../config/db');

const createCart = async (userId) => {
    const [result] = await db.execute('INSERT INTO cart (user_id) VALUES (?)', [userId]);
    return result.insertId;
};

const getCartByUserId = async (userId) => {
    const [rows] = await db.execute('SELECT cart_id FROM cart WHERE user_id = ?', [userId]);
    return rows[0];
};

const addItem = async (cartId, productId, quantity) => {
    const [result] = await db.execute(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
        [cartId, productId, quantity, quantity]
    );
    return result;
};

const updateQuantity = async (cartItemId, quantity) => {
    await db.execute('UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?', [quantity, cartItemId]);
};

const removeItem = async (cartItemId) => {
    await db.execute('DELETE FROM cart_items WHERE cart_item_id = ?', [cartItemId]);
};

const clearCart = async (cartId) => {
    await db.execute('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
};

const getCartItems = async (cartId) => {
    const [rows] = await db.execute(
        `SELECT ci.cart_item_id, ci.product_id, ci.quantity, p.product_name, p.price, p.image_url 
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.product_id
         WHERE ci.cart_id = ?`,
        [cartId]
    );
    return rows;
};

module.exports = { createCart, getCartByUserId, addItem, updateQuantity, removeItem, clearCart, getCartItems };
