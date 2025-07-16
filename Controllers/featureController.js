import Feature from '../Models/Feature.js';

// Create Feature
export const createFeature = async (req, res) => {
    try {
        const { heading, description } = req.body;
        let imagePath = null;

        if (req.file) {
            imagePath = 'Uploads/' + req.file.filename;
        } else {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const newFeature = new Feature({
            heading,
            description,
            image: imagePath,
        });

        const saved = await newFeature.save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const updateFeature = async (req, res) => {
    try {
        const { heading, description } = req.body;

        const updateData = {
            heading,
            description,
        };

        if (req.file) {
            updateData.image = 'Uploads/' + req.file.filename;
        }

        const updated = await Feature.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get Single (or Latest) Feature
export const getFeature = async (req, res) => {
    try {
        const feature = await Feature.findOne().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: feature });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete Feature
export const deleteFeature = async (req, res) => {
    try {
        await Feature.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Feature deleted' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};