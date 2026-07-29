const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { authorizeAdmin } = require('../middlewares/adminMiddleware');
const { 
    createProduct, updateProduct, deleteProduct,
    getAllOrders, updateOrderStatus,
    createCategory, updateCategory, deleteCategory,
    getStats
} = require('../controllers/adminController');
const { validateProduct } = require('../validators/productValidator');
const router = express.Router();

router.use(authenticateUser, authorizeAdmin);

// Products
router.post('/products', validateProduct, createProduct);
router.put('/products/:id', validateProduct, updateProduct);
router.delete('/products/:id', deleteProduct);

// Orders
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Categories
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Dashboard stats
router.get('/stats', getStats);

module.exports = router;
