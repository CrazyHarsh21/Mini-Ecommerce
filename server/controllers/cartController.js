const cartService = require('../services/cartService');
const { successResponse, errorResponse } = require('../utils/response');

const getCart = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const cart = await cartService.getCart(userId);
        successResponse(res, 'Cart fetched', { cart });
    } catch (err) {
        next(err);
    }
};

const addItem = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { product_id, quantity } = req.body;
        await cartService.addItem(userId, product_id, quantity);
        successResponse(res, 'Item added to cart');
    } catch (err) {
        next(err);
    }
};

const updateItem = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { id } = req.params;
        const { quantity } = req.body;
        await cartService.updateQuantity(userId, parseInt(id), quantity);
        successResponse(res, 'Cart updated');
    } catch (err) {
        next(err);
    }
};

const removeItem = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { id } = req.params;
        await cartService.removeItem(userId, parseInt(id));
        successResponse(res, 'Item removed');
    } catch (err) {
        next(err);
    }
};

const clearCart = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        await cartService.clearCart(userId);
        successResponse(res, 'Cart cleared');
    } catch (err) {
        next(err);
    }
};

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };
