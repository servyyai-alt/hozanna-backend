const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    fileName: String,
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    serviceType: { type: String, required: true, trim: true },
    projectLocation: { type: String, required: true, trim: true },
    budgetRange: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true, trim: true },
    attachments: [attachmentSchema],
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "won", "closed"],
      default: "new",
    },
    notes: { type: String, trim: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
