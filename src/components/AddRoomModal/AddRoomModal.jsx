import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from '../../http';
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { FaGlobeAsia } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  async function createRoom() {
    try {
        if (!topic){
           return toast.error("Topic required");
        };
        const { data } = await create({ topic, roomType });
        navigate(`/room/${data.id}`);
        // history.push(`/room/${data.id}`);
    } catch (err) {
        console.log(err.message);
    }
}
  return (
    <div>
      <div className={styles.modalMask}>
        <div className={styles.modalBody}>
          <button onClick={onClose} className={styles.closeButton}>
            <img src="/images/close.png" alt="close" />
          </button>
          <div className={styles.modalHeader}>
            <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
            <TextInput
              fullwidth="true"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <h2 className={styles.subHeading}>Room types</h2>
            <div className={styles.roomTypes}>
              <div
                onClick={() => setRoomType("open")}
                className={`${styles.typeBox} ${
                  roomType === "open" ? styles.active : ""
                }`}
              >
                {/* <img src="/images/globe.png" alt="globe" /> */}
                <FaGlobeAsia className={`${styles.icons}`}/>
                <span>Open</span>
              </div>
              <div
                onClick={() => setRoomType("social")}
                className={`${styles.typeBox} ${
                  roomType === "social" ? styles.active : ""
                }`}
              >
                {/* <img src="/images/social.png" alt="social" /> */}
                <IoIosPeople className={`${styles.icons}`}/>
                <span>Social</span>
              </div>
              <div
                onClick={() => setRoomType("private")}
                className={`${styles.typeBox} ${
                  roomType === "private" ? styles.active : ""
                }`}
              >
                {/* <img src="/images/lock.png" alt="lock" /> */}
                <FaLock className={`${styles.icons}`}/>
                <span>Private</span>
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <h2>Start a room, open to everyone</h2>
            <button onClick={createRoom} className={styles.footerButton}>
              {/* <img src="/images/celebration.png" alt="celebration" /> */}
              <MdCelebration className={`${styles.celebIcons}`}/>   
              <span>Let's go</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
