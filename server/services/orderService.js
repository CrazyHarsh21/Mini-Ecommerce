const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

const placeOrder = async (userId, orderData) => {
    const { payment_method, shipping_address } = orderData;
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
        const err = new Error('Cart not found');
        err.status = 404;
        throw err;
    }
    const cartItems = await cartModel.getCartItems(cart.cart_id);
    if (cartItems.length === 0) {
        const err = new Error('Cart is empty');
        err.status = 400;
        throw err;
    }
    let total = 0;
    for (const item of cartItems) {
        const product = await productModel.getProductById(item.product_id);
        if (product.stock < item.quantity) {
            const err = new Error(`Insufficient stock for ${product.product_name}`);
            err.status = 400;
            throw err;
        }
        total += product.price * item.quantity;
    }
    // Create order
    const orderId = await orderModel.createOrder({
        user_id: userId,
        total_amount: total,
        payment_method,
        shipping_address
    });
    // Add order items and update stock
    for (const item of cartItems) {
        const product = await productModel.getProductById(item.product_id);
        await orderModel.addOrderItem(orderId, item.product_id, item.quantity, product.price);
        // Reduce stock
        await productModel.updateProduct(item.product_id, { ...product, stock: product.stock - item.quantity });
    }
    // Clear cart
    await cartModel.clearCart(cart.cart_id);
    return { order_id: orderId };
};

const getMyOrders = async (userId) => {
    return await orderModel.getOrdersByUser(userId);
};

const getAllOrders = async () => {
    return await orderModel.getAllOrders();
};

const updateOrderStatus = async (orderId, status) => {
    await orderModel.updateOrderStatus(orderId, status);
    return { message: 'Order status updated' };
};

const getStats = async () => {
    return await orderModel.getStats();
};

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, getStats };
