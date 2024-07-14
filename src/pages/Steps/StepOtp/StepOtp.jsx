import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import styles from './StepOtp.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import toast from 'react-hot-toast';
import { FaLock } from "react-icons/fa";

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { email, hash } = useSelector((state) => state.auth.otp);
  async function submit() {
    if(!otp || !email || !hash){
        return toast.error("Otp required")
    }
    try {
        const { data } = await verifyOtp({ otp, hash, email });
        dispatch(setAuth(data));
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
  return (
    <div className={styles.cardWrapper}>
    <Card
        title="Enter the code we just texted you"
        icon2={<FaLock />}
    >
        <TextInput
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
        />
        <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of
            Service and Privacy Policy. Thanks!
        </p>
    </Card>
</div>
  )
}

export default StepOtp