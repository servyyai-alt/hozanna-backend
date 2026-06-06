const mongoose = require("mongoose");

const careerOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, default: "Full Time", trim: true },
    location: { type: String, default: "Tamil Nadu", trim: true },
    experience: { type: String, default: "0-1 Years", trim: true },
    description: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerOpening", careerOpeningSchema);
