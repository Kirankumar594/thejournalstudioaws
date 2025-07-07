import express from "express";
import { 
  createTestimonial, 
  deleteTestimonial, 
  getAllTestimonial, 
  updateTestimonial,
  getAverageRating 
} from "../Controllers/TestimonialController.js";

const router = express.Router();

router.post("/", createTestimonial);
router.get("/", getAllTestimonial);
router.get("/average-rating", getAverageRating);
router.delete("/:id", deleteTestimonial);
router.put("/:id", updateTestimonial);

export default router;