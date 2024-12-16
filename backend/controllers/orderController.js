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


exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.redirect('/orders'); // Redirige a la lista de órdenes después de la actualización
    } catch (error) {
        console.error("Error updating order status:", error.message);
        res.status(500).json({ error: 'Error while updating order status', message: error.message });
    }
};