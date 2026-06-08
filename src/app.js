const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const blogRoutes = require("./routes/blogRoutes");
const careerRoutes = require("./routes/careerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { isOriginAllowed } = require("./config/cors");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Hosanna Enterprises API is running",
    health: "/api/health",
  });
});

app.get("/api", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Hosanna Enterprises API is running",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Hosanna Enterprises API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
