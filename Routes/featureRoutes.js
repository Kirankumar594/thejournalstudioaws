import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createFeature,
  getFeature,
  updateFeature,
  deleteFeature,
} from '../controllers/featureController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createFeature);
router.put('/:id', upload.single('image'), updateFeature);
router.get('/', getFeature);
router.delete('/:id', deleteFeature);

export default router;