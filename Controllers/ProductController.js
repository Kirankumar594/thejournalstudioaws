import Product from '../Models/ProductModel.js';
import fs from 'fs';

export const createProduct = async (req, res) => {
  try {
    const { name, price, description1, description2, author } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one product image is required" });
    }

    const desc2 = typeof description2 === 'string' ? JSON.parse(description2) : description2;
    const imagePaths = req.files.map(file => `/uploads/banners/${file.filename}`);


    const product = new Product({
      images: imagePaths,
      name,
      price,
      author,
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
    const productId = req.params.id;
    const { name, price, author, description1, description2, feature, oldImages } = req.body;

    const parsedDescription2 = typeof description2 === 'string' ? JSON.parse(description2) : description2;
    const parsedFeature = typeof feature === 'string' ? JSON.parse(feature) : feature;

    let oldImagesArray = [];
    if (oldImages) {
      oldImagesArray = Array.isArray(oldImages) ? oldImages : [oldImages];
    }

    const newImagePaths = req.files.map(file => `/uploads/banners/${file.filename}`);
    const combinedImages = [...oldImagesArray, ...newImagePaths];

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      price,
      author,
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

    product.images.forEach(img => fs.existsSync(img) && fs.unlinkSync(img));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
