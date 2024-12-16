const express = require('express');
const router = express.Router();
const { loginAdmin, getDashboard, renderLoginPage, renderIndexPage, logout } = require('../controllers/adminController');
const { authorization, adminMiddleware } = require('../middleware/auth');
const { getProducts, createProduct, renderAddProduct, deleteProduct, updateProduct, renderEditProduct} = require("../controllers/productController");
const { getAllOrders, updateStatus } = require('../controllers/orderController');

router.post('/login', loginAdmin);














module.exports = router;