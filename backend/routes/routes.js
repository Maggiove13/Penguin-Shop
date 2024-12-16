const express = require('express');
const router = express.Router();
const { loginAdmin, getDashboard, renderLoginPage, renderIndexPage, logout } = require('../controllers/adminController');
const { authorization, adminMiddleware } = require('../middleware/auth');
const { getProducts, createProduct, renderAddProduct, deleteProduct, updateProduct, renderEditProduct} = require("../controllers/productController");
const { getAllOrders, updateStatus } = require('../controllers/orderController');

router.post('/login', loginAdmin);
router.post('/logout', logout);
router.post('/products/create', authorization, adminMiddleware, createProduct);
router.post('/products/edit/:id', authorization, adminMiddleware, updateProduct);
router.post('/products/:id', authorization, adminMiddleware, deleteProduct);
router.post('/orders/updateStatus/:id', authorization, adminMiddleware, updateStatus)

//Views
router.get('/', renderIndexPage);
router.get('/login', renderLoginPage);








module.exports = router;