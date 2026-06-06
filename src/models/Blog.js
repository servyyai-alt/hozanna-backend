const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    coverImage: {
      url: String,
      publicId: String,
      alt: String,
    },
    category: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    author: { type: String, default: "Hosanna Enterprises" },
    publishedAt: Date,
    readTime: { type: Number, default: 5 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
