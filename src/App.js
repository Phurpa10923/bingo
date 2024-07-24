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
import TicketGen from "./Components/TicketGenerator/TicketGenerator.js";
import { useSearchParams } from "react-router-dom";
import Ticket from "./ticket.js";

function App() {
  const [latestDrawnNumber, setLatestDrawnNumber] = useState(0);
  const [drawnnumbers, setDrawnNumbers] = useState([]);
  const [isCounting, setIsCounting] = useState(false);
  const countRef = useRef(null);
  const numberPickRef = useRef(null);
  const gamesetting = useSelector((state) => state.gameSetting);
  const [count, setCount] = useState(gamesetting.timer||5);
  const alertMessage = useSelector((state) => state.alertMessage);
  const [settingPopup, setSettingPopup] = useState(false);
  const [ticketpopup, setTicketPopup] = useState(false);
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
    setCount(parseInt(gamesetting.timer));
  }, [gamesetting.timer]);

  const synthe = window.speechSynthesis;

  useEffect(() => {
    if (!gamesetting.isManual) {
      if (isCounting) {
        clearInterval(numberPickRef.current);
        numberPickRef.current = setInterval(async () => {
          dispatch(setMessage(""));
          if (drawnnumbers.length >= 90) {
              clearDrawnedNumbers();
              return;
          }
          let picked = pickAball(1, 90, drawnnumbers);
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
        }, (parseInt(gamesetting.timer)+1)*1000);
        countRef.current = setInterval(() => {
          setCount((prevCount) => (prevCount === 0 ? gamesetting.timer : prevCount - 1));
        }, 1000);
        return () => clearInterval(countRef.current);clearInterval(numberPickRef.current);
      } else {
        clearInterval(numberPickRef.current);
        clearInterval(countRef.current);
      }
    }
  }, [isCounting,drawnnumbers]);

  const handleStart = (clicked) => {
    setIsCounting(clicked);
  };

  const showSettingPopup = () => {
    setSettingPopup(!settingPopup);
  };
  const showTicketSlider = () => {
    setTicketPopup(!ticketpopup);
  };

  const closeIconRef = useRef();
  const showAlertClose = () => {
    closeIconRef.current.style.top = "50px";
  };
  const dispatch = useDispatch();

  const closeAlert = () => {
    dispatch(setMessage(""));
  };
  const clearDrawnedNumbers = ()=>{
    setDrawnNumbers([]);
    setIsCounting(false);
    dispatch(setMessage("Game Ended !"));
    clearInterval(numberPickRef.current);
  }
  const [searchparams] = useSearchParams();
  const gameInfor = JSON.parse(searchparams.get("gameinfor")) || {};
  const [showUpload, setUploadFlag] = useState({ show: false, number: "0" });
  return (
    <div className="App">
      {Object.keys(gameInfor).length > 0 ? (
        <Ticket></Ticket>
      ) : (
        <div>
          <AudioUpload
            showUpload={showUpload}
            setUploadFlag={setUploadFlag}
          ></AudioUpload>
          <Gamesetting
            settingPopup={settingPopup}
            setPopup={setSettingPopup}
            setUploadFlag={setUploadFlag}
          ></Gamesetting>
          <TicketGen
            ticketPopup={ticketpopup}
            setTicketPopup={setTicketPopup}
          ></TicketGen>
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
              style={{ width: `${(count * 100) / gamesetting.timer}%` }}
            ></div>
            <div className="drawnnumber-bingoboard-container d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 mt-3 mt-lg-5">
              <Drawnnumber
                drawnedNumbers={drawnnumbers}
                drawaball={drawAballIfManual}
                gameStarted={isCounting}
                clearDrawnedNumbers={clearDrawnedNumbers}
              />
              <div className="col-lg-8 col-md-8 col-sm-9">
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
                * To add custom audio to an number , upload audio by clicking
                the number. A number with attached audio is shown with{" "}
                <span style={{ color: "rgb(226,183,20)" }}>yellow</span>{" "}
                background .
              </span>
            </div>
          </div>
          <footer className="pb-4 footer-cont">
            <div className="d-flex flex-row col-6">
              <a
                href="https://github.com/Phurpa10923"
                target={`_blank${Math.random()}`}
                className="d-flex gap-2 align-items-center"
              >
                <FaGithub></FaGithub><span className="d-none d-lg-flex">Github</span> 
              </a>
              <a
                href="https://www.linkedin.com/in/phurpa-tsering-0767b1148"
                target={`_blank${Math.random()}`}
                className="d-flex gap-2 align-items-center"
              >
                <FaLinkedin></FaLinkedin> <span className="d-none d-lg-flex">Linkedin</span>
              </a>
              <a
                href="https://portfolio-w3g9.onrender.com/"
                target={`_blank${Math.random()}`}
                className="d-flex gap-2 align-items-center"
              >
                <TbWorldWww></TbWorldWww> <span className="d-none d-lg-flex">My Portfolio</span>
              </a>
            </div>
            <div className="d-flex col-6 justify-content-end">
              <img
                src={`${process.env.PUBLIC_URL}/MyName.png`}
                alt="Description"
              />
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
