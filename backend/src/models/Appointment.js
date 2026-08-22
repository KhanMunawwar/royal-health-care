import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true
    },
    appointmentDate: { type: Date, required: true, index: true },
    timeSlot: {
      start: { type: String, required: true },
      end: { type: String, required: true }
    },
    consultationType: {
      type: String,
      enum: ["clinic", "video", "audio", "chat", "home"],
      default: "clinic"
    },
    reason: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["requested", "confirmed", "completed", "cancelled"],
      default: "requested",
      index: true
    },
    cancellationReason: { type: String, trim: true, maxlength: 300 }
  },
  { timestamps: true }
);

appointmentSchema.index({ doctor: 1, appointmentDate: 1, "timeSlot.start": 1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
