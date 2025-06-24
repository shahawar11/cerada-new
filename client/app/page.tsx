import Banner from "@/components/banner/page";
import ConferenceTheme from "@/components/conference-theme/conference-theme";
import { KeyHighlightsGrid } from "@/components/key-highlights/key-highlights";
import Objective from "@/components/objective/objective";
import Proceedings from "@/components/proceedings/Proceedings";
import Purpose from "@/components/purpose/purpose-component";
import { RegistrationSteps } from "@/components/registrationSteps/registration-steps";
import SessionTracks from "@/components/sessionTracks/session-tracks";
import SubmissionDeadlines from "@/components/submissionDeadlines/submission-deadlines";
import WelcomeSection from "@/components/welcome/welcome-section";
import WhoCanAttend from "@/components/who-can-attend/who-can-attend";
import WhyJoinUs from "@/components/whyJoinUs/why-join-us";

import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col gap-y-12">
      <Banner />
      <div className="flex flex-col gap-y-8 px-5 sm:px-10 md:px-12 lg:px-5">
        <WelcomeSection />
        <ConferenceTheme />
        <Purpose />
        <KeyHighlightsGrid />
        <WhoCanAttend />
        <Objective/>
        <SessionTracks />
        <SubmissionDeadlines />
        <RegistrationSteps />
      </div>
      <WhyJoinUs />
      <div className="flex flex-col gap-y-8 px-5 sm:px-10 md:px-12 lg:px-5">  
        <Proceedings/>
        
      </div>

      {/* <Welcome/>
      <ConferenceTheme/>
      <KeyHighlights/> */}
    </div>
  );
}

export default HomePage;
