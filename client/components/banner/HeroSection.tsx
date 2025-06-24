"use client";

// import Image from "next/image";
import Countdown from "../count-down";

export default function HeroSection() {
  return (
    <section className="relative py-6 px-5 sm:px-10 md:px-12 lg:px-5 flex-1">
      <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-2 lg:items-center gap-8 lg:gap-12 xl:gap-16">
        {/* Content Section */}
        <div className="flex flex-col space-y-4 sm:space-y-6 lg:items-start text-center lg:text-left">
          {/* Countdown */}
          <div className="hidden lg:block">
            {/* <div className="  w-full flex justify-start">
              <Countdown targetDateString="2026-05-14T23:59:59" />
            </div> */}
          </div>

          {/* Main Title */}
          <h1 className="font-bold leading-tight text-teal-950 dark:text-white text-2xl text-center md:text-left lg:text-2xl xl:text-3xl">
            International Conference on Life Sciences and Multidisciplinary
            Healthcare Approaches{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-950 to-blue-800">
              (ICLSMHA-2026)
            </span>
          </h1>

          {/* Theme */}
          <h2 className="font-semibold leading-tight text-teal-950 dark:text-white  text-lg  lg:text-xl">
            <span className="font-bold">Theme:</span> &quot;Bridging Science and
            Practice: Multidisciplinary Approaches to Health and Wellbeing&quot;
          </h2>

          {/* Conference Details */}
          <div className="text-gray-700 dark:text-gray-300 tracking-tight text-sm sm:text-base">
            <div className="flex flex-col text-left gap-y-2 w-full space-y-1">
              <p className="text-center lg:text-left">
                Hybrid Conference{" "}
                <span className="font-bold">(In Person + Online)</span>
              </p>
              <p className="text-center lg:text-left">
                <span className="font-bold">Organized By:</span> Confworld
                Educational Research and Development Association
              </p>
              <p className="font-bold text-center lg:text-left">
                ISBN: 978-40-289458-5-7
              </p>
            </div>
          </div>
          <div className=" w-full flex justify-start">
            <Countdown targetDateString="2026-05-14T23:59:59" />
          </div>

          {/* Date and Location Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start w-full pt-4">
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 text-white shadow-lg transition-all duration-300 ease-in-out w-full sm:w-auto max-w-md text-center">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-center justify-center text-sm sm:text-base">
                <span className="font-semibold">
                  📅 Date: <span className="font-normal">14–15 May, 2025</span>
                </span>

                <span className="hidden sm:inline-block w-[2px] h-10 bg-white opacity-50"></span>

                <span className="font-semibold">
                  📍 Location:{" "}
                  <span className="font-normal">Kuala Lumpur, Malaysia</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Section */}
        <div className="flex aspect-square lg:aspect-auto lg:h-[35rem] relative mt-8 lg:mt-0">
          {/* Static Image Container (commented out) */}
          <div className="w-3/5 h-[80%] rounded-3xl overflow-hidden border-4 sm:border-8 border-gray-200 dark:border-gray-950 z-30">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Container */}
          <div className="absolute bg-white opacity-40 right-0 bottom-0 h-[calc(100%-30px)] sm:h-[calc(100%-50px)] w-4/5 sm:w-4/5 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-gray-200 dark:border-gray-800 z-10">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
