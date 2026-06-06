const SiteSettings = require("../models/SiteSettings");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const { defaultBudgetRanges } = require("../data/defaultSettings");

const SETTINGS_KEY = "primary";

const normalizeBudgetRanges = (input) => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => String(item || "").trim())
    .filter(Boolean);
};

const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne({ key: SETTINGS_KEY });

  if (!settings) {
    settings = await SiteSettings.create({
      key: SETTINGS_KEY,
      enquiryBudgetRanges: defaultBudgetRanges,
    });
  }

  return settings;
};

const getEnquirySettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();

  res.status(200).json({
    success: true,
    data: {
      budgetRanges: normalizeBudgetRanges(settings.enquiryBudgetRanges).length
        ? settings.enquiryBudgetRanges
        : defaultBudgetRanges,
    },
  });
});

const updateEnquirySettings = asyncHandler(async (req, res) => {
  const budgetRanges = normalizeBudgetRanges(req.body.budgetRanges);

  if (!budgetRanges.length) {
    throw new AppError("At least one budget range is required", 400);
  }

  const settings = await getOrCreateSettings();
  settings.enquiryBudgetRanges = budgetRanges;
  await settings.save();

  res.status(200).json({
    success: true,
    message: "Enquiry settings updated successfully",
    data: {
      budgetRanges: settings.enquiryBudgetRanges,
    },
  });
});

const getAllowedBudgetRanges = async () => {
  const settings = await getOrCreateSettings();
  const budgetRanges = normalizeBudgetRanges(settings.enquiryBudgetRanges);
  return budgetRanges.length ? budgetRanges : defaultBudgetRanges;
};

module.exports = { getEnquirySettings, updateEnquirySettings, getAllowedBudgetRanges };
