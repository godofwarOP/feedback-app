import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import {FaTimes, FaEdit} from "react-icons/fa";
import Card from "./shared/Card";

function Feedbackitem(props) {
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

  return (
      <Card>
          <div className="num-display">{props.item.rating}</div>
          <button onClick={() => deleteFeedback(props.item.id)} className="close">
              <FaTimes color="purple"/>
          </button>
          <button className="edit" onClick={() => editFeedback(props.item)}>
              <FaEdit color="purple"/>
          </button>
          <div className="text-display">
              {props.item.text}
          </div>
      </Card>
  )
}

export default Feedbackitem;
