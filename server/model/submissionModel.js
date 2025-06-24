import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    // Submission Type
    submissionType: {
      type: String,
      required: true,
      enum: ["Abstract", "Full paper"],
    },

    // Title of the Paper
    paperTitle: {
      type: String,
      required: true,
      trim: true,
    },

    // Author Name
    authorName: {
      type: String,
      required: true,
      trim: true,
    },

    // Co-author Names
    coAuthorNames: {
      type: String,
      required: false,
      trim: true,
    },

    // Who will present the paper during conference
    presenter: {
      type: String,
      required: true,
      trim: true,
    },

    // Corresponding Author Email
    correspondingAuthorEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    // Mobile Number (With Country Code)
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // WhatsApp/Viber Number (With Country Code)
    whatsappViber: {
      type: String,
      required: false,
      trim: true,
    },

    // LinkedIn URL
    linkedinUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // Allow empty values
          return /^https?:\/\/(www\.)?linkedin\.com\/.*/.test(v);
        },
        message: "Please enter a valid LinkedIn URL",
      },
    },

    // Facebook URL
    facebookUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // Allow empty values
          return /^https?:\/\/(www\.)?facebook\.com\/.*/.test(v);
        },
        message: "Please enter a valid Facebook URL",
      },
    },

    // Presentation Category
    presentationCategory: {
      type: String,
      required: true,
      enum: ["Oral", "Poster"],
    },

    // Presentation Type
    presentationType: {
      type: String,
      required: true,
      enum: ["Virtual", "Physical"],
    },

    // University/Institution Name
    institutionName: {
      type: String,
      required: true,
      trim: true,
    },

    // Department
    department: {
      type: String,
      required: true,
      trim: true,
    },

    // Designation
    designation: {
      type: String,
      required: true,
      trim: true,
    },

    // Publication Required
    publicationRequired: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },

    // File Upload (store file path or filename)
    uploadedFile: {
      fileName: {
        type: String,
        required: false,
      },
      filePath: {
        type: String,
        required: false,
      },
      fileSize: {
        type: Number,
        required: false,
      },
      uploadedAt: {
        type: Date,
        required: false,
      },
    },

    // How did you know about the conference
    howDidYouKnow: {
      type: String,
      required: false,
      trim: true,
    },

    // Message
    message: {
      type: String,
      required: false,
      trim: true,
    },

   
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

// Create indexes for better query performance
submissionSchema.index({ correspondingAuthorEmail: 1 });
submissionSchema.index({ submittedAt: -1 });
submissionSchema.index({ status: 1 });

// Pre-save middleware to ensure file validation
submissionSchema.pre("save", function (next) {
  // Additional validation for file upload if needed
  if (this.uploadedFile && this.uploadedFile.fileSize) {
    const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
    if (this.uploadedFile.fileSize > maxSizeInBytes) {
      const error = new Error("File size must be less than 3MB");
      return next(error);
    }
  }
  next();
});

export default mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema);
