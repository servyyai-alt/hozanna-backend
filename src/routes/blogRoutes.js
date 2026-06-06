const express = require("express");

const { listBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", listBlogs);
router.get("/:slugOrId", getBlog);
router.post("/", protect, authorize("admin"), upload.single("coverImage"), createBlog);
router.put("/:id", protect, authorize("admin"), upload.single("coverImage"), updateBlog);
router.delete("/:id", protect, authorize("admin"), deleteBlog);

module.exports = router;
