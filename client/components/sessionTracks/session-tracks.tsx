import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Pill,
  Bug,
  Microscope,
  Laptop,
  Hospital,
  BarChart3,
  Globe,
  Sprout,
  Dna,
  Camera,
  Wrench,
  Brain,
  Shield,
  Baby,
  Activity,
  Cross,
} from "lucide-react";

function SessionTracks() {
  const sessionTracks = [
    "Pharmacology and Toxicology",
    "COVID-19",
    "Emerging Frontiers in Life Sciences and Cross-Disciplinary Innovation",
    "Smart Technologies and Digital Innovation in Healthcare and Life Sciences",
    "Healthcare and Medicine: A Multidisciplinary Perspective",
    "Public Health, Policy and Epidemiology",
    "Health Impacts of Climate and Environmental Change",
    "Food Security, Nutrition and Sustainable Agriculture",
    "Regenerative and Stem Cell Therapies",
    "Advanced Imaging and Biophotonics",
    "Advances in Biomechanics and Biomedical Technologies",
    "Neurosciences and Mental Health",
    "Emerging Infectious Diseases and Integrated Health Strategies",
    "Reproductive, Maternal and Pediatric Health",
    "Behavioral Sciences and Healthcare Psychology",
    "Healthcare Systems and Management",
  ];

  const colors = [
    "from-blue-500 to-blue-600",
    "from-teal-500 to-teal-600",
    "from-purple-500 to-purple-600",
    "from-green-500 to-green-600",
    "from-red-500 to-red-600",
    "from-orange-500 to-orange-600",
    "from-pink-500 to-pink-600",
    "from-indigo-500 to-indigo-600",
    "from-cyan-500 to-cyan-600",
    "from-emerald-500 to-emerald-600",
    "from-violet-500 to-violet-600",
    "from-rose-500 to-rose-600",
    "from-amber-500 to-amber-600",
    "from-lime-500 to-lime-600",
    "from-sky-500 to-sky-600",
    "from-slate-500 to-slate-600",
  ];

  const icons = [
    Pill,
    Bug,
    Microscope,
    Laptop,
    Hospital,
    BarChart3,
    Globe,
    Sprout,
    Dna,
    Camera,
    Wrench,
    Brain,
    Shield,
    Baby,
    Activity,
    Cross,
  ];

  return (
    <>
      <section id="tracks" className="py-16 bg-cyan-100 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white">
              Session Tracks / Call for Papers
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Explore our diverse and dynamic session tracks designed to inspire
              innovation and foster collaboration across multiple disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessionTracks.map((track, index) => {
              const IconComponent = icons[index];

              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden"
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${
                      colors[index % colors.length]
                    }`}
                  ></div>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${
                          colors[index % colors.length]
                        } rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="text-xs font-medium"
                          >
                            Session {index + 1}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                          {track}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Submit Your Research?
              </h3>
              <p className="text-gray-600 mb-6">
                Join leading researchers from around the world in sharing
                groundbreaking discoveries
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r  from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                >
                  Submit Abstract
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Download Guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SessionTracks;
