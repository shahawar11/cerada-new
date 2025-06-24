import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

function SubmissionDeadlines() {
  const deadlines = [
    { title: "Early Bird Registration", date: "31 Aug 2025" },
    { title: "Abstract Submission", date: "30 Sep 2025" },
    { title: "Full Paper Submission", date: "31 Oct 2025" },
    { title: "Final Registration", date: "30 Nov 2025" },
  ];
  return (
    <>
      <section className="py-16 bg-purple-200 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white">
              Submission Deadlines
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deadlines.map((deadline, index) => (
              <Card
                key={index}
                className="relative text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader className="absolute top-0 right-0 left-0 bg-cyan-200 rounded-t-lg">
                  <CardTitle className="text-lg py-1.5 ">
                    {deadline.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white rounded-b-lg pt-8">
                  <p className="text-2xl font-bold text-cyan-600">
                    {deadline.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
              View Submission Guidelines
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SubmissionDeadlines;
