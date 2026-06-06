const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    experienceYears: { type: Number, default: 0 },
    coverLetter: { type: String, trim: true },
    portfolioUrl: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "screening", "interview", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerApplication", careerApplicationSchema);
