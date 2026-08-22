import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      required: true
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    specializations: [{ type: String, trim: true }],
    qualifications: [{ type: String, trim: true }],
    experienceYears: { type: Number, min: 0, default: 0 },
    consultationFee: { type: Number, min: 0, required: true },
    languages: [{ type: String, trim: true }],
    availability: [availabilitySchema],
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

doctorSchema.index({ specializations: 1, isVerified: 1 });

export const Doctor = mongoose.model("Doctor", doctorSchema);
