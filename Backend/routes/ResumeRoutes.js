import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createReasume,
  deleteReasume,
  getPublicResumeById,
  getResumeById,
  updateResume
} from "../controllers/ResumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

resumeRouter.post(
  "/create",
  protect,
  upload.none(),      // ✅ THIS IS REQUIRED
  createReasume
);

resumeRouter.put(
  "/update",
  protect,                // ✅ FIRST auth
  upload.single("image"), // ✅ THEN multer
  updateResume
);
resumeRouter.delete("/delete/:resumeId", protect, deleteReasume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId",  getPublicResumeById);

export default resumeRouter;
