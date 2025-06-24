"use client";

import type React from "react";

import { useState } from "react";
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
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

interface FormData {
  submissionType: string;
  paperTitle: string;
  authorName: string;
  coAuthorNames?: string;
  presenter: string;
  correspondingAuthorEmail: string;
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

export default function ConferenceSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState<FormData>({
    submissionType: "",
    paperTitle: "",
    authorName: "",
    coAuthorNames: "",
    presenter: "",
    correspondingAuthorEmail: "",
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

  const [errors, setErrors] = useState<Partial<FormData>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required field validation
    if (!formData.submissionType)
      newErrors.submissionType = "Submission type is required";
    if (!formData.paperTitle) newErrors.paperTitle = "Paper title is required";
    if (!formData.authorName) newErrors.authorName = "Author name is required";
    if (!formData.presenter) newErrors.presenter = "Presenter name is required";
    if (!formData.correspondingAuthorEmail)
      newErrors.correspondingAuthorEmail = "Email is required";
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

    await axios
      .post("http://localhost:8000/api/submission", formData)
      .then(() => {
        console.log("Details submitted successfully");
        setSubmitStatus("success");
        // Reset form
        setFormData({
          submissionType: "",
          paperTitle: "",
          authorName: "",
          coAuthorNames: "",
          presenter: "",
          correspondingAuthorEmail: "",
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
      })
      .catch((error) => {
        console.log(error);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Conference Paper Submission
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Submit your abstract or full paper for the upcoming conference
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitStatus === "success" && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your submission has been successfully submitted! We&apos;ll review
                  it and get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  There was an error submitting your form. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Submission Details */}
              <div className="space-y-6">
                <div>
                  

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
                      <Label
                        htmlFor="mobileNumber"
                        className="text-base font-medium"
                      >
                        Mobile Number (With Country Code) *
                      </Label>
                      <Input
                        id="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          handleInputChange("mobileNumber", e.target.value)
                        }
                        className="mt-1"
                        placeholder="e.g., +1-234-567-8900"
                      />
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
                    {isSubmitting ? "Submitting..." : "Submit Paper"}
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
