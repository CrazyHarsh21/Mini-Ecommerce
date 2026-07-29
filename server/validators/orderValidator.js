const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');

const validateOrder = [
    body('payment_method').isIn(['COD', 'Card', 'UPI']).withMessage('Invalid payment method'),
    body('shipping_address').notEmpty().withMessage('Shipping address required'),
    validateRequest
];

module.exports = { validateOrder };
