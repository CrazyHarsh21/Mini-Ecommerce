const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

const getCart = async (userId) => {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
        const err = new Error('Cart not found');
        err.status = 404;
        throw err;
    }
    const items = await cartModel.getCartItems(cart.cart_id);
    let total = 0;
    items.forEach(item => {
        total += item.price * item.quantity;
    });
    return { cart_id: cart.cart_id, items, total };
};

const addItem = async (userId, productId, quantity) => {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
        const err = new Error('Cart not found');
        err.status = 404;
        throw err;
    }
    const product = await productModel.getProductById(productId);
    if (!product) {
        const err = new Error('Product not found');
        err.status = 404;
        throw err;
    }
    if (product.stock < quantity) {
        const err = new Error('Insufficient stock');
        err.status = 400;
        throw err;
    }
    await cartModel.addItem(cart.cart_id, productId, quantity);
    return { message: 'Item added to cart' };
};

const updateQuantity = async (userId, cartItemId, quantity) => {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');
    const items = await cartModel.getCartItems(cart.cart_id);
    const item = items.find(i => i.cart_item_id === cartItemId);
    if (!item) {
        const err = new Error('Item not in cart');
        err.status = 404;
        throw err;
    }
    if (quantity <= 0) {
        await cartModel.removeItem(cartItemId);
        return { message: 'Item removed' };
    }
    await cartModel.updateQuantity(cartItemId, quantity);
    return { message: 'Quantity updated' };
};

const removeItem = async (userId, cartItemId) => {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');
    const items = await cartModel.getCartItems(cart.cart_id);
    const item = items.find(i => i.cart_item_id === cartItemId);
    if (!item) {
        const err = new Error('Item not in cart');
        err.status = 404;
        throw err;
    }
    await cartModel.removeItem(cartItemId);
    return { message: 'Item removed' };
};

const clearCart = async (userId) => {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');
    await cartModel.clearCart(cart.cart_id);
    return { message: 'Cart cleared' };
};

module.exports = { getCart, addItem, updateQuantity, removeItem, clearCart };
