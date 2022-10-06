import React, { createContext, useEffect, useState } from "react";
import { FeedbackType } from "../types/feedback";
import FeedbackModel from "../models/feedback";

interface FeedbackContextInterface {
  isLoading: boolean;
  feedbacks: FeedbackType[];
  feedbackEdit: {
    item: FeedbackType;
    edit: boolean;
  };
  addFeedback: (item: FeedbackType) => void;
  deleteFeedbackById: (id: number) => void;
  editFeedback: (item: FeedbackType) => void;
  updateFeedbackById: (id: number, item: FeedbackType) => void;
}

const defaultValues: FeedbackContextInterface = {
  isLoading: true,
  feedbacks: [],
  feedbackEdit: {
    item: { id: 0, rating: 1, text: "" },
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
      const { id, rating, text } = await FeedbackModel.addFeedback(
        item.text,
        item.rating
      );
      setFeedbacks((prev) => [
        ...prev,
        {
          id,
          text,
          rating,
        },
      ]);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllFeedbacks = async () => {
    try {
      setLoading(true);
      const feedbacksArray = await FeedbackModel.getAllFeedbacks();
      setFeedbacks(feedbacksArray);
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

  const updateFeedbackById = async (id: number, item: FeedbackType) => {
    try {
      const updatedFeedback = await FeedbackModel.updateFeedbackById(id, item);

      setFeedbacks((prev) => {
        const feedbackInMemory = prev.findIndex(
          (e) => e.id === updatedFeedback.id
        );
        if (feedbackInMemory < 0) {
          return [...prev];
        }
        prev[feedbackInMemory] = {
          id: updatedFeedback.id,
          text: updatedFeedback.text,
          rating: updatedFeedback.rating,
        };

        return [...prev];
      });
      setFeedbackEdit({ item: defaultValues.feedbackEdit.item, edit: false });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeedbackById = async (id: number) => {
    try {
      FeedbackModel.deleteFeedbackById(id).then(() => {
        setFeedbacks((prev) => prev.filter((e) => e.id !== id));
      });
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
