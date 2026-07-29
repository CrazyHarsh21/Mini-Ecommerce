const orderService = require('../services/orderService');
const { successResponse, errorResponse } = require('../utils/response');

const placeOrder = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const result = await orderService.placeOrder(userId, req.body);
        successResponse(res, 'Order placed successfully', { order: result }, 201);
    } catch (err) {
        next(err);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const orders = await orderService.getMyOrders(userId);
        successResponse(res, 'Orders fetched', { orders });
    } catch (err) {
        next(err);
    }
};

module.exports = { placeOrder, getMyOrders };
