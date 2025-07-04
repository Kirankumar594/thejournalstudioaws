import TestimonialModel from "../Models/TestimonialModel.js";

export const createTestimonial = async (req, res) => {
  try {
    const { name, description } = req.body;

    const testimonial = new TestimonialModel({
      name,
      description,
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 });

    if (!testimonials || testimonials.length === 0) {
      return res.status(404).json({ error: "No testimonials found" });
    }

    res.status(200).json({
      success: true,
      data: testimonials
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialModel.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      data: testimonial,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateTestimonial = async (req, res) => {
  try {
    const { name, description } = req.body;

    const testimonial = await TestimonialModel.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    // Update fields if provided
    if (name) testimonial.name = name;
    if (description) testimonial.description = description;

    const updatedTestimonial = await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

