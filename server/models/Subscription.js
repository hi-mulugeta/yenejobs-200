import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  phone: { type: String, required: true },
  isPhoneVerified: { type: Boolean, default: false },
  verificationCode: { type: String, default: "123456" },
  notificationMethod: {
    type: String,
    enum: ["sms", "email", "both"],
    default: "sms",
  },

  notificationFrequency: {
    type: String,
    enum: ["instant", "daily", "weekly"],
    default: "instant",
  },
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now },
  lastNotifiedAt: { type: Date, default: null },
  expiresAt: { type: Date, default: null },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
