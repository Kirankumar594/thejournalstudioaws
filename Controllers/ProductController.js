import Product from '../Models/ProductModel.js';
import fs from 'fs';
import path from 'path';

export const createProduct = async (req, res) => {
  try {
    const { name, price, description1, size, wt, page, Format } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const imagePath = req.file.path;

    const product = new Product({
      image: imagePath,
      name,
      price,
      description1,
      description2: {
        size,
        wt,
        page,
        Format
      }
    });

    await product.save();

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description1, size, wt, page, Format } = req.body;
    let updateData = {
      name,
      price,
      description1,
      description2: {
        size,
        wt,
        page,
        Format
      }
    };

    // If new image is uploaded
    if (req.file) {
      updateData.image = req.file.path;
      // Delete old image
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct.image && fs.existsSync(oldProduct.image)) {
        fs.unlinkSync(oldProduct.image);
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found"
      });
    }

    // Delete associated image
    if (product.image && fs.existsSync(product.image)) {
      fs.unlinkSync(product.image);
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};