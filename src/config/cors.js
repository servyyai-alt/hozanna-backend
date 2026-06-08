const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://hozanna-fe.vercel.app",
];

const normalizeOrigin = (value) => value.trim().replace(/\/+$/, "");

const getAllowedOrigins = () => {
  const configuredOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);

  return [...new Set([...DEFAULT_ALLOWED_ORIGINS.map(normalizeOrigin), ...configuredOrigins])];
};

const isOriginAllowed = (origin) => {
  if (!origin) {
    return true;
  }

  return getAllowedOrigins().includes(origin);
};

module.exports = {
  getAllowedOrigins,
  isOriginAllowed,
};
