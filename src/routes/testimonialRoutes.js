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

router.get("/", listTestimonials);
router.post("/", protect, authorize("admin"), upload.single("avatar"), createTestimonial);
router.put("/:id", protect, authorize("admin"), upload.single("avatar"), updateTestimonial);
router.delete("/:id", protect, authorize("admin"), deleteTestimonial);

module.exports = router;
