import { Link } from "react-router-dom";
import Card from "../components/shared/Card";
import { FaChalkboardTeacher, FaHome } from "react-icons/fa";
import { SiGithub, SiUdemy } from "react-icons/si";

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>Feedback App</h1>
        <p>
          This is a React app to leave feedback for a product or service <br />{" "}
          This project is part of the React Front To Back Udemy course by{" "}
          <strong>Brad Traversy</strong>.
        </p>
        <div className="links">
          <h1>Links</h1>
          <div className="link">
            <a
              className="link"
              href="https://www.udemy.com/course/modern-react-front-to-back/"
              target="_blank"
              rel="noreferrer"
            >
              <SiUdemy />
              <span style={{ marginLeft: ".2rem" }}>Course Link</span>
            </a>
          </div>
          <div className="link">
            <a
              className="link"
              href="https://github.com/godofwarOP/feedback-app"
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub />
              <span style={{ marginLeft: ".2rem" }}>Repository Link</span>
            </a>
          </div>
          <div className="link">
            <a
              className="link"
              href="https://traversymedia.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaChalkboardTeacher />
              <span style={{ marginLeft: ".2rem" }}>Brad Traversy</span>
            </a>
          </div>
        </div>

        <hr />

        <p>
          <Link
            to={{
              pathname: "/",
            }}
            className="link"
          >
            <FaHome />
            <span style={{ marginLeft: ".2rem" }}>Back To Home</span>
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
