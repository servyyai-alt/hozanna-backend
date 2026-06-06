const mongoose = require("mongoose");

let cachedConnection = null;
let connectionPromise = null;

const formatTopologyErrors = (error) => {
  const servers = error?.reason?.servers;

  if (!servers || typeof servers.values !== "function") {
    return "";
  }

  const details = [...servers.values()]
    .map((server) => {
      const message = server.error?.message || server.error?.cause?.message;
      return message ? `${server.address}: ${message}` : null;
    })
    .filter(Boolean);

  return details.length ? `\nAtlas server details:\n- ${details.join("\n- ")}` : "";
};

const connectDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hozanna-enterprises";

  mongoose.set("strictQuery", true);
  try {
    if (!connectionPromise) {
      connectionPromise = mongoose.connect(uri, {
        family: 4,
        serverSelectionTimeoutMS: 10000,
      });
    }

    cachedConnection = await connectionPromise;
  } catch (error) {
    connectionPromise = null;
    error.message = `${error.message}${formatTopologyErrors(error)}`;
    throw error;
  }

  console.log("MongoDB connected");
  return cachedConnection;
};

module.exports = connectDatabase;
