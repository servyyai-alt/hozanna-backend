const Testimonial = require("../models/Testimonial");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const { getPagination, buildMeta } = require("../utils/query");
const { uploadBuffer } = require("../services/cloudinaryService");

const listTestimonials = asyncHandler(async (req, res) => {
  const filters = {};
  const { featured } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  if (featured !== undefined) {
    filters.isFeatured = featured === "true";
  }

  const [items, total] = await Promise.all([
    Testimonial.find(filters).sort({ isFeatured: -1, createdAt: -1 }).skip(skip).limit(limit),
    Testimonial.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: buildMeta({ page, limit, total }),
  });
});

const createTestimonial = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (req.file) {
    payload.avatar = await uploadBuffer(req.file, "hozanna/testimonials");
  }

  const testimonial = await Testimonial.create(payload);
  res.status(201).json({
    success: true,
    message: "Testimonial created successfully",
    data: testimonial,
  });
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    throw new AppError("Testimonial not found", 404);
  }

  Object.assign(testimonial, req.body);
  if (req.file) {
    testimonial.avatar = await uploadBuffer(req.file, "hozanna/testimonials");
  }

  await testimonial.save();
  res.status(200).json({
    success: true,
    message: "Testimonial updated successfully",
    data: testimonial,
  });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    throw new AppError("Testimonial not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Testimonial deleted successfully",
  });
});

module.exports = { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
