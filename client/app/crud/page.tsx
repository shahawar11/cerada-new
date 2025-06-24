"use client";
import React, { useEffect, useState } from "react";
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
};

const CrudPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/submissions"
        );
        console.log("Fetched data:", response.data); // ✅ Debug log
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error while fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          <Link href="/form">Add User</Link></Button>
      </div>

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell>{submission.submissionType}</TableCell>
              <TableCell>{submission.paperTitle}</TableCell>
              <TableCell>{submission.authorName}</TableCell>
              <TableCell>{submission.coAuthorNames}</TableCell>
              <TableCell>{submission.presenter}</TableCell>
              <TableCell>{submission.correspondingAuthorEmail}</TableCell>
              <TableCell>{submission.mobileNumber}</TableCell>
              <TableCell>{submission.whatsappViber}</TableCell>
              <TableCell>{submission.linkedinUrl}</TableCell>
              <TableCell>{submission.facebookUrl}</TableCell>
              <TableCell>{submission.presentationCategory}</TableCell>
              <TableCell>{submission.presentationType}</TableCell>
              <TableCell>{submission.institutionName}</TableCell>
              <TableCell>{submission.department}</TableCell>
              <TableCell>{submission.designation}</TableCell>
              <TableCell>{submission.publicationRequired}</TableCell>
              <TableCell>{submission.howDidYouKnow}</TableCell>
              <TableCell>{submission.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CrudPage;
