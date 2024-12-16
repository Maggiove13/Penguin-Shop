const Order = require('../models/Order');


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders){
            return res.status(404).json({ message: "No orders found" });
        }
        res.render('ordersList', { orders });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ error: 'Error while fetching orders', message: error.message });
    }
}