const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation error', errors.array(), 400);
    }
    next();
};

module.exports = { validateRequest };
