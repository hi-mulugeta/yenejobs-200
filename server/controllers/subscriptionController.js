import Subscription from "../models/Subscription.js";
import axios from "axios";

// Updated controller: subscribe to job alerts by category

export const subscribeToJobAlerts = async (req, res) => {
  const { categories, phone, notificationMethod, notificationFrequency } =
    req.body;
  const userId = req.auth.userId;

  try {
    // Sanity check: categories must be a non-empty array of strings
    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Categories must be a non-empty array.",
      });
    }

    // Normalize categories
    const normalizedCategories = [
      ...new Set(categories.map((c) => c.trim().toLowerCase())),
    ];

    // Check if a subscription already exists for this user and phone
    let subscription = await Subscription.findOne({ userId, phone });

    let verificationCode = null;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (subscription) {
      // Add new categories
      const newCategories = normalizedCategories.filter(
        (cat) => !subscription.categories.includes(cat)
      );

      if (newCategories.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Already subscribed to these categories.",
        });
      }

      subscription.categories.push(...newCategories);

      // Generate a new code if phone is not verified
      if (!subscription.isPhoneVerified) {
        verificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        subscription.verificationCode = verificationCode;
        subscription.verificationExpires = expiresAt;
      }
    } else {
      // Create a new subscription with verification code
      verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      subscription = new Subscription({
        userId,
        phone,
        categories: normalizedCategories,
        verificationCode,
        verificationExpires: expiresAt,
        notificationMethod,
        notificationFrequency,
        isPhoneVerified: false,
        smsStatus: "pending",
        smsMessageId: null,
      });
    }

    // Format phone number for Afromessage
    // Normalize and format phone number
    let formattedPhone = phone.replace(/\D/g, ""); // Remove all non-digits

    if (
      formattedPhone.startsWith("0") &&
      formattedPhone.length === 10 &&
      /^09[0-9]{8}$/.test(formattedPhone)
    ) {
      formattedPhone = "+251" + formattedPhone.substring(1);
    } else if (
      formattedPhone.length === 9 &&
      /^9[0-9]{8}$/.test(formattedPhone)
    ) {
      formattedPhone = "+251" + formattedPhone;
    } else if (
      formattedPhone.startsWith("2519") &&
      formattedPhone.length === 12
    ) {
      formattedPhone = "+" + formattedPhone;
    } else if (
      formattedPhone.startsWith("+2519") &&
      formattedPhone.length === 13
    ) {
      formattedPhone = formattedPhone;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Ethiopian mobile number format.",
      });
    }
    // Send SMS verification only if needed
    if (notificationMethod === "sms" && !subscription.isPhoneVerified) {
      try {
        const response = await axios.post(
          "https://api.afromessage.com/api/send",
          {
            to: formattedPhone,
            message: `Your verification code is: ${subscription.verificationCode}\nExpires in 24 hours.`,
            sender_id: process.env.AFROMESSAGE_SENDER_ID || "INFO",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.AFROMESSAGE_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.acknowledge === "success") {
          subscription.smsStatus = response.data.response.status.toLowerCase();
          subscription.smsMessageId = response.data.response.message_id;
          await subscription.save();

          return res.status(201).json({
            success: true,
            message:
              "Verification code is being sent. Please check your phone.",
            subscriptionId: subscription._id,
            verificationRequired: true,
          });
        }

        throw new Error(
          response.data.response?.message || "Unknown error from Afromessage"
        );
      } catch (smsError) {
        console.error("Afromessage Error:", smsError);
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

    await subscription.save();
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

// Verification logic (unchanged except minor refactor)
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
    subscription.isActive = true;
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
