const mongoose = require("mongoose");
const { defaultBudgetRanges } = require("../data/defaultSettings");

const siteSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "primary",
      unique: true,
      trim: true,
    },
    enquiryBudgetRanges: {
      type: [String],
      default: defaultBudgetRanges,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
