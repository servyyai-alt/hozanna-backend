require("dotenv").config();

const app = require("../src/app");
const connectDatabase = require("../src/config/db");
const { ensureDefaultAdmin } = require("../src/data/seed");

let bootstrapPromise;

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
  await bootstrap();
  return app(req, res);
};
