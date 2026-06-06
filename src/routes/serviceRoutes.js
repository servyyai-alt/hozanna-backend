const express = require("express");

const {
  listServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", listServices);
router.get("/:slugOrId", getService);
router.post("/", protect, authorize("admin"), upload.single("image"), createService);
router.put("/:id", protect, authorize("admin"), upload.single("image"), updateService);
router.delete("/:id", protect, authorize("admin"), deleteService);

module.exports = router;
