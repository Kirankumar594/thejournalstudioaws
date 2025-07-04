import express from "express";
import { 
  createProduct, 
  getProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct 
} from "../Controllers/productController.js";
import upload from "../Middleware/upload.js";

const router = express.Router();

router.post("/", upload, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", upload, updateProduct);
router.delete("/:id", deleteProduct);

export default router;