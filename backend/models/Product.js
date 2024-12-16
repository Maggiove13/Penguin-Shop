const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productDescription: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true,
        }
    }
);

module.exports = mongoose.model('Product', productSchema);