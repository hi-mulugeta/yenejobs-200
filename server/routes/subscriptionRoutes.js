import express from "express";
import {
  subscribeToJobAlerts,
  verifyPhoneCode,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/", subscribeToJobAlerts);
router.post("/verify", verifyPhoneCode);

export default router;
