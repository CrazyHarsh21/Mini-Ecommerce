const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');

const validateProduct = [
    body('product_name').notEmpty().withMessage('Product name required'),
    body('category_id').isInt().withMessage('Valid category ID required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be >= 0'),
    body('status').optional().isIn(['active', 'inactive']),
    validateRequest
];

module.exports = { validateProduct };
