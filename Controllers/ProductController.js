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

// Your update product controller

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description1, description2, feature, oldImages } = req.body;

    // Parse JSON strings if sent as JSON strings
    const parsedDescription2 = JSON.parse(description2);
    const parsedFeature = JSON.parse(feature);

    // oldImages may come as a string or array
    // If a single oldImages, multer/formData sends it as a string
    let oldImagesArray = [];
    if (oldImages) {
      if (Array.isArray(oldImages)) {
        oldImagesArray = oldImages;
      } else {
        oldImagesArray = [oldImages];
      }
    }

    // New uploaded files
    const newImagePaths = req.files ? req.files.map(file => file.path) : [];

    // Combine old images and new image paths
    const combinedImages = [...oldImagesArray, ...newImagePaths];

    // Update product with combined images
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      price,
      description1,
      description2: parsedDescription2,
      feature: parsedFeature,
      images: combinedImages
    }, { new: true });

    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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