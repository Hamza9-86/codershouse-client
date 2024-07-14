import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { FaPhoneAlt } from "react-icons/fa";
// import { sendOtp } from '../../../../http/index';
// import { useDispatch } from 'react-redux';
// import { setOtp } from '../../../../store/authSlice';

const Phone = ({ onNext }) => {
       const [phoneNumber, setPhoneNumber] = useState('');
//     const dispatch = useDispatch();

//     async function submit() {
//         const { data } = await sendOtp({ phone: phoneNumber });
//         console.log(data);
//         dispatch(setOtp({ phone: data.phone, hash: data.hash }));
//         onNext();
//     }

    return (
        <Card title="Enter you phone number" icon2={<FaPhoneAlt style={{width:'20px',height:'20px'}}/>}>
            {/* <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            /> */}
            <div>
                {/* <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={onNext}/>
                </div> */}
                <p className={styles.bottomParagraph}>
                   Sign in with your email. Phone services will be available soon.
                   Thanks!
                </p>
            </div>
        </Card>
    )
  }

// export default Phone;
// import React from 'react'

// const Phone = () => {
//   return (
//     <div>Phone</div>
//   )
// }

export default Phone;