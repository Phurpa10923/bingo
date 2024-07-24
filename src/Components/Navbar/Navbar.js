import { useState } from "react";
import { FaPlay, FaInfo, FaTicketAlt } from "react-icons/fa";
import logo from "../../Logo.png";
import { IoSettings } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Reducers/messagereducers";

export default function Navbar({ handleStart, showSettingPopup,isTicketPage,gameStarted,setTicketPopup }) {
  const [clicked, setClicked] = useState(false);
  const gameSetting = useSelector((state) => state.gameSetting);
  const dispatch = useDispatch();
  const handleClickFlagUpdate = () => {
    setClicked(!clicked);
    handleStart(!clicked);
    dispatch(setMessage("All the best !"));
  };
 
  return (
    <div className="navbarContainer">
      <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
        <img src={logo} alt="Logo"></img>
      </div>
      <div
        className="d-flex justify-content-around"
        style={{ fontSize: "20px", cursor: "pointer" }}
      >
        <FaPlay
          className={`mx-3 ${gameStarted? "disabled" : ""} ${isTicketPage?'d-none':''}`}
          data-tooltip-id="play-text"
          onClick={gameStarted ? () => {} : handleClickFlagUpdate}
        ></FaPlay>
        <IoSettings
          className={`${gameStarted ? "disabled" : ""} mx-3 ${isTicketPage?'d-none':''}`}
          onClick={gameStarted ? () => {} : showSettingPopup}
          data-tooltip-id="setting-text"
        ></IoSettings>
        <FaInfo className="mx-3" data-tooltip-id="game-info"></FaInfo>
        <FaTicketAlt
          className={`mx-3 ${isTicketPage?'d-none':''} ${gameStarted ? "disabled" : ""}`}
          data-tooltip-id="generate-ticket"
          onClick={gameStarted ? () => {} : setTicketPopup}
        ></FaTicketAlt>
        <Tooltip id="play-text">
          <span>Play</span>
        </Tooltip>
        <Tooltip id="setting-text">
          <span>Setting</span>
        </Tooltip>
        <Tooltip id="generate-ticket" style={{ textAlign: "center" }}>
          <span>
            Generate tickets <br></br>
          </span>
        </Tooltip>
        <Tooltip
          id="game-info"
          style={{ fontFamily: "Robo Regular", width: "300px" }}
        >
          <div>
            <u>
              <h3 style={{ fontSize: "16px" }}>Game Info</h3>
            </u>
            <div className="d-flex row mt-4">
              <span className="col-6">Game name :</span>
              <span className="col-6">{gameSetting.gamename}</span>
            </div>
            <div
              className={`${
                gameSetting.isManual ? "d-none" : "d-flex"
              } row mt-2`}
            >
              <span className="col-6">Timer :</span>
              <span className="col-6">{`${gameSetting.timer || 5}s`}</span>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
