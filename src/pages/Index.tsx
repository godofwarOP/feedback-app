import React from "react";
import AboutIconLink from "../components/AboutIconLink";
import FeedbackForm from "../components/Feedbackform";
import Feedbacklist from "../components/Feedbacklist";
import Feedbackstats from "../components/Feedbackstats";

const Index: React.FC = () => {
  return (
    <section>
      <FeedbackForm />
      <Feedbackstats />
      <Feedbacklist />
      <AboutIconLink />
    </section>
  );
};

export default Index;
