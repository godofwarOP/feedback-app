import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../components/hooks/useLocalStorage";

const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useLocalStorage("feedbacks", []);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedbacks(feedbacks.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const updateFeedback = (id, updatedItem) => {
    setFeedbacks(
      feedbacks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedItem,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
