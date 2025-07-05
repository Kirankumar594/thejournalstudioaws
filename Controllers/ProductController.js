import Product from '../Models/ProductModel.js';
import fs from 'fs';

export const createProduct = async (req, res) => {
  try {
    const { name, price, description1, description2 } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one product image is required" });
    }

    // Parse description2 if it's a string
    const desc2 = typeof description2 === 'string' ? JSON.parse(description2) : description2;
    
    const imagePaths = req.files.map(file => file.path.replace(/\\/g, '/'));
    
    const product = new Product({
      images: imagePaths,
      name,
      price,
      description1,
      description2: {
        size: desc2.size,
        wt: desc2.wt,
        page: desc2.page,
        Format: desc2.Format
      }
    });

    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (req.files) req.files.forEach(file => fs.existsSync(file.path) && fs.unlinkSync(file.path));
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description1, description2 } = req.body;
    
    // Parse description2 if it's a string
    const desc2 = typeof description2 === 'string' ? JSON.parse(description2) : description2;
    
    let updateData = { 
      name, 
      price, 
      description1, 
      description2: {
        size: desc2.size,
        wt: desc2.wt,
        page: desc2.page,
        Format: desc2.Format
      }
    };

    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => file.path.replace(/\\/g, '/'));
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct && oldProduct.images) {
        oldProduct.images.forEach(img => fs.existsSync(img) && fs.unlinkSync(img));
      }
      updateData.images = imagePaths;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    if (req.files) req.files.forEach(file => fs.existsSync(file.path) && fs.unlinkSync(file.path));
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });
    if (product.images) product.images.forEach(img => fs.existsSync(img) && fs.unlinkSync(img));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};