import { Card, CardContent } from "../ui/card";
import { Microscope, Lightbulb, Handshake, Globe, Network } from "lucide-react";

function Objective() {
  return (
    <>
      <section className="py-16 rounded-2xl bg-green-100 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Objective of the Conference
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              The primary objective of the International Conference on Life
              Sciences and Multidisciplinary Healthcare Approaches
              (ICLSMHA-2026) is to bring together experts from diverse fields
              to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Microscope,
                title: "Promote Interdisciplinary Research",
                description:
                  "Foster innovation in life sciences and healthcare through cross-disciplinary collaboration",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Lightbulb,
                title: "Facilitate Knowledge Exchange",
                description:
                  "Enable sharing of ideas and best practices among academics, clinicians, and industry professionals",
                color: "from-teal-500 to-teal-600",
              },
              {
                icon: Handshake,
                title: "Encourage Collaborative Efforts",
                description:
                  "Translate scientific discoveries into practical healthcare solutions through partnership",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Globe,
                title: "Address Global Health Challenges",
                description:
                  "Tackle worldwide health issues through sustainable, evidence-based approaches",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Network,
                title: "Foster Professional Networking",
                description:
                  "Build lasting partnerships that advance health and wellbeing worldwide",
                color: "from-orange-500 to-orange-600",
              },
            ].map((objective, index) => {
              const IconComponent = objective.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden bg-white"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${objective.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {objective.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {objective.description}
                        </p>
                        <div
                          className={`mt-4 h-1 bg-gradient-to-r ${objective.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Objective;
