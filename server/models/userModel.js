const db = require('../config/db');

const createUser = async (userData) => {
    const { name, email, password, phone, address, role = 'USER' } = userData;
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, password, phone, address, role]
    );
    return result.insertId;
};

const findUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const findUserById = async (id) => {
    const [rows] = await db.execute('SELECT user_id, name, email, phone, address, role, created_at FROM users WHERE user_id = ?', [id]);
    return rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById };
