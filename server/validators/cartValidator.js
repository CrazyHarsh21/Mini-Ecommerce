const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');

const validateAddToCart = [
    body('product_id').isInt().withMessage('Product ID required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validateRequest
];

const validateUpdateCart = [
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be >= 0'),
    validateRequest
];

module.exports = { validateAddToCart, validateUpdateCart };
