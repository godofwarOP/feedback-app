import React, { useContext } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FeedbackType } from "../types/feedback";
import Card from "./shared/Card";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackItem: React.FC<{ item: FeedbackType }> = (props) => {
  const { deleteFeedbackById, editFeedback } = useContext(FeedbackContext);

  return (
    <Card reverse={null}>
      <div className="num-display">{props.item.rating}</div>
      <button
        className="close"
        onClick={() => {
          const areYouSure = window.confirm(
            "do you want to delete this feedback?"
          );
          if (areYouSure) {
            deleteFeedbackById(+props.item.id);
          }
        }}
      >
        <FaTimes color="purple" />
      </button>
      <button
        className="edit"
        onClick={() => {
          editFeedback(props.item);
        }}
      >
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{props.item.text}</div>
    </Card>
  );
};

export default FeedbackItem;
