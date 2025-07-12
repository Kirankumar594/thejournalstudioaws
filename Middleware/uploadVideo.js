import multer from 'multer';
import path from 'path';
import fs from 'fs';

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = 'uploads/videos';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `video-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const uploadVideo = multer({ storage: videoStorage }).single('video');
export default uploadVideo;
