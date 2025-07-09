// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const folder = 'uploads/banners';
//     if (!fs.existsSync(folder)) {
//       fs.mkdirSync(folder, { recursive: true });
//     }
//     cb(null, folder);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, `banner-${uniqueSuffix}${path.extname(file.originalname)}`);
//   },
// });

// const uploadBanner = multer({ storage }).single('image');
// export default uploadBanner;



import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Storage engine using persistent Render disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = '/mnt/data/uploads/banners'; // Use persistent volume
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `banner-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const uploadBanner = multer({ storage }).single('image');
export default uploadBanner;
