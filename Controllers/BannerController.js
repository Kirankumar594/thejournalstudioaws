// Controllers/BannerController.js\
import Banner from '../Models/BannerModel.js';
import fs from "fs";

export const createBanner = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imagePath = req.file.path;

    const banner = new Banner({
      title,
      description,
      image: imagePath,
    });

    await banner.save();

    res.status(201).json({
      success: true,
      data: banner,
    });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.find().sort({ createdAt: -1 });

    if (!banner || banner.length === 0) {
      return res.status(404).json({ error: "no banners found" });
    }
    res.status(200).json(banner);
  }
  catch {
    res.status(500).json({ error: error.message })
  }
}

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    if (banner.image && fs.existsSync(banner.image)) {
      fs.unlinkSync(banner.image);
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
      data: banner,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    if (req.file) {
      // Delete old image file if exists
      if (banner.image && fs.existsSync(banner.image)) {
        fs.unlinkSync(banner.image);
      }
      banner.image = req.file.path;
    }

    if (title) banner.title = title;
    if (description) banner.description = description;

    const updatedBanner = await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
