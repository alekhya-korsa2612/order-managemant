const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');

router.post('/orders', async (req, res) => {
    try {
        const {  orderDate, expectedDate, orderStatus, orderproduct} = req.body;
        const newOrder = new Order({
            orderDate,
            expectedDate,
            orderStatus,
            orderproduct,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/orders/:id', async (req, res) => {
    try {
        const { orderDate, expectedDate, orderStatus, orderproduct } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            orderDate,
            expectedDate,
            orderStatus,
            orderproduct
        }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;



