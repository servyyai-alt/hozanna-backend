require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/db");
const { ensureDefaultAdmin } = require("./data/seed");

const PORT = Number(process.env.PORT || 5000);

const bootstrap = async () => {
  await connectDatabase();
  await ensureDefaultAdmin();

  app.listen(PORT, () => {
    console.log(`Hosanna backend running on port ${PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
