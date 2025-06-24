import express from "express";
import multer from "multer";
import {
  create,
  deleteSubmission,
  getAllSubmissions,
  getSubmissionById,
} from "../controller/submissionController.js";

const route = express.Router();

// 1️⃣ Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Make sure this folder exists in root of server
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 2️⃣ Routes
route.post("/submission", upload.single("paper"), create); // Replace "paper" if your <input name="..." /> is different
route.get("/submissions", getAllSubmissions);
route.get("/submission/:id", getSubmissionById);
route.delete("/delete/submission/:id", deleteSubmission);

export default route;
