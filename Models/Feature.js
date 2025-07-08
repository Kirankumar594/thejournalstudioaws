// models/Feature.js
import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true, // image URL or path
  }
}, { timestamps: true });

export default mongoose.model('Feature', FeatureSchema);
