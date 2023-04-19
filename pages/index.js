import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className={`${styles.jumbotron} bg-dark text-light`}>
        <h1 className="display-4">Welcome to My Toolset</h1>
        <p className="lead">A collection of tools for developers.</p>
        <hr className="my-4" />
        <p>
          Currently, we have only one tool available: MQTT Tool. You can use it
          to test MQTT connections and publish/subscribe to topics.
        </p>
        <Link href="/mqtt">
          <span className={`${styles.btnPrimary} btn btn-primary btn-lg`}>Go to MQTT Tool</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

