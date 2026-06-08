const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    designation: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, trim: true },
    videoUrl: String,
    video: {
      url: String,
      publicId: String,
    },
    location: String,
    avatar: {
      url: String,
      publicId: String,
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
