import Image from "next/image";
import React from "react";

const ConferenceTheme = () => {
  return (
    <div className="w-full bg-violet-100 rounded-2xl p-8">
      <div className="flex flex-col justify-center md:justify-start space-y-2 text-gray-800 dark:text-gray-300 max-w-7xl mx-auto">
        <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white">
          Conference Theme
        </h1>
        <div className="flex flex-col gap-y-8 md:gap-y-0 justify-center md:flex-row md:justify-between items-center">
          <div>
            <Image
              src="/theme.jpg"
              alt=""
              width={500}
              height={600}
              className="hover:scale-105 transform transition-transform duration-300 ease-in-out rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-bold text-xl mb-4 text-blue-800 dark:text-blue-300">
              &quot;Bridging Science and Practice: Multidisciplinary Approaches
              to Health and Wellbeing&quot;
            </h2>

            <p className="leading-relaxed">
              The International Conference on Life Sciences and
              Multidisciplinary Healthcare Approaches (ICLSMHA-2026) centers on
              the critical integration of life sciences, healthcare and allied
              disciplines to address complex global health challenges. This
              theme emphasizes the importance of translating scientific
              innovation into real-world healthcare solutions through
              cross-disciplinary collaboration.
            </p>

            <p className="leading-relaxed">
              From biotechnology and environmental health to clinical research
              and public health policy, the conference aims to foster meaningful
              dialogue and knowledge exchange that drive sustainable
              improvements in global wellbeing. By uniting diverse perspectives,
              ICLSMHA- 2026 seeks to build pathways toward inclusive,
              evidence-based and impactful healthcare practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceTheme;
