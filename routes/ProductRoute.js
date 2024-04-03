const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ProductModel = require('../models/ProductModel');

const app = express();
app.use(bodyParser.json());

router.post('/products', async (req, res) => {
  try {
    const productModel = new ProductModel({
      productname: req.body.productname,
      cost: req.body.cost,
      description: req.body.description,
      type: req.body.type,
      colour: req.body.colour,
      material: req.body.material,
      brand: req.body.brand,
      size: req.body.size,
      quantity: req.body.quantity
    });

    const savedProduct = await productModel.save();
    res.status(201).send(savedProduct); 
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ success: true, data: products, message: 'Products retrieved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product, message: 'Product retrieved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product, message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: product, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router