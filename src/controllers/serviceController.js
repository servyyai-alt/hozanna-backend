const Service = require("../models/Service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const { buildSearchRegex, getPagination, buildMeta } = require("../utils/query");
const { uploadBuffer } = require("../services/cloudinaryService");

const listServices = asyncHandler(async (req, res) => {
  const filters = {};
  const { category, featured, active, search } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  if (category) {
    filters.category = category;
  }
  if (featured !== undefined) {
    filters.isFeatured = featured === "true";
  }
  if (active !== undefined) {
    filters.isActive = active === "true";
  }
  if (search) {
    const regex = buildSearchRegex(search);
    filters.$or = [{ title: regex }, { summary: regex }, { description: regex }];
  }

  const [items, total] = await Promise.all([
    Service.find(filters).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    Service.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: buildMeta({ page, limit, total }),
  });
});

const getService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({
    $or: [{ slug: req.params.slugOrId }, { _id: req.params.slugOrId }],
  }).catch(() => Service.findOne({ slug: req.params.slugOrId }));

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  res.status(200).json({ success: true, data: service });
});

const createService = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.image = {
      ...(await uploadBuffer(req.file, "hozanna/services")),
      alt: payload.title,
    };
  }

  if (typeof payload.features === "string") {
    payload.features = payload.features
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const service = await Service.create(payload);
  res.status(201).json({ success: true, message: "Service created successfully", data: service });
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  Object.assign(service, req.body);

  if (typeof req.body.features === "string") {
    service.features = req.body.features
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (req.file) {
    service.image = {
      ...(await uploadBuffer(req.file, "hozanna/services")),
      alt: service.title,
    };
  }

  await service.save();
  res.status(200).json({ success: true, message: "Service updated successfully", data: service });
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  res.status(200).json({ success: true, message: "Service deleted successfully" });
});

module.exports = { listServices, getService, createService, updateService, deleteService };
