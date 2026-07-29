const productService = require('../services/productService');
const { successResponse, errorResponse } = require('../utils/response');

const getProducts = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        const products = await productService.getProducts({ category_id: category, search });
        successResponse(res, 'Products fetched', { products });
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            const err = new Error('Product not found');
            err.status = 404;
            throw err;
        }
        successResponse(res, 'Product details', { product });
    } catch (err) {
        next(err);
    }
};

const searchProducts = async (req, res, next) => {
    try {
        const { q } = req.query;
        const products = await productService.searchProducts(q);
        successResponse(res, 'Search results', { products });
    } catch (err) {
        next(err);
    }
};

module.exports = { getProducts, getProductById, searchProducts };
