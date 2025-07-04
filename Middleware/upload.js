// Middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure directory exists
const uploadPath = 'uploads/banners';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `banner-${Date.now()}${ext}`);
  }
});

const uploadBanner = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const isValid =
      allowed.test(path.extname(file.originalname).toLowerCase()) &&
      allowed.test(file.mimetype);
    isValid ? cb(null, true) : cb(new Error("Only image files allowed!"));
  }
});

// ✅ Export the middleware directly
export default uploadBanner.single('image');
