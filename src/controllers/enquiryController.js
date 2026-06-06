const Enquiry = require("../models/Enquiry");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const { buildSearchRegex, getPagination, buildMeta } = require("../utils/query");
const { uploadBuffer } = require("../services/cloudinaryService");
const { getAllowedBudgetRanges } = require("./settingsController");

const createEnquiry = asyncHandler(async (req, res) => {
  const requiredFields = [
    "name",
    "mobile",
    "serviceType",
    "projectLocation",
    "budgetRange",
    "projectDescription",
  ];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      throw new AppError(`${field} is required`, 400);
    }
  });

  const allowedBudgetRanges = await getAllowedBudgetRanges();

  if (!allowedBudgetRanges.includes(req.body.budgetRange)) {
    throw new AppError("Please select a valid budget range", 400);
  }

  const attachment = await uploadBuffer(req.file, "hozanna/enquiries");

  const enquiry = await Enquiry.create({
    ...req.body,
    attachments: attachment
      ? [{ ...attachment, fileName: req.file.originalname }]
      : [],
  });

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully",
    data: enquiry,
  });
});

const listEnquiries = asyncHandler(async (req, res) => {
  const filters = {};
  const { status, search } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  if (status) {
    filters.status = status;
  }
  if (search) {
    const regex = buildSearchRegex(search);
    filters.$or = [{ name: regex }, { email: regex }, { serviceType: regex }, { projectLocation: regex }];
  }

  const [items, total] = await Promise.all([
    Enquiry.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: buildMeta({ page, limit, total }),
  });
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Enquiry updated successfully",
    data: enquiry,
  });
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Enquiry deleted successfully",
  });
});

module.exports = { createEnquiry, listEnquiries, updateEnquiry, deleteEnquiry };
