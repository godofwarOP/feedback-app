import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react";
import Feedbackitem from "./Feedbackitem";
import Card from "./shared/Card";
import FeedbackContext from "../context/FeedbackContext";
import Spinner from "./shared/Spinner";

function Feedbacklist(props) {
  const { feedback, isLoading } = useContext(FeedbackContext);
  console.log(isLoading);
  return (
    <div className="feeback-list">
        { isLoading ? 
        (
          <Spinner />
        ) : 
        (
          feedback.length ? (
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
          ) 
        )} 
    </div>
  );
}

export default Feedbacklist;
