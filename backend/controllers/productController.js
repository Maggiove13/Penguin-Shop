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


exports.createProduct = async (req, res) => {
    const { productName, productDescription, productImage, stock, price } = req.body;

    try {
        // Validación de campos requeridos
        if (!productName || !productDescription || !productImage || !stock || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Conversión de tipos de datos
        const stockInt = parseInt(stock);
        const priceInt = parseInt(price);

        // Validación de tipos de datos
        if (isNaN(stockInt) || isNaN(priceInt)) {
            return res.status(400).json({ message: "Stock and price must be numbers" });
        }

        // Creación del nuevo producto
        const newProduct = await Product.create({
            productName: productName,
            productDescription: productDescription,
            productImage: productImage,
            stock: stockInt,
            price: priceInt
        });

        // Redirección o respuesta de éxito
        res.redirect('/products');
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ error: 'Error creating product', message: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.redirect('/products');
    } catch (error) {
        console.error("Error while deleting the product:", error.message);
        res.status(500).json({ error: 'Error while deleting the product', message: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, productDescription, productImage, stock, price } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, productDescription, productImage, stock, price },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).send("Product not found.");
        }
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating product.");
    }
};


exports.renderEditProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Product not found.");
        }
        res.render("editProduct", { product });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching product.");
    }
};