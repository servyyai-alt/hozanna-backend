const express = require("express");

const { login, getProfile, updateProfile, changePassword, logout } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/profile", protect, authorize("admin"), getProfile);
router.patch("/profile", protect, authorize("admin"), updateProfile);
router.patch("/change-password", protect, authorize("admin"), changePassword);

module.exports = router;
