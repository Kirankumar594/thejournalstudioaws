import express from "express";
import { createTestimonial, deleteTestimonial, getAllTestimonial, updateTestimonial } from "../Controllers/TestimonialController.js";

const router = express.Router();

router.post("/", createTestimonial);
router.get("/",getAllTestimonial);
router.delete("/:id",deleteTestimonial);
router.put("/:id",updateTestimonial);

export default router;
