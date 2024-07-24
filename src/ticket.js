import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setGameName, setManualFlag, setTimer } from "./Reducers/gameSettingActions";
export default function Ticket() {
  const [searchparams] = useSearchParams();
  const gameInfor = JSON.parse(searchparams.get("gameinfor")) || {};
  const dispatch = useDispatch();
  useEffect(()=>{
    if(Object.keys(gameInfor).length>0){
        dispatch(setGameName(gameInfor.gamename || 'default'));
        dispatch(setManualFlag(gameInfor.isManual || false));
        dispatch(setTimer(gameInfor.timer || '5s'));
    }
  },[])
  const tickets = JSON.parse(searchparams.get("tickets")) || [];
  const handleOnCellClick = (event) => {
    if (
      !event.currentTarget.classList.contains("crossed") &&
      event.currentTarget.innerText !== ""
    ) {
      event.currentTarget.classList.add("crossed");
    }
  };
  const ticketContainerRef = useRef();
  const [activeTickert, setActiveTicket] = useState(0);
  const ticketsCell = tickets.map((ticket, ticketIndex) => {
    return (
      <div
        key={ticketIndex}
        className="ticket col-12 d-flex flex-column align-items-center gap-1"
      >
        {ticket.map((row, rowIndex) => {
          return (
            <div
              key={`${ticketIndex}${rowIndex}`}
              className="ticket-row d-flex row gap-1"
            >
              {row.map((cell, cellIndex) => {
                return (
                  <div
                    key={`${ticketIndex}${rowIndex}${cellIndex}`}
                    className="ticket-cell col-1 d-flex align-items-center justify-content-center"
                    onClick={handleOnCellClick}
                  >
                    {cell != 0 ? cell : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  });
  const updateActiveTicket = (event) => {
    const activeItem = parseInt(event.currentTarget.innerText) || 0;
    ticketContainerRef.current.style.transform = `translateX(-${
      activeItem * 100
    }%)`;
    setActiveTicket(activeItem);
  };
  return (
    <div className="App">
      <Navbar isTicketPage={true}></Navbar>
      <div className="ticket-container">
        <div className="ticket-slider">
          {Array.from({ length: tickets.length }, (_, i) => {
            return (
              <div
                key={i}
                className={`${
                  activeTickert === i ? "active-item" : ""
                } ticket-slider-item`}
                onClick={updateActiveTicket}
                style={{ fontSize: "0" }}
              >
                {i}
              </div>
            );
          })}
        </div>
        <div
          className="d-flex"
          ref={ticketContainerRef}
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          {ticketsCell}
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
            alt="Description"
          />
        </div>
      </footer>
    </div>
  );
}
