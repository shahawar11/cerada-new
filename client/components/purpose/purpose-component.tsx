import Image from "next/image";
import React from "react";

const Purpose = () => {
  return (
    <div className="w-full bg-fuchsia-100 rounded-2xl p-8">
      <div className="flex flex-col justify-center md:justify-start space-y-2 text-gray-800 dark:text-gray-300 max-w-7xl mx-auto">
        <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white">
          Purpose of the Conference
        </h1>

        <div className="flex flex-col gap-y-8 md:gap-y-0 justify-center md:flex-row md:justify-between items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <p className="leading-relaxed text-base lg:text-lg">
              The purpose of the International Conference on Life Sciences and
              Multidisciplinary Healthcare Approaches (ICLSMHA-2026) is to
              provide a global platform for{" "}
              <span className="font-medium">
                researchers, educators, healthcare professionals
              </span>{" "}
              and <span className="font-medium">industry leaders</span> to come
              together and explore innovative, cross-disciplinary solutions to
              today&apos;s most pressing health and life science challenges.
            </p>

            <div>
              <p className="leading-relaxed text-base lg:text-lg mb-4">
                <strong>This conference seeks to:</strong>
              </p>

              <ul className="space-y-4 text-gray-800 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span className="leading-relaxed text-base lg:text-lg">
                    Foster collaboration across diverse fields such as
                    biotechnology, medicine, public health, environmental
                    science and allied health disciplines.
                  </span>
                </li>

                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span className="leading-relaxed text-base lg:text-lg">
                    Promote knowledge exchange by showcasing cutting-edge
                    research, emerging technologies and best practices in
                    healthcare and life sciences.
                  </span>
                </li>

                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span className="leading-relaxed text-base lg:text-lg">
                    Encourage translational research that bridges the gap
                    between scientific discovery and clinical or community
                    application.
                  </span>
                </li>

                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span className="leading-relaxed text-base lg:text-lg">
                    Support sustainable health strategies that contribute to
                    global wellbeing, resilience and equity.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Image
              src="/speaker.jpg"
              alt="Speaker"
              width={500}
              height={600}
              className="hover:scale-105 transform transition-transform duration-300 ease-in-out rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purpose;
