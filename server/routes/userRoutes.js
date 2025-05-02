import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplication,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

//Get user data

router.get("/user", getUserData);

//POST apply for a job

router.post("/apply", applyForJob);

// GET appllied job data

router.get("/application", getUserJobApplication);

//UPDATE user resume

router.put("/update-resume", upload.single("resume"), updateUserResume);

export default router;
