import "dotenv/config";
import mongoose from "mongoose";

import { connectDatabase } from "../config/database.js";
import { User } from "../models/User.js";

const requiredVariables = [
  "ADMIN_NAME",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
];

const missingVariables = requiredVariables.filter(
  (variable) => !process.env[variable]?.trim()
);

async function createAdmin() {
  try {
    if (missingVariables.length > 0) {
      throw new Error(
        `Missing environment variables: ${missingVariables.join(", ")}`
      );
    }

    await connectDatabase();

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const name = process.env.ADMIN_NAME.trim();
    const password = process.env.ADMIN_PASSWORD;
    const phone = process.env.ADMIN_PHONE?.trim() || null;

    let admin = await User.findOne({ email }).select("+password");
    let action = "created";

    if (admin) {
      admin.name = name;
      admin.password = password;
      admin.role = "admin";
      admin.isActive = true;

      if (phone) {
        admin.phone = phone;
      }

      await admin.save();
      action = "updated";
    } else {
      admin = await User.create({
        name,
        email,
        phone,
        password,
        role: "admin",
        isActive: true,
      });
    }

    console.log(`Admin ${action} successfully: ${admin.email}`);
  } catch (error) {
    console.error(`Admin setup failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await createAdmin();