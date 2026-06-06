const express = require("express");

const {
  createEnquiry,
  listEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("file"), createEnquiry);
router.get("/", protect, authorize("admin"), listEnquiries);
router.patch("/:id", protect, authorize("admin"), updateEnquiry);
router.delete("/:id", protect, authorize("admin"), deleteEnquiry);

module.exports = router;
