const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productname: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    colour: { type: String, required: true },
    material: { type: String, required: true },
    brand: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
