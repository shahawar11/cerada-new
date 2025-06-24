import Submission from "../model/submissionModel.js";
import path from "path";
import fs from "fs";

export const create = async (req, res) => {
  try {
    // Handle file upload
    let uploadedFile = null;
    if (req.file) {
      uploadedFile = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        uploadedAt: new Date(),
      };
    }

    // Create submission data
    const submissionData = {
      ...req.body,
      uploadedFile: uploadedFile,
    };

    const newSubmission = new Submission(submissionData);
    const { correspondingAuthorEmail } = newSubmission;

    const submissionExist = await Submission.findOne({
      correspondingAuthorEmail,
    });
    if (submissionExist) {
      return res.status(400).json({ message: "Submission already exists." });
    }

    const savedData = await newSubmission.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllSubmissions = async (req, res) => {
  try {
    const submissionData = await Submission.find();
    if (!submissionData || submissionData.length === 0) {
      return res.status(404).json({ message: "Submission data not found." });
    }
    res.status(200).json(submissionData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getSubmissionById = async (req, res) => {
  try {
    const id = req.params.id;
    const submissionExist = await Submission.findById(id);
    if (!submissionExist) {
      return res.status(404).json({ message: "Submission not found." });
    }
    res.status(200).json(submissionExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const submissionExist = await Submission.findById(id);

    if (!submissionExist) {
      return res.status(404).json({ message: "Submission not found." });
    }

    // Handle file upload
    let uploadedFile = submissionExist.uploadedFile;
    if (req.file) {
      // Delete old file if exists
      if (uploadedFile && uploadedFile.filePath) {
        try {
          fs.unlinkSync(uploadedFile.filePath);
        } catch (err) {
          console.log("Error deleting old file:", err);
        }
      }

      uploadedFile = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        uploadedAt: new Date(),
      };
    }

    const updateData = {
      ...req.body,
      uploadedFile: uploadedFile,
    };

    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const submissionExist = await Submission.findById(id);

    if (!submissionExist) {
      return res.status(404).json({ message: "Submission not found." });
    }

    // Delete associated file if exists
    if (submissionExist.uploadedFile && submissionExist.uploadedFile.filePath) {
      try {
        fs.unlinkSync(submissionExist.uploadedFile.filePath);
      } catch (err) {
        console.log("Error deleting file:", err);
      }
    }

    await Submission.findByIdAndDelete(id);
    res.status(200).json({ message: "Submission deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const filePath = req.params.filePath;
    const fullPath = path.join(process.cwd(), "uploads", filePath);

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: "File not found." });
    }

    res.download(fullPath);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
