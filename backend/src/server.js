import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";

const requiredVariables = ["MONGODB_URI", "JWT_SECRET"];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVariables.join(", ")}`);
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must contain at least 32 characters");
}

const port = Number(process.env.PORT) || 5000;
await connectDatabase();

const server = createServer(app);
server.listen(port, () => {
  console.log(`Royal Health Care API running on http://localhost:${port}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down safely...`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  shutdown("unhandledRejection");
});
