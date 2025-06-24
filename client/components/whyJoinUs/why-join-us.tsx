import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function WhyJoinUs() {
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Join us at ICLSMHA-2026?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Engage with Experts",
                description:
                  "Connect with leading researchers, healthcare professionals and industry pioneers from around the globe.",
              },
              {
                title: "Explore Cutting-Edge Research",
                description:
                  "Discover the latest breakthroughs and innovative approaches in life sciences and multidisciplinary healthcare.",
              },
              {
                title: "Foster Collaborations",
                description:
                  "Build valuable partnerships and networks that can drive your research, clinical practice or business forward.",
              },
              {
                title: "Participate in Dynamic Sessions",
                description:
                  "Experience a rich program featuring plenaries, workshops, panel discussions and poster presentations.",
              },
              {
                title: "Shape the Future of Healthcare",
                description:
                  "Contribute to meaningful conversations that influence policy, practice, and global health outcomes.",
              },
              {
                title: "Experience Kuala Lumpur",
                description:
                  "Enjoy the cultural richness and hospitality of Malaysia, an ideal hub for international collaboration.",
              },
            ].map((reason, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 text-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyJoinUs;
