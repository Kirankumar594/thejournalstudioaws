import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dB.js';
import cors from 'cors';
import BannerRouter from "./Routes/BannerRoute.js"
import TestimonialRouter from "./Routes/TestimonialRoute.js"
import ProductRouter from "./Routes/ProductRoute.js"
import path from 'path';
// import ReviewRouter from "./Routes/ReviewRoute.js"
import UserRouter from "./Routes/UserRoutes.js";
import featureRoutes from './Routes/featureRoutes.js';

// import ProductDetailRouter from "./Routes/ProductDetailRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))
// app.use('/uploads', express.static('uploads'));

app.use('/uploads', express.static('/mnt/data/uploads'));



app.use('/api/banner',BannerRouter)
app.use('/api/Testimonial',TestimonialRouter)
app.use("/api/Product", ProductRouter)
// app.use("/api/Review", ReviewRouter)
app.use("/api/User", UserRouter)
app.use('/api/feature', featureRoutes);

// example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
