import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  phone: { type: String, required: true },
  isPhoneVerified: { type: Boolean, default: false },
  notificationMethod: { type: String, enum: ["sms", "email"], default: "sms" },
  verificationCode: { type: String, required: false },
  notificationFrequency: {
    type: String,
    enum: ["instant", "daily", "weekly"],
    default: "instant",
  },
  isActive: { type: Boolean, default: false },
  categories: [{ type: String }], // <-- array of category names like ['IT', 'Engineering']
  lastNotifiedAt: { type: Date },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
