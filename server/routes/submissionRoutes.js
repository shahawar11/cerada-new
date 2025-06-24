import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  create,
  deleteSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  downloadFile,
} from "../controller/submissionController.js";

const route = express.Router();

// Ensure uploads directory exists
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only Word documents (.doc, .docx) are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit
  },
});

// Routes
route.post("/submission", upload.single("paper"), create);
route.get("/submissions", getAllSubmissions);
route.get("/submission/:id", getSubmissionById);
route.put("/update/submission/:id", upload.single("paper"), updateSubmission);
route.delete("/delete/submission/:id", deleteSubmission);
route.get("/download/:filePath", downloadFile);

export default route;
