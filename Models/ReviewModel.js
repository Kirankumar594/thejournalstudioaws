import mongoose from 'mongoose';


const ReviewSchema = new mongoose.Schema({
  bookName: {
      type: mongoose.Schema.Types.ObjectId,
    ref: "Product",     
    required: true,
  },
  reviewer: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
