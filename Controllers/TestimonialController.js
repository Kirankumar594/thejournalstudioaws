import TestimonialModel from "../Models/TestimonialModel.js";

export const createTestimonial = async (req, res) => {
  try {
    const { name, description, rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const testimonial = new TestimonialModel({
      name,
      description,
      rating,
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 });

    if (!testimonials || testimonials.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: "No testimonials found" 
      });
    }

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Public
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialModel.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ 
        success: false,
        error: "Testimonial not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      data: testimonial,
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};


// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Public
export const updateTestimonial = async (req, res) => {
  try {
    const { name, description, rating } = req.body;

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const testimonial = await TestimonialModel.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ 
        success: false,
        error: "Testimonial not found" 
      });
    }

    // Update fields if provided
    if (name) testimonial.name = name;
    if (description) testimonial.description = description;
    if (rating) testimonial.rating = rating;

    const updatedTestimonial = await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Get average rating of all testimonials
// @route   GET /api/testimonials/average-rating
// @access  Public
export const getAverageRating = async (req, res) => {
  try {
    const result = await TestimonialModel.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalTestimonials: { $sum: 1 },
          fiveStar: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
          fourStar: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
          threeStar: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
          twoStar: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
          oneStar: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: "No testimonials found" 
      });
    }

    const ratingData = result[0];
    
    res.status(200).json({
      success: true,
      data: {
        averageRating: parseFloat(ratingData.averageRating.toFixed(1)), // Round to 1 decimal
        totalTestimonials: ratingData.totalTestimonials,
        ratingDistribution: {
          fiveStar: ratingData.fiveStar,
          fourStar: ratingData.fourStar,
          threeStar: ratingData.threeStar,
          twoStar: ratingData.twoStar,
          oneStar: ratingData.oneStar
        }
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};