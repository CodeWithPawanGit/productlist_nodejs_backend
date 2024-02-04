const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path as needed

// GET /api/products
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// POST /api/products
router.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'An error occurred while adding the product' });
  }
});

// DELETE /api/products/:id
router.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
});

// Update a product

// PUT /api/products/:idr
router.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = {
      name: req.body.name,
      price: req.body.price
      // You can add other properties that you want to update
    };

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {
      new: true // Return the updated product
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
});


module.exports = router;
