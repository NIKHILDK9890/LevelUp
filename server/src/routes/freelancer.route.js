import express from "express";
import {
  register,
  login,
  getFreelancerCount,
} from "../controllers/freelancer/freelancer.auth.js";
import { freelancerAuthMiddleware } from "../middlewares/freelancerAuthToken.js";
import {
  contentPost,
  getPost,
  likePost,
  getContentCount,
  getTotalLikes,
} from "../controllers/freelancer/freelancer.content.js";
import {
  getFreelancerData,
  getFreelancerInformation,
  updateFreelancerInformation,
} from "../controllers/freelancer/freelancer.information.js";
import { upload } from "../middlewares/upload.js";
import { applyJob, getJob } from "../controllers/freelancer/freelancer.jobs.js";
import {
  getJobCount,
  getTotalApplications,
} from "../controllers/client/client.job.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getfreelancercount", getFreelancerCount);
router.patch(
  "/information",
  freelancerAuthMiddleware,
  upload.single("profilePhoto"),
  updateFreelancerInformation
);
router.get("/information/:userId", getFreelancerInformation);
router.get("/data/:userId", getFreelancerData);
router.post(
  "/content",
  freelancerAuthMiddleware,
  upload.single("image"),
  contentPost
);
router.get("/content", getPost);
router.patch("/content/:id/like", freelancerAuthMiddleware, likePost);
router.get("/contentcount", getContentCount);
router.get("/likescount", getTotalLikes);
router.get("/jobs", getJob);
router.get("/jobcount", getJobCount);
router.patch("/job/:id/apply", freelancerAuthMiddleware, applyJob);

export default router;
