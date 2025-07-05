// Routes/BannerRoute.js
import express from "express";
import { createBanner , deleteBanner, getBanner, updateBanner } from "../Controllers/BannerController.js";
import uploadBanner from "../Middleware/upload.js";


const router = express.Router();

router.post("/", uploadBanner, createBanner);
router.get("/", getBanner);
router.delete("/:id", deleteBanner);
router.put("/:id",uploadBanner, updateBanner);

export default router;
