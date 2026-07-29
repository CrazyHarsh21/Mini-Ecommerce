const express = require('express');
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { validateOrder } = require('../validators/orderValidator');
const router = express.Router();

router.use(authenticateUser);
router.post('/', validateOrder, placeOrder);
router.get('/', getMyOrders);

module.exports = router;
