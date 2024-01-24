import express from "express";
import {
  register,
  login,
  getClientCount,
} from "../controllers/client/client.auth.js";
import {
  getJob,
  getJobCount,
  likePost,
  postJob,
  getTotalApplications,
} from "../controllers/client/client.job.js";
import { clientAuthMiddleware } from "../middlewares/clientAuthToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/clientccount", getClientCount);
router.patch("/content/:id/like", clientAuthMiddleware, likePost);
router.post("/job", clientAuthMiddleware, postJob);
router.get("/jobsById/:id", getJob);
router.get("/jobcount/", getJobCount);
router.get("/applicantcount", getTotalApplications);
export default router;
