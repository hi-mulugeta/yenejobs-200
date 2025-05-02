import Subscription from "../models/Subscription.js";
import axios from "axios";

export const subscribeToJobAlerts = async (req, res) => {
  const { jobId, phone, notificationMethod, notificationFrequency } = req.body;
  const userId = req.auth.userId;

  try {
    // Existing subscription check
    const existing = await Subscription.findOne({ userId, jobId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already subscribed to this category",
      });
    }

    // Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create subscription
    const subscription = await Subscription.create({
      userId,
      jobId,
      phone,
      verificationCode,
      verificationExpires: expiresAt,
      notificationMethod,
      notificationFrequency,
      verified: false,
      smsStatus: "pending", // Track SMS delivery status
      smsMessageId: null,
    });

    if (notificationMethod === "sms") {
      try {
        // Format phone number
        let formattedPhone = phone.replace(/\D/g, "");
        if (formattedPhone.startsWith("0")) {
          formattedPhone = `+251${formattedPhone.substring(1)}`;
        } else if (!formattedPhone.startsWith("+")) {
          formattedPhone = `+${formattedPhone}`;
        }

        // Afromessage API request
        const response = await axios.post(
          "https://api.afromessage.com/api/send",
          {
            to: formattedPhone,
            message: `Your verification code is: ${verificationCode}\nExpires in 24 hours.`,
            sender_id: process.env.AFROMESSAGE_SENDER_ID || "INFO",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.AFROMESSAGE_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Afromessage Response:", response.data);

        // Handle Afromessage's asynchronous response
        if (response.data.acknowledge === "success") {
          // Update subscription with message ID
          subscription.smsStatus = response.data.response.status.toLowerCase();
          subscription.smsMessageId = response.data.response.message_id;
          await subscription.save();

          // Consider the message as successfully queued
          return res.status(201).json({
            success: true,
            message:
              "Verification code is being sent. Please check your phone shortly.",
            subscriptionId: subscription._id,
            verificationRequired: true,
          });
        }

        throw new Error(
          response.data.response?.message || "Unknown error from Afromessage"
        );
      } catch (smsError) {
        console.error("Afromessage Error:", {
          message: smsError.message,
          response: smsError.response?.data,
        });

        // Update subscription with failure status
        subscription.smsStatus = "failed";
        await subscription.save();

        return res.status(502).json({
          success: false,
          message: "Failed to initiate SMS verification",
          details:
            process.env.NODE_ENV === "development"
              ? smsError.message
              : undefined,
        });
      }
    }

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully. Please verify your phone.",
      subscriptionId: subscription._id,
      verificationRequired: true,
    });
  } catch (error) {
    console.error("Subscription Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process subscription",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
export const verifyPhoneCode = async (req, res) => {
  const { code } = req.body;
  const userId = req.auth.userId;

  try {
    const subscription = await Subscription.findOne({
      userId,
      verificationCode: code,
    });

    if (!subscription) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code.",
      });
    }

    subscription.isPhoneVerified = true;
    subscription.verificationCode = null;
    await subscription.save();

    res.json({
      success: true,
      message: "Phone verified successfully. You will receive job alerts.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
