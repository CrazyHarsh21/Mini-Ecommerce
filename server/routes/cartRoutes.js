const express = require('express');
const { getCart, addItem, updateItem, removeItem, clearCart } = require('../controllers/cartController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { validateAddToCart, validateUpdateCart } = require('../validators/cartValidator');
const router = express.Router();

router.use(authenticateUser);
router.get('/', getCart);
router.post('/', validateAddToCart, addItem);
router.put('/:id', validateUpdateCart, updateItem);
router.delete('/:id', removeItem);
router.delete('/', clearCart);

module.exports = router;
