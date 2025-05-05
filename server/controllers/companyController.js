import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import { application } from "express";
import Subscription from "../models/Subscription.js";

import axios from "axios";

//register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const companyExist = await Company.findOne({ email });
    if (companyExist) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// company login

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });

    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Get company data

export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.json({
      success: false,
      messegae: error.message,
    });
  }
};

// pots a new job

// export const postJob = async (req, res) => {
//   const { title, description, location, category, salary, level, deadline } =
//     req.body;

//   const companyId = req.company._id;
//   try {
//     const newJob = await Job({
//       title,
//       description,
//       location,
//       category,
//       salary,
//       level,
//       companyId,
//       date: Date.now(),
//       deadline,
//     });

//     await newJob.save();
//     // send message to the subscribers
//     // from the Subscription model

//     res.json({
//       success: true,
//       newJob,
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

export const postJob = async (req, res) => {
  const { title, description, location, category, salary, level, deadline } =
    req.body;
  const companyId = req.company._id;

  try {
    // 1. Save the new job
    const newJob = new Job({
      title,
      description,
      location,
      category,
      salary,
      level,
      companyId,
      date: Date.now(),
      deadline,
    });

    await newJob.save();

    // Calculate the deadline date by adding the number of days to the current date
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + deadline); // Adds "deadline" days to the current date
    const formattedDeadline = deadlineDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const normalizedCategory = category.toLowerCase();
    // 2. Find all active, verified subscribers interested in this category
    const matchingSubscriptions = await Subscription.find({
      notificationMethod: "sms",
      isActive: true,
      isPhoneVerified: true,
      categories: { $in: [normalizedCategory] },
    });

    let successfulSMS = 0;
    let failedSMS = 0;

    // 3. Send Afromessage SMS to each subscriber
    for (const subscriber of matchingSubscriptions) {
      let formattedPhone = subscriber.phone.replace(/\D/g, "");
      if (formattedPhone.startsWith("0")) {
        formattedPhone = `+251${formattedPhone.slice(1)}`;
      } else if (!formattedPhone.startsWith("+")) {
        formattedPhone = `+${formattedPhone}`;
      }

      const message = `New Job Alert 📢\n${title} - ${location}\nCategory: ${category}\nApply before: ${formattedDeadline}.`;

      try {
        const response = await axios.post(
          "https://api.afromessage.com/api/send",
          {
            to: formattedPhone,
            message,
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
          subscriber.lastNotifiedAt = new Date();
          subscriber.smsStatus =
            response.data.response.status?.toLowerCase() || "sent";
          subscriber.smsMessageId = response.data.response.message_id || null;
          await subscriber.save();
          successfulSMS++;
        } else {
          console.error("Afromessage Rejected:", response.data);
          failedSMS++;
        }
      } catch (smsError) {
        console.error("Afromessage Error:", smsError.message);
        subscriber.smsStatus = "failed";
        await subscriber.save();
        failedSMS++;
      }
    }

    res.json({
      success: true,
      newJob,
      message: `${successfulSMS} SMS sent successfully, ${failedSMS} failed.`,
    });
  } catch (error) {
    console.error("Job posting failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get company job applicants

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    // Find Job application for the user and populate related data

    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

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

//Get companys posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    //TODO : Adding No of applicant info

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({
      success: true,
      jobsData: jobsData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Change job application status

export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    await JobApplication.findOneAndUpdate({ _id: id }, { status });

    return res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Chamge job visibility

export const changeJobVisibility = async (req, res) => {
  try {
    const companyId = req.company._id;

    const { id } = req.body;

    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    } else {
      res.json({
        success: false,
        message: "No such a job exist in the current company job list",
      });
    }

    await job.save();

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
