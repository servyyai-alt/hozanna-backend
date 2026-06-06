const express = require("express");

const {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

const projectUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
  { name: "beforeImages", maxCount: 6 },
  { name: "afterImages", maxCount: 6 },
]);

router.get("/", listProjects);
router.get("/:slugOrId", getProject);
router.post("/", protect, authorize("admin"), projectUpload, createProject);
router.put("/:id", protect, authorize("admin"), projectUpload, updateProject);
router.delete("/:id", protect, authorize("admin"), deleteProject);

module.exports = router;
