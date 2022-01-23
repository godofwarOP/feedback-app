import { useContext, useState, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import Ratingselect from "./Ratingselect";
import FeedbackContext from "../context/FeedbackContext";

function Feedbackform() {
    const [text, setText] = useState(""); 
    const [rating, setRating] = useState(1); 
    const [btnDisabled, setBtnDisabled] = useState(true); 
    const [message, setMessage] = useState("");
    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
        }else if(text !== "" && text.trim().length <= 10) {
            setBtnDisabled(true)
            setMessage("Text must be atleast 10 characters")
        }else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }

            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }else {
                addFeedback(newFeedback)
            }
            
            setText("")
        }
    }

  return (
      <Card>
          <form onSubmit={handleSubmit}>
              <h2>How would you rate your service with us?</h2>
              <Ratingselect select={(rating) => {setRating(rating)}}/>
              <div className="input-group">
                  <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text} />
                  <Button type='submit' isDisabled={btnDisabled}>Send</Button>
              </div>

              {message && <div className="message">{message}</div>}
          </form>
      </Card>
  );
}

export default Feedbackform;
