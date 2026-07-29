const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return errorResponse(res, 'Access denied. No token provided.', [], 401);
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return errorResponse(res, 'Invalid or expired token.', [], 401);
    }
};

module.exports = { authenticateUser };
