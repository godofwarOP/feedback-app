import { Link } from "react-router-dom";
import Card from "../components/shared/Card";

const AboutPage: React.FC = () => {
  return (
    <Card reverse={null}>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback for a product or service</p>
        <p>Version: 2.0.0</p>

        <p>
          <Link
            to={{
              pathname: "/",
            }}
          >
            Back to home
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
