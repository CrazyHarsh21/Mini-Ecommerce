const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');

const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').optional().isMobilePhone(),
    validateRequest
];

const validateLogin = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
    validateRequest
];

module.exports = { validateRegister, validateLogin };
