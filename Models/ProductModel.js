import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description1: {
    type: String,
    required: true,
    trim: true,
  },
  description2: {
    size: {
      type: String,
      trim: true,
    },
    wt: {
      type: String,  
      trim: true,
    },
    page: {
      type:String,
      trim:true
    },
    Format: {
      type: String,
      trim: true,
    },
  },
  feature: {
  type: [String],
  trim: true
}

}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
