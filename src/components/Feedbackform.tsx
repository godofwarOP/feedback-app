import React, { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import Ratingselect from "./Ratingselect";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackForm: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const { addFeedback, feedbackEdit, updateFeedbackById } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit) {
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
      setBtnDisabled(false);
    }
  }, [feedbackEdit.edit, feedbackEdit.item.rating, feedbackEdit.item.text]);

  const clearInputs = () => {
    setText("");
    setRating(1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (feedbackEdit.edit === true) {
      updateFeedbackById(feedbackEdit.item.id, {
        ...feedbackEdit.item,
        text: text,
        rating: rating,
      });
    } else {
      addFeedback({
        rating: rating,
        text: text,
        id: "1",
      });
    }

    clearInputs();
  };

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (text === "") {
      setBtnDisabled(true);
      setMessage("Feedback title should be more than 10 characters.");
    } else if (text && text.trim().length < 10) {
      setMessage("Feedback title should be more than 10 characters.");
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
      setMessage("");
    }

    setText(event.currentTarget.value);
  };

  const handleSelectRating = (r: number) => {
    setRating(r);
  };

  return (
    <Card reverse={null}>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <Ratingselect select={handleSelectRating} rating={rating} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text ? text : ""}
            name="text"
          />
          <Button
            type="submit"
            isDisabled={btnDisabled}
            title="send"
            version="primary"
          />
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
