const express = require("express");

const { getEnquirySettings, updateEnquirySettings } = require("../controllers/settingsController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/enquiry", getEnquirySettings);
router.patch("/enquiry", protect, authorize("admin"), updateEnquirySettings);

module.exports = router;
