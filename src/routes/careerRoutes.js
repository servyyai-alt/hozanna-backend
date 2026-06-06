const express = require("express");

const {
  getOpenings,
  listOpeningsAdmin,
  createOpening,
  updateOpening,
  deleteOpening,
  createApplication,
  listApplications,
} = require("../controllers/careerController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/openings", getOpenings);
router.get("/openings/admin", protect, authorize("admin"), listOpeningsAdmin);
router.post("/openings", protect, authorize("admin"), createOpening);
router.put("/openings/:id", protect, authorize("admin"), updateOpening);
router.delete("/openings/:id", protect, authorize("admin"), deleteOpening);
router.post("/applications", createApplication);
router.get("/applications", protect, authorize("admin"), listApplications);

module.exports = router;
