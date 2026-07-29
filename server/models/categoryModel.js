const db = require('../config/db');

const getAllCategories = async () => {
    const [rows] = await db.execute('SELECT * FROM categories');
    return rows;
};

const createCategory = async (category_name, description) => {
    const [result] = await db.execute('INSERT INTO categories (category_name, description) VALUES (?, ?)', [category_name, description]);
    return result.insertId;
};

const updateCategory = async (id, category_name, description) => {
    await db.execute('UPDATE categories SET category_name = ?, description = ? WHERE category_id = ?', [category_name, description, id]);
};

const deleteCategory = async (id) => {
    await db.execute('DELETE FROM categories WHERE category_id = ?', [id]);
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
