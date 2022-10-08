import React, { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

const Feedbackstats: React.FC = () => {
  const { feedbacks } = useContext(FeedbackContext);

  var average: number;
  average =
    feedbacks.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedbacks.length;

  average = +average.toFixed(1);

  return (
    <div className="feedback-stats">
      <h4>{feedbacks.length} Reviews</h4>
      <h4>Average Rating : {isNaN(average) ? 0 : average}</h4>
    </div>
  );
};

export default Feedbackstats;
