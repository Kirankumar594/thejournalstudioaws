import express from 'express';
import multer from 'multer';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../Controllers/ProductController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// Corrected fileFilter: use 'image/' (singular)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
