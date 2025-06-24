import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  GraduationCap,
  Stethoscope,
  BookOpen,
  Building2,
  Landmark,
  Users,
  Laptop,
} from "lucide-react";

function WhoCanAttend() {
  return (
    <>
      <section className="py-16 bg-purple-100 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white">
              Who Can Attend ICLSMHA-2026?
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              The conference is open to a wide spectrum of participants from
              academia, research, healthcare and industry, fostering diverse
              interdisciplinary dialogue and collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Researchers & Academicians",
                description:
                  "From life sciences, psychology, public health, education and healthcare disciplines",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Stethoscope,
                title: "Medical & Healthcare Professionals",
                description:
                  "Including physicians, nurses, therapists, psychologists, mental health counselors",
                color: "from-teal-500 to-teal-600",
              },
              {
                icon: BookOpen,
                title: "University Students & Scholars",
                description:
                  "At undergraduate, postgraduate, and doctoral levels pursuing studies in relevant fields",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Building2,
                title: "Industry Professionals",
                description:
                  "From biotechnology, pharmaceuticals, digital health, mental health tech and medical devices",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Landmark,
                title: "Policy Makers & NGO Representatives",
                description:
                  "Engaged in health and wellness advocacy, development programs and public health initiatives",
                color: "from-red-500 to-red-600",
              },
              {
                icon: Users,
                title: "Educators & Social Workers",
                description:
                  "Contributing to health awareness, behavioral interventions and community engagement",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Laptop,
                title: "Technology Experts & Innovators",
                description:
                  "Working in healthcare AI, telemedicine, wearable tech and bioinformatics",
                color: "from-pink-500 to-pink-600",
              },
            ].map((attendee, index) => {
              const IconComponent = attendee.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${attendee.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {attendee.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {attendee.description}
                    </p>
                    <div
                      className={`mt-6 h-1 bg-gradient-to-r ${attendee.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                    ></div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Join Our Global Community
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Connect with like-minded professionals, share your expertise,
                and contribute to advancing healthcare worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Register Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-blue-600 hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhoCanAttend;
