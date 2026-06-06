const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    alt: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    clientName: { type: String, trim: true },
    completedOn: Date,
    thumbnail: imageSchema,
    galleryImages: [imageSchema],
    beforeImages: [imageSchema],
    afterImages: [imageSchema],
    features: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["completed", "in-progress", "upcoming"],
      default: "completed",
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
