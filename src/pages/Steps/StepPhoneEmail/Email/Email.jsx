import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../../components/shared/Loader2/Loader";
import { MdEmail } from "react-icons/md";

const Email = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  async function submit(e) {
    if (!email) {
      return toast.error("Enter your email id");
    }
    if (validateEmail(email)) {
      // Proceed with form submission or other logic
      setLoading(true);
      const { data } = await sendOtp({ email: email });
      dispatch(setOtp({ email: data.email, hash: data.hash }));
      console.log(data);
      toast.success("Otp Sent successfully");
      setLoading(false);
      onNext();
    } else {
      setIsEmailValid(false);
      toast.error("Enter a valid email id")
    }
  }
  if (loading) return <Loader message="Activation in progress..." />;
  return (
    <Card
      title="Enter your email id"
      icon2={<MdEmail style={{ width: "25px", height: "25px" }} />}
    >
      <TextInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
