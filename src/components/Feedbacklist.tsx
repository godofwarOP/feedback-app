import React, { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import FeedbackItem from "./Feedbackitem";
import Spinner from "./shared/Spinner";

const FeedbackList: React.FC = () => {
  const { isLoading, feedbacks } = useContext(FeedbackContext);

  return (
    <div className="feeback-list">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {feedbacks && feedbacks.length === 0 ? (
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Feedbacks not found
            </h1>
          ) : (
            feedbacks.map((feedback) => (
              <FeedbackItem item={feedback} key={feedback.id} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackList;
