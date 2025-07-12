// controllers/VideoController.js
import VideoModel from '../Models/VideoModel.js';

// Create Video
export const createVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = req.file?.filename;

    if (!video) return res.status(400).json({ message: "Video file is required" });

    const newVideo = new VideoModel({ video, title, description });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Videos
export const getVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await VideoModel.findByIdAndDelete(id);
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updateFields = { title, description };

    if (req.file?.filename) {
      updateFields.video = req.file.filename;
    }

    const updatedVideo = await VideoModel.findByIdAndUpdate(id, updateFields, { new: true });
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
