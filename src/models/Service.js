const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, default: "Fabrication" },
    summary: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    features: [{ type: String, trim: true }],
    image: {
      url: String,
      publicId: String,
      alt: String,
    },
    inquiryLabel: { type: String, default: "Request Estimate" },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
