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

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = 'uploads/banners';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `banner-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Updated to handle multiple files (up to 10)
const uploadBanner = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10 // Maximum of 10 files
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png, webp) are allowed!'));
    }
  }
}).array('images', 10); // Changed from .single() to .array()

export default uploadBanner;