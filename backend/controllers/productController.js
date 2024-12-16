const Product = require('../models/Product');
const dotenv = require("dotenv");
dotenv.config();

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ error: 'No products found' });
        }
        res.render('productsList', { products: products });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ error: 'Error while fetching products', message: error.message });
    }
};




