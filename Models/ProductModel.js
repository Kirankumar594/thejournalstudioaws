import mongoose from "mongoose";

function arrayLimit(val) {
  return val.length > 0;
}

const ProductSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} must have at least one image'],
  },
  name: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description1: { type: String, required: true, trim: true },
  description2: {
    size: {
      type: String,
      trim: true,
      enum: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    },
    wt: { type: String, trim: true },
    page: { type: String, trim: true },
    Format: { type: String, trim: true },
  },
  feature: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
