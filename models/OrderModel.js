const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');
const orderSchema = new Schema({
    orderId: { type: String, default: uuid.v4 },
    orderDate: { type: Date, required: true }, 
    expectedDate: { type: Date, required: true }, 
    orderStatus: { type: String, required: true },
    orderproduct:{ type: String, required: true}
});

const Order = mongoose.model('Orders', orderSchema);
module.exports = Order;
















