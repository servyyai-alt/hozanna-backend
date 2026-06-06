const Service = require("../models/Service");
const Project = require("../models/Project");
const Enquiry = require("../models/Enquiry");
const Blog = require("../models/Blog");
const Testimonial = require("../models/Testimonial");

const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (_req, res) => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);

  const [
    totalEnquiries,
    totalServices,
    totalProjects,
    totalBlogPosts,
    recentEnquiries,
    recentProjects,
    latestTestimonials,
    monthlyEnquiriesRaw,
  ] = await Promise.all([
    Enquiry.countDocuments(),
    Service.countDocuments(),
    Project.countDocuments(),
    Blog.countDocuments(),
    Enquiry.find().sort({ createdAt: -1 }).limit(5),
    Project.find().sort({ createdAt: -1 }).limit(4),
    Testimonial.find().sort({ createdAt: -1 }).limit(4),
    Enquiry.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonthsAgo,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),
  ]);

  const monthlyEnquiries = Array.from({ length: 6 }, (_value, index) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - (5 - index), 1);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const match = monthlyEnquiriesRaw.find((item) => item._id.year === year && item._id.month === month);

    return {
      label: date.toLocaleString("en-IN", { month: "short" }),
      total: match?.total || 0,
    };
  });

  res.status(200).json({
    success: true,
    data: {
      totalEnquiries,
      totalServices,
      totalProjects,
      totalBlogPosts,
      recentEnquiries,
      recentProjects,
      latestTestimonials,
      monthlyEnquiries,
    },
  });
});

module.exports = { getDashboardStats };
