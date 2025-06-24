// Banner.js
import React from "react";
import Tags from "./Tags";
import HeroSection from "./HeroSection";

function Banner() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Video Background */}
     
      {/* Hero Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <HeroSection />
        <Tags />
      </div>
    </section>
  );
}

export default Banner;
