const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const { buildSearchRegex, getPagination, buildMeta } = require("../utils/query");
const { uploadBuffer, uploadManyBuffers } = require("../services/cloudinaryService");

const listProjects = asyncHandler(async (req, res) => {
  const filters = {};
  const { category, featured, status, search } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  if (category) {
    filters.category = category;
  }
  if (status) {
    filters.status = status;
  }
  if (featured !== undefined) {
    filters.isFeatured = featured === "true";
  }
  if (search) {
    const regex = buildSearchRegex(search);
    filters.$or = [{ title: regex }, { summary: regex }, { location: regex }];
  }

  const [items, total] = await Promise.all([
    Project.find(filters).sort({ completedOn: -1, createdAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: buildMeta({ page, limit, total }),
  });
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    $or: [{ slug: req.params.slugOrId }, { _id: req.params.slugOrId }],
  }).catch(() => Project.findOne({ slug: req.params.slugOrId }));

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  res.status(200).json({ success: true, data: project });
});

const createProject = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (typeof payload.features === "string") {
    payload.features = payload.features
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const [thumbnail] = await uploadManyBuffers(req.files?.thumbnail || [], "hozanna/projects");
  const galleryImages = await uploadManyBuffers(req.files?.galleryImages || [], "hozanna/projects");
  const beforeImages = await uploadManyBuffers(req.files?.beforeImages || [], "hozanna/projects");
  const afterImages = await uploadManyBuffers(req.files?.afterImages || [], "hozanna/projects");

  payload.thumbnail = thumbnail ? { ...thumbnail, alt: payload.title } : undefined;
  payload.galleryImages = galleryImages.map((image) => ({ ...image, alt: payload.title }));
  payload.beforeImages = beforeImages.map((image) => ({ ...image, alt: `Before ${payload.title}` }));
  payload.afterImages = afterImages.map((image) => ({ ...image, alt: `After ${payload.title}` }));

  const project = await Project.create(payload);
  res.status(201).json({ success: true, message: "Project created successfully", data: project });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  Object.assign(project, req.body);

  if (typeof req.body.features === "string") {
    project.features = req.body.features
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const [thumbnail] = await uploadManyBuffers(req.files?.thumbnail || [], "hozanna/projects");
  const galleryImages = await uploadManyBuffers(req.files?.galleryImages || [], "hozanna/projects");
  const beforeImages = await uploadManyBuffers(req.files?.beforeImages || [], "hozanna/projects");
  const afterImages = await uploadManyBuffers(req.files?.afterImages || [], "hozanna/projects");

  if (thumbnail) {
    project.thumbnail = { ...thumbnail, alt: project.title };
  }
  if (galleryImages.length) {
    project.galleryImages = galleryImages.map((image) => ({ ...image, alt: project.title }));
  }
  if (beforeImages.length) {
    project.beforeImages = beforeImages.map((image) => ({ ...image, alt: `Before ${project.title}` }));
  }
  if (afterImages.length) {
    project.afterImages = afterImages.map((image) => ({ ...image, alt: `After ${project.title}` }));
  }

  await project.save();
  res.status(200).json({ success: true, message: "Project updated successfully", data: project });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  res.status(200).json({ success: true, message: "Project deleted successfully" });
});

module.exports = { listProjects, getProject, createProject, updateProject, deleteProject };
