import express from "express";

import {
  loginCompany,
  registerCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeJobVisibility,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import protectCompany from "../middleware/authMiddleware.js";

const router = express.Router();

//Register a new company
router.post("/register", upload.single("image"), registerCompany);

//Company login
router.post("/login", loginCompany);

//Get company data

router.get("/", protectCompany, getCompanyData);

// post a new job

router.post("/post-job", protectCompany, postJob);

//Get applicants data of a company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

//Get company job list
router.get("/jobs", protectCompany, getCompanyPostedJobs);

//chamge job application status
router.post("/job-status", protectCompany, changeJobApplicationStatus);

//change application visibility

router.post("/job-visibility", protectCompany, changeJobVisibility);

export default router;
