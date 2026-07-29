const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');

const register = async (req, res, next) => {
    try {
        const result = await authService.registerUser(req.body);
        successResponse(res, 'User registered successfully', result, 201);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await authService.loginUser(email, password);
        successResponse(res, 'Login successful', data);
    } catch (err) {
        next(err);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await authService.getProfile(req.user.user_id);
        successResponse(res, 'Profile fetched', { user });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getProfile };
