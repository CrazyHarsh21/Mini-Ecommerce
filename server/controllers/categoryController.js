const categoryService = require('../services/categoryService');
const { successResponse } = require('../utils/response');

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        successResponse(res, 'Categories fetched', { categories });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllCategories };
