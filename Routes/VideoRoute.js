// routes/videoRoutes.js
import express from 'express';
import { createVideo, getVideos, deleteVideo, updateVideo } from '../Controllers/VideoController.js';
import uploadVideo from "../Middleware/uploadVideo.js";

const router = express.Router();

router.post('/', uploadVideo, createVideo);
router.get('/', getVideos);
router.put('/:id', uploadVideo, updateVideo);
router.delete('/:id', deleteVideo);

export default router;
