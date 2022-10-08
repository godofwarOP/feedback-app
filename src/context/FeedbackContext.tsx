import React, { createContext, useEffect, useState } from "react";
import { FeedbackType } from "../types/feedback";

interface FeedbackContextInterface {
  isLoading: boolean;
  feedbacks: FeedbackType[];
  feedbackEdit: {
    item: FeedbackType;
    edit: boolean;
  };
  addFeedback: (item: FeedbackType) => void;
  deleteFeedbackById: (id: string) => void;
  editFeedback: (item: FeedbackType) => void;
  updateFeedbackById: (id: string, item: FeedbackType) => void;
}

const defaultValues: FeedbackContextInterface = {
  isLoading: true,
  feedbacks: [],
  feedbackEdit: {
    item: { id: "0", rating: 1, text: "" },
    edit: false,
  },
  addFeedback: () => {},
  deleteFeedbackById: () => {},
  editFeedback: () => {},
  updateFeedbackById: () => {},
};

const FeedbackContext = createContext<FeedbackContextInterface>(defaultValues);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [feedbackEdit, setFeedbackEdit] = useState<{
    item: FeedbackType;
    edit: boolean;
  }>({
    item: defaultValues.feedbackEdit.item,
    edit: false,
  });

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const addFeedback = async (item: FeedbackType) => {
    try {
      setLoading(true);
      /**
       * @todo
       */
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllFeedbacks = async () => {
    try {
      setLoading(true);
      /**
       * @todo
       */
      // setFeedbacks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editFeedback = (item: FeedbackType): boolean => {
    setFeedbackEdit({ item, edit: true });
    return true;
  };

  const updateFeedbackById = async (id: string, item: FeedbackType) => {
    try {
      /**
       * @todo
       */

      // setFeedbacks((prev) => {
      //   const feedbackInMemory = prev.findIndex(
      //     (e) => e.id === updatedFeedback.id
      //   );
      //   if (feedbackInMemory < 0) {
      //     return [...prev];
      //   }
      //   prev[feedbackInMemory] = {
      //     id: updatedFeedback.id,
      //     text: updatedFeedback.text,
      //     rating: updatedFeedback.rating,
      //   };

      //   return [...prev];
      // });
      setFeedbackEdit({ item: defaultValues.feedbackEdit.item, edit: false });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeedbackById = async (id: string) => {
    try {
      /**
       * @todo
       */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        feedbacks,
        feedbackEdit,
        addFeedback,
        deleteFeedbackById,
        editFeedback,
        updateFeedbackById,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
