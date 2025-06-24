"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2, Eye } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Updated type with _id field included
type Submission = {
  _id: string;
  submissionType: string;
  paperTitle: string;
  authorName: string;
  coAuthorNames: string;
  presenter: string;
  correspondingAuthorEmail: string;
  mobileNumber: string;
  whatsappViber: string;
  linkedinUrl: string;
  facebookUrl: string;
  presentationCategory: string;
  presentationType: string;
  institutionName: string;
  department: string;
  designation: string;
  publicationRequired: string;
  howDidYouKnow: string;
  message: string;
  uploadedFile?: {
    fileName: string;
    filePath: string;
    fileSize: number;
  };
};

const CrudPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://cerada-new.onrender.com/api/submissions"
      );
      console.log("Fetched data:", response.data);
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://cerada-new.onrender.com/api/delete/submission/${id}`
      );
      
      // Refresh the data
      fetchData();
    } catch (error) {
      console.error("Error deleting submission:", error);
      
    }
  };

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      const response = await axios.get(
        `https://cerada-new.onrender.com/api/download/${filePath}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
     
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading submissions...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 px-5 sm:px-10 md:px-12 lg:px-5 py-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white">
          Submit Paper Details
        </h1>
        <Button asChild>
          <Link href="/form">Add User</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S Type</TableHead>
              <TableHead>Paper Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Co-Author</TableHead>
              <TableHead>Presenter</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>LinkedIn</TableHead>
              <TableHead>Facebook</TableHead>
              <TableHead>P Category</TableHead>
              <TableHead>P Type</TableHead>
              <TableHead>Institute</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Publication</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.submissionType}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {submission.paperTitle}
                </TableCell>
                <TableCell>{submission.authorName}</TableCell>
                <TableCell>{submission.coAuthorNames}</TableCell>
                <TableCell>{submission.presenter}</TableCell>
                <TableCell>{submission.correspondingAuthorEmail}</TableCell>
                <TableCell>{submission.mobileNumber}</TableCell>
                <TableCell>{submission.whatsappViber}</TableCell>
                <TableCell>
                  {submission.linkedinUrl && (
                    <a
                      href={submission.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  {submission.facebookUrl && (
                    <a
                      href={submission.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Facebook
                    </a>
                  )}
                </TableCell>
                <TableCell>{submission.presentationCategory}</TableCell>
                <TableCell>{submission.presentationType}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {submission.institutionName}
                </TableCell>
                <TableCell>{submission.department}</TableCell>
                <TableCell>{submission.designation}</TableCell>
                <TableCell>{submission.publicationRequired}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {submission.howDidYouKnow}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {submission.message}
                </TableCell>
                <TableCell>
                  {submission.uploadedFile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        downloadFile(
                          submission.uploadedFile!.filePath,
                          submission.uploadedFile!.fileName
                        )
                      }
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/update/${submission._id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the submission for &quot;{submission.paperTitle}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(submission._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CrudPage;
