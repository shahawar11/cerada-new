// Backend Server Updates Required

// Import Submission model
import Submission from "../models/Submission.js";

// 1. Install required packages
// npm install multer

// 2. Update submissionController.js
export const updateSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Handle file upload if present
    if (req.file) {
      updateData.uploadedFile = {
        fileName: req.file.originalname,
        filePath: req.file.filename,
        fileSize: req.file.size,
        uploadedAt: new Date(),
      };
    }

    // Handle file removal
    if (req.body.removeFile === "true") {
      updateData.uploadedFile = undefined;
    }

    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found." });
    }

    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// 3. Update submissionRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
} from "../controller/submissionController.js";

const route = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only Word documents
  if (
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Word documents (.doc, .docx) are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit
  },
  fileFilter: fileFilter,
});

// Routes
route.post("/submission", upload.single("file"), createSubmission);
route.get("/submissions", getAllSubmissions);
route.get("/submission/:id", getSubmissionById);
route.put("/update/submission/:id", upload.single("file"), updateSubmission);
route.delete("/delete/submission/:id", deleteSubmission);

// File download route
route.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(process.cwd(), "uploads", filename);
  res.download(filepath);
});

export default route;

// 5. Update deleteSubmission function
export const deleteSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const submissionExist = await Submission.findById(id);

    if (!submissionExist) {
      return res.status(404).json({ message: "Submission not found." });
    }

    await Submission.findByIdAndDelete(id);
    res.status(200).json({ message: "Submission deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

console.log("Backend updates completed!");
