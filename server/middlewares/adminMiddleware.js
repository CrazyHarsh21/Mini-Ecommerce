const { errorResponse } = require('../utils/response');

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return errorResponse(res, 'Admin access required.', [], 403);
    }
    next();
};

module.exports = { authorizeAdmin };
