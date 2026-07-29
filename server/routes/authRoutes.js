const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', authenticateUser, getProfile);

module.exports = router;
