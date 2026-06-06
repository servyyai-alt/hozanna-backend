const CareerApplication = require("../models/CareerApplication");
const CareerOpening = require("../models/CareerOpening");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const { getPagination, buildMeta } = require("../utils/query");
const { openings } = require("../data/defaultContent");

const ensureDefaultOpenings = async () => {
  const total = await CareerOpening.countDocuments();

  if (total > 0) {
    return;
  }

  await CareerOpening.insertMany(
    openings.map((opening, index) => ({
      title: opening.title,
      type: opening.type,
      location: opening.location,
      experience: opening.experience,
      description: opening.description,
      order: index,
      isActive: true,
    }))
  );
};

const getOpenings = asyncHandler(async (_req, res) => {
  await ensureDefaultOpenings();

  const items = await CareerOpening.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const listOpeningsAdmin = asyncHandler(async (_req, res) => {
  await ensureDefaultOpenings();

  const items = await CareerOpening.find().sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const createOpening = asyncHandler(async (req, res) => {
  const requiredFields = ["title", "description"];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      throw new AppError(`${field} is required`, 400);
    }
  });

  const opening = await CareerOpening.create(req.body);

  res.status(201).json({
    success: true,
    message: "Career opening created successfully",
    data: opening,
  });
});

const updateOpening = asyncHandler(async (req, res) => {
  const opening = await CareerOpening.findById(req.params.id);

  if (!opening) {
    throw new AppError("Career opening not found", 404);
  }

  Object.assign(opening, req.body);
  await opening.save();

  res.status(200).json({
    success: true,
    message: "Career opening updated successfully",
    data: opening,
  });
});

const deleteOpening = asyncHandler(async (req, res) => {
  const opening = await CareerOpening.findByIdAndDelete(req.params.id);

  if (!opening) {
    throw new AppError("Career opening not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Career opening deleted successfully",
  });
});

const createApplication = asyncHandler(async (req, res) => {
  const requiredFields = ["name", "email", "mobile", "position"];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      throw new AppError(`${field} is required`, 400);
    }
  });

  const application = await CareerApplication.create(req.body);
  res.status(201).json({
    success: true,
    message: "Career application submitted successfully",
    data: application,
  });
});

const listApplications = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const [items, total] = await Promise.all([
    CareerApplication.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    CareerApplication.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: buildMeta({ page, limit, total }),
  });
});

module.exports = {
  getOpenings,
  listOpeningsAdmin,
  createOpening,
  updateOpening,
  deleteOpening,
  createApplication,
  listApplications,
};
