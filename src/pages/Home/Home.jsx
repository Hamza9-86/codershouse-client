import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };
  const history = useNavigate();
  function startRegister() {
    history("/authenticate");
  }
  return (
    <div className={styles.cardWrapper}>
      <Card
        title="Welcome to Codershouse!"
        icon2={
          <>
            <img
              src="/images/hand.svg"
              style={{ width: "30px", height: "30px" }}
            />
          </>
        }
      >
        <p className={styles.text}>
          We’re diligently preparing Codershouse for everyone! As we finalize
          the finishing touches,we’re gradually adding new users to ensure
          everything runs smoothly. Thank you for your patience!
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Go!" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
