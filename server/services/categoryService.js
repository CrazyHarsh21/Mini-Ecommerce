const categoryModel = require('../models/categoryModel');

const getAllCategories = async () => {
    return await categoryModel.getAllCategories();
};

const createCategory = async (name, description) => {
    return await categoryModel.createCategory(name, description);
};

const updateCategory = async (id, name, description) => {
    await categoryModel.updateCategory(id, name, description);
};

const deleteCategory = async (id) => {
    await categoryModel.deleteCategory(id);
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
