require("dotenv").config();

const app = require("../src/app");
const connectDatabase = require("../src/config/db");
const { getAllowedOrigins } = require("../src/config/cors");
const { ensureDefaultAdmin } = require("../src/data/seed");

let bootstrapPromise;

const applyCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (!origin) {
    return;
  }

  if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  }
};

const bootstrap = async () => {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      await connectDatabase();
      await ensureDefaultAdmin();
    })().catch((error) => {
      bootstrapPromise = undefined;
      throw error;
    });
  }

  await bootstrapPromise;
};

module.exports = async (req, res) => {
  applyCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    await bootstrap();
    return app(req, res);
  } catch (error) {
    console.error("Vercel function bootstrap failed", error);

    return res.status(500).json({
      success: false,
      message: "Backend bootstrap failed",
      error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};
