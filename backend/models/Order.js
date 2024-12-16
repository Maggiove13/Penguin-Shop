const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        productName: {
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
        clientName: {
            type: String, 
            required: true
        },
        clientEmail: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'Pending',
            enum: ['Pending', 'Delivered'] 
        },
        quantityOrdered: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    },
);

module.exports = mongoose.model('Order', OrderSchema);
// En los argumentos del model:
//nombre del modelo en sigular 'Orders' y luego el squema que lo representa 