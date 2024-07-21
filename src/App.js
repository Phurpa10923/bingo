import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Bingoboard from "./Components/BingoBoard/Bingoboard";
import Drawnnumber from "./Components/Drawnnumber/Drawnnumber";
import { useState, useEffect, useRef } from "react";
import { pickAball } from "./Service/Generaterandno";
import "bootstrap/dist/css/bootstrap.min.css";
import Gamesetting from "./Components/Gamesetting/Gamesetting";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoSettings } from "react-icons/io5";
import { setMessage } from "./Reducers/messagereducers";
import { db } from "./indexdb";
import { FaGithub, FaLinkedin, FaPlay } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import AudioUpload from "./Components/BingoBoard/AudioUpload";
import TicketGen from "./Components/TicketGenerator/TicketGen";

function App() {
  const [latestDrawnNumber, setLatestDrawnNumber] = useState(0);
  const [drawnnumbers, setDrawnNumbers] = useState([]);
  const [count, setCount] = useState(5);
  const [isCounting, setIsCounting] = useState(false);
  const countRef = useRef(null);
  const numberPickRef = useRef(null);
  const gamesetting = useSelector((state) => state.gameSetting);
  const alertMessage = useSelector((state) => state.alertMessage);
  const [settingPopup, setSettingPopup] = useState(false);
  const [ticketpopup,setTicketPopup] = useState(false);
  const [audio] = useState(new Audio());
  const drawAballIfManual = async () => {
    if (drawnnumbers.length > 90) {
      return;
    }
    const picked = pickAball(1, 90, drawnnumbers);
    const base64 = await db.audio
      .where("name")
      .equals(`${picked}audioBase64`)
      .toArray();
    if (audio.src) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (base64[0]) {
      audio.src = `data:audio/mp3;base64,${base64[0].stream}`;
      audio.play();
    } else {
      const utter = new SpeechSynthesisUtterance(picked.toString());
      synthe.speak(utter);
    }
    setDrawnNumbers((prevDrawnNumbers) => [...prevDrawnNumbers, picked]);
    setLatestDrawnNumber(picked);
  };
  useEffect(() => {
    if (isCounting && !gamesetting.isManual) {
      countRef.current = setInterval(() => {
        setCount((prevCount) => (prevCount === 0 ? 5 : prevCount - 1));
      }, 1000);
      return () => clearInterval(countRef.current);
    } else {
      clearInterval(countRef.current);
    }
  }, [isCounting]);

  const synthe = window.speechSynthesis;

  useEffect(() => {
    if (!gamesetting.isManual) {
      if (isCounting) {
        numberPickRef.current = setInterval(async () => {
          dispatch(setMessage(""));
          if (drawnnumbers.length > 90) {
            clearInterval(numberPickRef.current);
            return;
          }
          const picked = pickAball(1, 90, drawnnumbers);
          const base64 = await db.audio
            .where("name")
            .equals(`${picked}audioBase64`)
            .toArray();
          if (audio.src) {
            audio.pause();
            audio.currentTime = 0;
          }
          if (base64[0]) {
            audio.src = `data:audio/mp3;base64,${base64[0].stream}`;
            audio.play();
          } else {
            const utter = new SpeechSynthesisUtterance(picked.toString());
            synthe.speak(utter);
          }
          setDrawnNumbers((prevDrawnNumbers) => [...prevDrawnNumbers, picked]);
          setLatestDrawnNumber(picked);
        }, 6000);
        return () => clearInterval(numberPickRef.current);
      } else {
        clearInterval(numberPickRef.current);
      }
    }
  }, [isCounting, drawnnumbers]);

  const handleStart = (clicked) => {
    setIsCounting(clicked);
  };

  const showSettingPopup = () => {
    setSettingPopup(!settingPopup);
  };
  const showTicketSlider = ()=>{
    setTicketPopup(!ticketpopup)
  }

  const closeIconRef = useRef();
  const showAlertClose = () => {
    closeIconRef.current.style.top = "50px";
  };
  const dispatch = useDispatch();

  const closeAlert = () => {
    dispatch(setMessage(""));
  };
  const [showUpload, setUploadFlag] = useState({ show: false, number: "0" });
  return (
    <div className="App">
      <AudioUpload
        showUpload={showUpload}
        setUploadFlag={setUploadFlag}
      ></AudioUpload>
      <Gamesetting
        settingPopup={settingPopup}
        setPopup={setSettingPopup}
        setUploadFlag={setUploadFlag}
      ></Gamesetting>
      <TicketGen ticketPopup={ticketpopup} setTicketPopup={setTicketPopup}></TicketGen>
      <div
        className={`${
          alertMessage.message ? "show-alert" : "hide-alert"
        } custom-alert`}
      >
        <div className="d-flex flex-column align-items-center">
          <span className="message-box" onMouseEnter={showAlertClose}>
            {alertMessage.message}
          </span>
          <div
            className="close-icon d-flex justify-content-center"
            ref={closeIconRef}
          >
            <IoClose onClick={closeAlert}></IoClose>
          </div>
        </div>
        <span
          className={`${gamesetting.isManual ? "d-flex" : "d-none"}`}
          style={{ bottom: "50px", background: "none" }}
        >
          * Click next to draw numbers!
        </span>
        <span style={{ bottom: "25px", background: "none" }}>
          * Hover on the message to see the close pop-up!
        </span>
      </div>
      <Navbar
        handleStart={handleStart}
        showSettingPopup={showSettingPopup}
        gameStarted={isCounting}
        setTicketPopup={showTicketSlider}
      />
      <div className="d-flex align-item-center flex-column gap-3 mb-3">
        <div
          className={`${gamesetting.isManual ? "d-none" : "d-flex"} timer`}
          style={{ width: `${(count * 100) / 5}%` }}
        ></div>
        <div className="d-flex justify-content-around mt-5">
          <Drawnnumber
            drawnedNumbers={drawnnumbers}
            drawaball={drawAballIfManual}
            gameStarted={isCounting}
          />
          <div className="col-8">
            <Bingoboard
              drawnnumbers={drawnnumbers}
              latestDrawnNumber={latestDrawnNumber}
              setUploadFlag={setUploadFlag}
              showUpload={showUpload}
              gameStarted={isCounting}
            />
          </div>
        </div>
        <div className="site-information d-flex flex-column align-items-center mt-2">
          <span className="my-1" style={{ textAlign: "center" }}>
            * Click <FaPlay></FaPlay> to start the game.
          </span>
          <span className="my-1" style={{ textAlign: "center" }}>
            * Click <IoSettings></IoSettings> to configure the game.
          </span>
          <span className="my-1" style={{ textAlign: "center" }}>
            * To add custom audio to an number , upload audio by clicking the
            number. A number with attached audio is shown with{" "}
            <span style={{ color: "rgb(226,183,20)" }}>yellow</span> background
            .
          </span>
        </div>
      </div>
      <footer className="pb-4 footer-cont">
        <div className="d-flex flex-row col-6">
          <a
            href="https://github.com/Phurpa10923"
            target={`_blank${Math.random()}`}
          >
            <FaGithub></FaGithub> Github
          </a>
          <a
            href="https://www.linkedin.com/in/phurpa-tsering-0767b1148"
            target={`_blank${Math.random()}`}
          >
            <FaLinkedin></FaLinkedin> Linkedin
          </a>
          <a
            href="https://portfolio-w3g9.onrender.com/"
            target={`_blank${Math.random()}`}
          >
            <TbWorldWww></TbWorldWww> My Portfolio
          </a>
        </div>
        <div className="d-flex col-6 justify-content-end">
          <img
            src={`${process.env.PUBLIC_URL}/MyName.png`}
            style={{ width: "100px" }}
            alt="Description"
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
