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
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Feature', FeatureSchema);