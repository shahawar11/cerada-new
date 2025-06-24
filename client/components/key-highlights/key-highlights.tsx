import React from "react";
import {
  Users,
  Globe,
  Award,
  BookOpen,
  Network,
  Microscope,
  Brain,
  Leaf,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
export function KeyHighlightsGrid() {
  const highlights = [
    {
      icon: Globe,
      title: "Global Platform",
      description:
        "Collaboration among researchers, healthcare professionals, and academic leaders",
    },
    {
      icon: Microscope,
      title: "Multidisciplinary Focus",
      description:
        "Spanning life sciences, biotechnology, public health, environmental science",
    },
    {
      icon: Users,
      title: "Keynote Addresses",
      description:
        "By internationally renowned scientists, clinicians, and policy experts",
    },
    {
      icon: BookOpen,
      title: "Research Presentations",
      description: "Across diverse tracks with publication opportunities",
    },
    {
      icon: Network,
      title: "Networking Sessions",
      description:
        "Foster partnerships between academia, industry, and healthcare institutions",
    },
    {
      icon: Award,
      title: "Best Paper Awards",
      description: "Recognize outstanding contributions to the field",
    },
    {
      icon: Leaf,
      title: "Sustainability Focus",
      description:
        "Discussions on innovations for long-term global health impact",
    },
    {
      icon: Brain,
      title: "Workshops & Panels",
      description:
        "On emerging trends, challenges, and solutions in healthcare",
    },
  ];
  return (
    <section className="py-16 bg-pink-100 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          
          <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white">
            Key Highlights of ICLSMHA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes our conference a premier destination for
            healthcare and life sciences professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
