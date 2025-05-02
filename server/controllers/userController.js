// Get use data

import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import Job from "../models/Job.js"; // Import the Job model
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.json({ success: false, message: "user not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// apply for a job

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({
      jobId,
      userId,
    });
    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already applied" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({
      success: true,
      message: "Applied successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//Get user applied applications

export const getUserJobApplication = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();
    if (!applications) {
      return res.json({
        success: false,
        message: "No Job application found for the current user",
      });
    }

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//update user profile resume

// export const updateUserResume = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const resumeFile = req.file;
//     const userData = await User.findById(userId);

//     if (resumeFile) {
//       const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);

//       userData.resume = resumeUpload.secure_url;
//     }

//     await userData.save();
//     res.json({ success: true, message: "resume updated successfully" });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId; // double check this is a string!
    const resumeFile = req.file;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is missing" });
    }

    const userData = await User.findById(userId.toString());

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Resume file is missing" });
    }

    await userData.save();
    res.json({ success: true, message: "Resume updated successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
