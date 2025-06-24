"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Upload, X, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Link from "next/link";

// Country codes with flags
const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "+66", country: "TH", flag: "🇹🇭", name: "Thailand" },
  { code: "+84", country: "VN", flag: "🇻🇳", name: "Vietnam" },
  { code: "+63", country: "PH", flag: "🇵🇭", name: "Philippines" },
  { code: "+62", country: "ID", flag: "🇮🇩", name: "Indonesia" },
];

interface FormData {
  submissionType: string;
  paperTitle: string;
  authorName: string;
  coAuthorNames?: string;
  presenter: string;
  correspondingAuthorEmail: string;
  countryCode: string;
  mobileNumber: string;
  whatsappViber?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  presentationCategory: string;
  presentationType: string;
  institutionName: string;
  department: string;
  designation: string;
  publicationRequired: string;
  howDidYouKnow?: string;
  message?: string;
}

export default function UpdateSubmissionForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingFile, setExistingFile] = useState<{
    fileName: string;
    filePath: string;
    fileSize: number;
  } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    submissionType: "",
    paperTitle: "",
    authorName: "",
    coAuthorNames: "",
    presenter: "",
    correspondingAuthorEmail: "",
    countryCode: "",
    mobileNumber: "",
    whatsappViber: "",
    linkedinUrl: "",
    facebookUrl: "",
    presentationCategory: "",
    presentationType: "",
    institutionName: "",
    department: "",
    designation: "",
    publicationRequired: "",
    howDidYouKnow: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData & { file: string }>>(
    {}
  );

  // Fetch existing submission data
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(
          `https://cerada-new.onrender.com/api/submission/${id}`
        );
        const data = response.data;

        // Extract country code from mobile number
        const mobileNumber = data.mobileNumber || "";
        let countryCode = "";
        let phoneNumber = mobileNumber;

        // Try to extract country code
        const countryCodeMatch = countryCodes.find((cc) =>
          mobileNumber.startsWith(cc.code)
        );
        if (countryCodeMatch) {
          countryCode = countryCodeMatch.code;
          phoneNumber = mobileNumber.substring(countryCode.length);
        }

        setFormData({
          submissionType: data.submissionType || "",
          paperTitle: data.paperTitle || "",
          authorName: data.authorName || "",
          coAuthorNames: data.coAuthorNames || "",
          presenter: data.presenter || "",
          correspondingAuthorEmail: data.correspondingAuthorEmail || "",
          countryCode: countryCode,
          mobileNumber: phoneNumber,
          whatsappViber: data.whatsappViber || "",
          linkedinUrl: data.linkedinUrl || "",
          facebookUrl: data.facebookUrl || "",
          presentationCategory: data.presentationCategory || "",
          presentationType: data.presentationType || "",
          institutionName: data.institutionName || "",
          department: data.department || "",
          designation: data.designation || "",
          publicationRequired: data.publicationRequired || "",
          howDidYouKnow: data.howDidYouKnow || "",
          message: data.message || "",
        });

        if (data.uploadedFile) {
          setExistingFile(data.uploadedFile);
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSubmission();
    }
  }, [id]);

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          file: "Only Word documents (.doc, .docx) are allowed",
        }));
        return;
      }

      // Validate file size (3MB = 3 * 1024 * 1024 bytes)
      if (file.size > 3 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 3MB",
        }));
        return;
      }

      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setErrors((prev) => ({ ...prev, file: "" }));
  };

  const removeExistingFile = () => {
    setExistingFile(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData & { file: string }> = {};

    // Required field validation
    if (!formData.submissionType)
      newErrors.submissionType = "Submission type is required";
    if (!formData.paperTitle) newErrors.paperTitle = "Paper title is required";
    if (!formData.authorName) newErrors.authorName = "Author name is required";
    if (!formData.presenter) newErrors.presenter = "Presenter name is required";
    if (!formData.correspondingAuthorEmail)
      newErrors.correspondingAuthorEmail = "Email is required";
    if (!formData.countryCode)
      newErrors.countryCode = "Country code is required";
    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile number is required";
    if (!formData.presentationCategory)
      newErrors.presentationCategory = "Presentation category is required";
    if (!formData.presentationType)
      newErrors.presentationType = "Presentation type is required";
    if (!formData.institutionName)
      newErrors.institutionName = "Institution name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.publicationRequired)
      newErrors.publicationRequired = "Publication preference is required";

    // Email validation
    if (
      formData.correspondingAuthorEmail &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        formData.correspondingAuthorEmail
      )
    ) {
      newErrors.correspondingAuthorEmail = "Please enter a valid email";
    }

    // LinkedIn URL validation
    if (
      formData.linkedinUrl &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.*/.test(formData.linkedinUrl)
    ) {
      newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
    }

    // Facebook URL validation
    if (
      formData.facebookUrl &&
      !/^https?:\/\/(www\.)?facebook\.com\/.*/.test(formData.facebookUrl)
    ) {
      newErrors.facebookUrl = "Please enter a valid Facebook URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const submitData = new FormData();

      // Combine country code and mobile number
      const fullMobileNumber = `${formData.countryCode}${formData.mobileNumber}`;

      // Append all form data EXCEPT countryCode and mobileNumber
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "countryCode" && key !== "mobileNumber" && value) {
          submitData.append(key, value);
        }
      });

      // Append the combined mobile number as a single field
      submitData.append("mobileNumber", fullMobileNumber);

      // Append file if selected (using "paper" to match backend)
      if (selectedFile) {
        submitData.append("paper", selectedFile);
      }

      // If existing file was removed, indicate that
      if (!existingFile && !selectedFile) {
        submitData.append("removeFile", "true");
      }

      await axios.put(
        `https://cerada-new.onrender.com/api/update/submission/${id}`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Submission updated successfully");
      setSubmitStatus("success");

      // Redirect to CRUD page after successful update
      setTimeout(() => {
        router.push("/crud");
      }, 2000);
    } catch (error: unknown) {
      console.log(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submission data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/crud">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Submissions
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Update Conference Paper Submission
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Update your abstract or full paper submission details
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitStatus === "success" && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your submission has been successfully updated! Redirecting to
                  submissions list...
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  There was an error updating your submission. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Submission Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">
                      Submission Type *
                    </Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        handleInputChange("submissionType", value)
                      }
                      value={formData.submissionType}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Abstract" id="abstract" />
                        <Label htmlFor="abstract">Abstract</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Full paper" id="fullpaper" />
                        <Label htmlFor="fullpaper">Full Paper</Label>
                      </div>
                    </RadioGroup>
                    {errors.submissionType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.submissionType}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="paperTitle"
                      className="text-base font-medium"
                    >
                      Paper Title *
                    </Label>
                    <Input
                      id="paperTitle"
                      value={formData.paperTitle}
                      onChange={(e) =>
                        handleInputChange("paperTitle", e.target.value)
                      }
                      className="mt-1"
                      placeholder="Enter your paper title"
                    />
                    {errors.paperTitle && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.paperTitle}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Author Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Author Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="authorName"
                        className="text-base font-medium"
                      >
                        Author Name *
                      </Label>
                      <Input
                        id="authorName"
                        value={formData.authorName}
                        onChange={(e) =>
                          handleInputChange("authorName", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Enter author name"
                      />
                      {errors.authorName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.authorName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="coAuthorNames"
                        className="text-base font-medium"
                      >
                        Co-author Names
                      </Label>
                      <Input
                        id="coAuthorNames"
                        value={formData.coAuthorNames || ""}
                        onChange={(e) =>
                          handleInputChange("coAuthorNames", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Enter co-author names (optional)"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="presenter"
                        className="text-base font-medium"
                      >
                        Presenter *
                      </Label>
                      <Input
                        id="presenter"
                        value={formData.presenter}
                        onChange={(e) =>
                          handleInputChange("presenter", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Who will present the paper?"
                      />
                      {errors.presenter && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.presenter}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="correspondingAuthorEmail"
                        className="text-base font-medium"
                      >
                        Corresponding Author Email *
                      </Label>
                      <Input
                        id="correspondingAuthorEmail"
                        type="email"
                        value={formData.correspondingAuthorEmail}
                        onChange={(e) =>
                          handleInputChange(
                            "correspondingAuthorEmail",
                            e.target.value
                          )
                        }
                        className="mt-1"
                        placeholder="Enter email address"
                      />
                      {errors.correspondingAuthorEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.correspondingAuthorEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">
                        Mobile Number *
                      </Label>
                      <div className="flex gap-2 mt-1">
                        <Select
                          onValueChange={(value) =>
                            handleInputChange("countryCode", value)
                          }
                          value={formData.countryCode}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country, index) => (
                              <SelectItem
                                key={`${country.code}-${country.country}-${index}`}
                                value={country.code}
                              >
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.code}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          value={formData.mobileNumber}
                          onChange={(e) =>
                            handleInputChange("mobileNumber", e.target.value)
                          }
                          className="flex-1"
                          placeholder="Enter mobile number"
                        />
                      </div>
                      {errors.countryCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.countryCode}
                        </p>
                      )}
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="whatsappViber"
                        className="text-base font-medium"
                      >
                        WhatsApp/Viber Number
                      </Label>
                      <Input
                        id="whatsappViber"
                        value={formData.whatsappViber || ""}
                        onChange={(e) =>
                          handleInputChange("whatsappViber", e.target.value)
                        }
                        className="mt-1"
                        placeholder="e.g., +1-234-567-8900 (optional)"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="linkedinUrl"
                        className="text-base font-medium"
                      >
                        LinkedIn URL
                      </Label>
                      <Input
                        id="linkedinUrl"
                        value={formData.linkedinUrl || ""}
                        onChange={(e) =>
                          handleInputChange("linkedinUrl", e.target.value)
                        }
                        className="mt-1"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                      {errors.linkedinUrl && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.linkedinUrl}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="facebookUrl"
                        className="text-base font-medium"
                      >
                        Facebook URL
                      </Label>
                      <Input
                        id="facebookUrl"
                        value={formData.facebookUrl || ""}
                        onChange={(e) =>
                          handleInputChange("facebookUrl", e.target.value)
                        }
                        className="mt-1"
                        placeholder="https://facebook.com/yourprofile"
                      />
                      {errors.facebookUrl && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.facebookUrl}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Presentation Details */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Presentation Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">
                        Presentation Category *
                      </Label>
                      <RadioGroup
                        onValueChange={(value) =>
                          handleInputChange("presentationCategory", value)
                        }
                        value={formData.presentationCategory}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Oral" id="oral" />
                          <Label htmlFor="oral">Oral</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Poster" id="poster" />
                          <Label htmlFor="poster">Poster</Label>
                        </div>
                      </RadioGroup>
                      {errors.presentationCategory && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.presentationCategory}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-base font-medium">
                        Presentation Type *
                      </Label>
                      <RadioGroup
                        onValueChange={(value) =>
                          handleInputChange("presentationType", value)
                        }
                        value={formData.presentationType}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Virtual" id="virtual" />
                          <Label htmlFor="virtual">Virtual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Physical" id="physical" />
                          <Label htmlFor="physical">Physical</Label>
                        </div>
                      </RadioGroup>
                      {errors.presentationType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.presentationType}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Institution Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Institution Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="institutionName"
                        className="text-base font-medium"
                      >
                        University/Institution Name *
                      </Label>
                      <Input
                        id="institutionName"
                        value={formData.institutionName}
                        onChange={(e) =>
                          handleInputChange("institutionName", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Enter your institution name"
                      />
                      {errors.institutionName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.institutionName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="department"
                        className="text-base font-medium"
                      >
                        Department *
                      </Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Enter your department"
                      />
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.department}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="designation"
                        className="text-base font-medium"
                      >
                        Designation *
                      </Label>
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) =>
                          handleInputChange("designation", e.target.value)
                        }
                        className="mt-1"
                        placeholder="e.g., Professor, Student, Researcher"
                      />
                      {errors.designation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.designation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Publication and Additional Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Additional Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">
                        Publication Required *
                      </Label>
                      <RadioGroup
                        onValueChange={(value) =>
                          handleInputChange("publicationRequired", value)
                        }
                        value={formData.publicationRequired}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="pubyes" />
                          <Label htmlFor="pubyes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="pubno" />
                          <Label htmlFor="pubno">No</Label>
                        </div>
                      </RadioGroup>
                      {errors.publicationRequired && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.publicationRequired}
                        </p>
                      )}
                    </div>

                    {/* File Upload Section */}
                    <div>
                      <Label className="text-base font-medium">
                        File Upload
                      </Label>
                      <p className="text-sm text-gray-600 mb-2">
                        Accepted file format: Word (.doc, .docx). File size
                        should be less than 3MB.
                      </p>

                      {/* Show existing file if available */}
                      {existingFile && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Upload className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium text-blue-700">
                                Current file: {existingFile.fileName}
                              </span>
                              <span className="text-xs text-blue-600">
                                (
                                {(existingFile.fileSize / 1024 / 1024).toFixed(
                                  2
                                )}{" "}
                                MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeExistingFile}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {selectedFile ? (
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                            <div className="flex items-center gap-2">
                              <Upload className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium">
                                {selectedFile.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeFile}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                              Click to upload or drag and drop
                            </p>
                            <Input
                              type="file"
                              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={handleFileChange}
                              className="hidden"
                              id="file-upload"
                            />
                            <Label
                              htmlFor="file-upload"
                              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Choose File
                            </Label>
                          </div>
                        )}
                      </div>
                      {errors.file && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.file}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="howDidYouKnow"
                        className="text-base font-medium"
                      >
                        How did you know about the conference?
                      </Label>
                      <Textarea
                        id="howDidYouKnow"
                        value={formData.howDidYouKnow || ""}
                        onChange={(e) =>
                          handleInputChange("howDidYouKnow", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Tell us how you heard about this conference (optional)"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-base font-medium"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message || ""}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Any additional message or comments (optional)"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? "Updating..." : "Update Submission"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
