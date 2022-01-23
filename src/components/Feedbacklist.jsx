import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react";
import Feedbackitem from "./Feedbackitem";
import Card from "./shared/Card";
import FeedbackContext from "../context/FeedbackContext";

function Feedbacklist(props) {
  const { feedback } = useContext(FeedbackContext);

  return (
    <div className="feeback-list">
        { feedback.length ? (
          <AnimatePresence>
            {feedback.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{opacity:0}}
                  animate={{opacity:1}}
                  exit={{opacity:0}}
                >
                  <Feedbackitem key={item.id} item={item}/>
                </motion.div>
            ))}
            </AnimatePresence>
        ) : (
            <Card>No Feedbacks Yet!</Card>
        ) }
    </div>
  );
}

export default Feedbacklist;
