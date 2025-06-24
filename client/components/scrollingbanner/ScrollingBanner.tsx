"use client"
import React, { useEffect, useState } from 'react'

function ScrollingBanner() {
    const [currentBannerText, setCurrentBannerText] = useState(0);

    const bannerTexts = [
      "HYBRID EVENT - You can participate in person at Kuala Lumpur, Malaysia or Virtually from your home or office",
      "International Conference on Life Sciences and Multidisciplinary Healthcare Approaches",
      "Theme: Bridging Science and Practice: Multidisciplinary Approaches to Health and Wellbeing",
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentBannerText((prev) => (prev + 1) % bannerTexts.length);
      }, 4000);
      return () => clearInterval(interval);
    }, []);
  return (
    <>
      <div className="top-0 fixed   w-full bg-gradient-to-r z-50 from-blue-600 to-teal-600 text-white py-2 overflow-hidden">
        <div className="animate-pulse text-center px-4">
          <p className="text-sm font-medium transition-all duration-1000">
            {bannerTexts[currentBannerText]}
          </p>
        </div>
      </div>
    </>
  );
}

export default ScrollingBanner
