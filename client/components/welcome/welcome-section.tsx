import Image from "next/image";
import React from "react";

const WelcomeSection = () => {
  return (
    <div className="w-full bg-indigo-100 rounded-2xl p-8">
      <div className="flex flex-col justify-center space-y-8 text-gray-800 dark:text-gray-300 max-w-5xl mx-auto">
        <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-blue-900 dark:text-white text-center">
          Welcome to ICLSMHA-2026
        </h1>

        <div className="flex justify-center mb-8">
          <Image
            src="/crowd2.jpg"
            alt="ICLSMHA-2026 Conference"
            width={600}
            height={400}
            className="hover:scale-105 transform transition-transform duration-300 ease-in-out rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <p className="leading-relaxed text-lg text-gray-700 dark:text-gray-300">
            We are delighted to invite{" "}
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              researchers, academicians, healthcare professionals,
            </span>{" "}
            and{" "}
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              industry experts
            </span>{" "}
            from around the globe to join us at ICLSMHA-2026, where innovation
            meets collaboration. This international platform is designed to
            foster dialogue, share cutting-edge research, and explore
            interdisciplinary strategies that shape the future of health and
            life sciences.
          </p>

          <p className="leading-relaxed text-lg text-gray-700 dark:text-gray-300">
            <strong className="text-blue-900 dark:text-blue-300">
              ICLSMHA-2026
            </strong>{" "}
            serves as a dynamic hub for scholars, healthcare practitioners, and
            industry experts to come together, exchange knowledge, and foster
            cross-sector collaboration.
          </p>

          <p className="leading-relaxed text-lg text-gray-700 dark:text-gray-300">
            This conference is committed to addressing pressing global health
            issues by embracing innovative, multidisciplinary approaches across
            biotechnology, public health, environmental science, and medical
            research. Engage with thought leaders, present groundbreaking work,
            and be part of transformative conversations that inspire progress in
            healthcare.
          </p>

          <p className="leading-relaxed text-lg font-medium text-blue-800 dark:text-blue-300 bg-white dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
            Let us come together to bridge scientific discovery and practical
            application in advancing health, sustainability, and global
            wellbeing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
