const productService = require('../services/productService');
const orderService = require('../services/orderService');
const categoryService = require('../services/categoryService');
const { successResponse, errorResponse } = require('../utils/response');

// Product management
const createProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const id = await productService.createProduct(product);
        successResponse(res, 'Product created', { product_id: id }, 201);
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productService.updateProduct(id, req.body);
        successResponse(res, 'Product updated');
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        successResponse(res, 'Product deleted');
    } catch (err) {
        next(err);
    }
};

// Order management
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        successResponse(res, 'All orders', { orders });
    } catch (err) {
        next(err);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await orderService.updateOrderStatus(id, status);
        successResponse(res, 'Order status updated');
    } catch (err) {
        next(err);
    }
};

// Category management
const createCategory = async (req, res, next) => {
    try {
        const { category_name, description } = req.body;
        const id = await categoryService.createCategory(category_name, description);
        successResponse(res, 'Category created', { category_id: id }, 201);
    } catch (err) {
        next(err);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { category_name, description } = req.body;
        await categoryService.updateCategory(id, category_name, description);
        successResponse(res, 'Category updated');
    } catch (err) {
        next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        successResponse(res, 'Category deleted');
    } catch (err) {
        next(err);
    }
};

// Dashboard stats
const getStats = async (req, res, next) => {
    try {
        const stats = await orderService.getStats();
        successResponse(res, 'Stats fetched', stats);
    } catch (err) {
        next(err);
    }
};

module.exports = { 
    createProduct, updateProduct, deleteProduct,
    getAllOrders, updateOrderStatus,
    createCategory, updateCategory, deleteCategory,
    getStats
};
