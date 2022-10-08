import React, { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FeedbackType } from "../types/feedback";
import { v4 as uuidv4 } from "uuid";

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
  const [feedbackEdit, setFeedbackEdit] = useState<{
    item: FeedbackType;
    edit: boolean;
  }>({
    item: defaultValues.feedbackEdit.item,
    edit: false,
  });
  const [values, setValues] = useLocalStorage<FeedbackType[]>("feedbacks", []);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);

  const getAllFeedbacks = useCallback(() => {
    try {
      setLoading(true);
      setFeedbacks(values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [values]);

  useEffect(() => {
    getAllFeedbacks();
  }, [getAllFeedbacks]);

  const addFeedback = async (item: FeedbackType) => {
    try {
      setLoading(true);
      setValues([
        ...values,
        {
          id: uuidv4(),
          text: item.text,
          rating: item.rating,
        },
      ]);
    } catch (error) {
      throw error;
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
      setFeedbacks((prev) => {
        const index = prev.findIndex((e) => e.id === item.id);
        if (index < 0) {
          return [...prev];
        }
        prev[index] = {
          id: item.id,
          text: item.text,
          rating: item.rating,
        };
        setValues(prev);

        return [...prev];
      });
      setFeedbackEdit({ item: defaultValues.feedbackEdit.item, edit: false });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeedbackById = async (id: string) => {
    try {
      setFeedbacks((prev) => {
        const index = feedbacks.findIndex((e) => e.id === id);

        if (index < 0) {
          return [...prev];
        }

        prev.splice(index, 1);

        setValues(prev);
        return [...prev];
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
