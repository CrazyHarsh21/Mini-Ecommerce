const db = require('../config/db');

const createOrder = async (order) => {
    const { user_id, total_amount, payment_method, shipping_address } = order;
    const [result] = await db.execute(
        'INSERT INTO orders (user_id, total_amount, payment_method, shipping_address) VALUES (?, ?, ?, ?)',
        [user_id, total_amount, payment_method, shipping_address]
    );
    return result.insertId;
};

const addOrderItem = async (order_id, product_id, quantity, price) => {
    await db.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [order_id, product_id, quantity, price]
    );
};

const getOrdersByUser = async (user_id) => {
    const [rows] = await db.execute(
        `SELECT o.*, 
                (SELECT JSON_ARRAYAGG(JSON_OBJECT('product_id', oi.product_id, 'product_name', p.product_name, 'quantity', oi.quantity, 'price', oi.price))
                 FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = o.order_id) AS items
         FROM orders o WHERE o.user_id = ? ORDER BY o.order_date DESC`,
        [user_id]
    );
    return rows;
};

const getAllOrders = async () => {
    const [rows] = await db.execute(
        `SELECT o.*, u.name AS user_name, u.email AS user_email 
         FROM orders o JOIN users u ON o.user_id = u.user_id 
         ORDER BY o.order_date DESC`
    );
    return rows;
};

const updateOrderStatus = async (order_id, status) => {
    await db.execute('UPDATE orders SET order_status = ? WHERE order_id = ?', [status, order_id]);
};

const getStats = async () => {
    const [users] = await db.execute('SELECT COUNT(*) AS count FROM users WHERE role = "USER"');
    const [products] = await db.execute('SELECT COUNT(*) AS count FROM products');
    const [orders] = await db.execute('SELECT COUNT(*) AS count FROM orders');
    const [revenue] = await db.execute('SELECT SUM(total_amount) AS total FROM orders WHERE order_status != "Cancelled"');
    return {
        users: users[0].count,
        products: products[0].count,
        orders: orders[0].count,
        revenue: revenue[0].total || 0
    };
};

module.exports = { createOrder, addOrderItem, getOrdersByUser, getAllOrders, updateOrderStatus, getStats };
