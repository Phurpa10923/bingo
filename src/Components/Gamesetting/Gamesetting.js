import { IoOptions, IoSave } from "react-icons/io5";
import Style from "./Gamesetting.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGameName,
  setManualFlag,
  setTimer,
} from "../../Reducers/gameSettingActions";
import { GrPowerReset } from "react-icons/gr";
import { db } from "../../indexdb";

export default function Gamesetting({ settingPopup, setPopup, setUploadFlag }) {
  const gameContainerRef = useRef();
  const [isManual, setIsManual] = useState(false);
  const gamesetting = useSelector((state) => state.gameSetting);
  const nameRef = useRef();
  const timerRef = useRef();
  const dispatch = useDispatch();
  const hideSetting = () => {
    gameContainerRef.current.style.transform = "translateX(100%)";
    setPopup(!settingPopup);
  };
  const updateIsManualFlag = (event) => {
    setIsManual(event.currentTarget.checked);
    dispatch(setManualFlag(event.currentTarget.checked));
  };
  const updateGameSettings = () => {
    if (nameRef.current.value) {
      dispatch(setGameName(nameRef.current.value));
    }
    if (parseInt(timerRef.current.value) > 0) {
      dispatch(setTimer(timerRef.current.value));
    }
    dispatch(setManualFlag(isManual));
    hideSetting();
    setTimeout(()=>{
      nameRef.current.value = "";
      timerRef.current.value = "";
      setIsManual(false);
    })
    
  };
  const removeAudios = async () => {
    await db.audio.clear();
    setUploadFlag({ show: false, number: -1 });
  };
  const onTimeEnter = (event) => {
    if (parseInt(event.currentTarget.value) < 0) {
      event.currentTarget.style.border = "1px solid red";
      event.currentTarget.value = "";
      event.currentTarget.blur();
    }
  };
  return (
    <div
      ref={gameContainerRef}
      className={Style.gameSettingContainer}
      style={
        settingPopup
          ? { transform: "translateX(0%)" }
          : { transform: "translateX(100%)" }
      }
    >
      <div
        className={Style.backpage + " col-12 m-0 p-0 h-100"}
        onClick={hideSetting}
      ></div>
      <div className={"col-4 col-sm-6 col-md-4 " + Style.popupcontainer}>
        <div
          className={
            Style.header + " d-flex align-item-center justify-content-between"
          }
        >
          <div>
            <span>Set up</span>
            <IoOptions className="mx-3"></IoOptions>
          </div>
        </div>
        <div className="row">
          <div className="col-12 m-3 d-flex justify-content-start">
            <span className="col-3">Game name </span>
            <input
              typeof="text"
              className="col-4"
              ref={nameRef}
              placeholder={gamesetting.gamename}
            ></input>
          </div>
          <div className="col-12 m-3 d-flex justify-content-start">
            <span className="col-3">Manual </span>
            <label className={Style.switch}>
              <input
                type="checkbox"
                checked={gamesetting.isManual}
                onClick={updateIsManualFlag}
              ></input>
              <span className={`${Style.slider} ${Style.round}`}></span>
            </label>
          </div>
          <div
            className={`col-12 m-3 ${
              gamesetting.isManual ? "d-none" : "d-flex"
            } justify-content-start`}
          >
            <span className="col-3">Time </span>
            <input
              type="number"
              ref={timerRef}
              className="col-4"
              placeholder={gamesetting.timer}
              onChange={onTimeEnter}
            ></input>
          </div>
          <div className="col-12 m-3 d-flex justify-content-start">
            <span
              className={`${Style.saveSetting} py-2`}
              onClick={updateGameSettings}
            >
              Save <IoSave></IoSave>
            </span>
          </div>

          <div className="col-12 m-3 d-flex justify-content-start">
            <span className={`${Style.resetAudio} py-2`} onClick={removeAudios}>
              Reset Audios <GrPowerReset></GrPowerReset>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
