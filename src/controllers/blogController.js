const Blog = require("../models/Blog");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const { buildSearchRegex, getPagination, buildMeta } = require("../utils/query");
const { uploadBuffer } = require("../services/cloudinaryService");

const listBlogs = asyncHandler(async (req, res) => {
  const filters = {};
  const { category, search, published } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  if (category) {
    filters.category = category;
  }
  if (published !== undefined) {
    filters.isPublished = published === "true";
  }
  if (search) {
    const regex = buildSearchRegex(search);
    filters.$or = [{ title: regex }, { excerpt: regex }, { content: regex }, { category: regex }];
  }

  const [items, total] = await Promise.all([
    Blog.find(filters).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit),
    Blog.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: buildMeta({ page, limit, total }),
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    $or: [{ slug: req.params.slugOrId }, { _id: req.params.slugOrId }],
  }).catch(() => Blog.findOne({ slug: req.params.slugOrId }));

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  res.status(200).json({ success: true, data: blog });
});

const createBlog = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  payload.tags =
    typeof req.body.tags === "string"
      ? req.body.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : req.body.tags || [];

  if (req.file) {
    payload.coverImage = {
      ...(await uploadBuffer(req.file, "hozanna/blogs")),
      alt: payload.title,
    };
  }

  const blog = await Blog.create(payload);
  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  Object.assign(blog, req.body);
  if (typeof req.body.tags === "string") {
    blog.tags = req.body.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  if (req.file) {
    blog.coverImage = {
      ...(await uploadBuffer(req.file, "hozanna/blogs")),
      alt: blog.title,
    };
  }

  await blog.save();
  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

module.exports = { listBlogs, getBlog, createBlog, updateBlog, deleteBlog };
