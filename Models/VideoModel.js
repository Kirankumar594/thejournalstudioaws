// models/VideoModel.js
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  }
}, { timestamps: true });

const VideoModel = mongoose.model('Video', VideoSchema);
export default VideoModel;
