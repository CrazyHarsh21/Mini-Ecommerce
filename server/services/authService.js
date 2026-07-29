const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const { createCart } = require('../models/cartModel');

const registerUser = async (userData) => {
    const { email, password } = userData;
    const existing = await userModel.findUserByEmail(email);
    if (existing) {
        const err = new Error('Email already registered');
        err.status = 409;
        throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser({ ...userData, password: hashedPassword });
    await createCart(userId);
    return { user_id: userId };
};

const loginUser = async (email, password) => {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    const token = generateToken({ user_id: user.user_id, email: user.email, role: user.role });
    return { token, user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role } };
};

const getProfile = async (userId) => {
    return await userModel.findUserById(userId);
};

module.exports = { registerUser, loginUser, getProfile };
