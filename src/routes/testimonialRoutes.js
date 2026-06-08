const express = require("express");

const {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();
const testimonialUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

router.get("/", listTestimonials);
router.post("/", protect, authorize("admin"), testimonialUpload, createTestimonial);
router.put("/:id", protect, authorize("admin"), testimonialUpload, updateTestimonial);
router.delete("/:id", protect, authorize("admin"), deleteTestimonial);

module.exports = router;
