import { IoOptions, IoSave, IoTicket } from "react-icons/io5";
import Style from "./TicketGen.module.css";
import { useRef, useState } from "react";
import { generateTicket } from "../../Service/GenerateTicket";
import QRCode from "react-qr-code";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function TicketGen({ ticketPopup, setTicketPopup }) {
  const gameContainerRef = useRef();
  const nameRef = useRef();
  const gameInfor = useSelector((state)=>state.gameSetting);
  const [ticketType,setTicketType] = useState('');
  const [quantity,setQuantity] = useState(0);
  const [ticketUrl,setTicketUrl] = useState('');
  const hideSetting = () => {
    gameContainerRef.current.style.transform = "translateX(100%)";
    setTicketPopup(!setTicketPopup);
  };
  const updateTicketTypeState = (event)=>{
    setTicketType(event.currentTarget.value);
  }
  const updateNoOfTicketState = (event)=>{
    setQuantity(event.currentTarget.value);
  }
  const handleTicketGen =()=>{
    const tickets=generateTicket(ticketType,quantity);
    setTicketUrl(`${window.location.href}?tickets=${JSON.stringify(tickets)}&gameinfor=${JSON.stringify(gameInfor)}`);
  }
  const copyLink = ()=>{
    navigator.clipboard.writeText(ticketUrl);
    alert('Url copied');
  }
  return (
    <div
      ref={gameContainerRef}
      className={Style.gameSettingContainer}
      style={
        ticketPopup
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
            <span>Generate Ticket</span>
            <IoTicket></IoTicket>
          </div>
        </div>
        <div className="row mt-3 mx-2">
          <div className="col-12 m-3 d-flex justify-content-start">
            <select name="typeofticket" onChange={updateTicketTypeState} >
              <option value=''>Select an option</option>
              <option value="ticket">Ticket</option>
              <option value="sheet">Sheet</option>
            </select>
          </div>
          <div className={`col-12 m-3 ${ticketType =='ticket' ? 'd-flex' :'d-none'} justify-content-start `}>
            <input
              typeof="number"
              className="col-4"
              ref={nameRef}
              placeholder='Number of tickets'
              onChange={updateNoOfTicketState}
            ></input>
          </div>
          
          <div className="col-12 m-3 d-flex justify-content-start" onClick={handleTicketGen}>
            <span
              className={`${Style.saveSetting} py-2`}
            >
              Generate <IoSave></IoSave>
            </span>
          </div>
          <div className={`${ticketUrl?'d-flex':'d-none'} col-12 m-3 row justify-content-center gap-3`}>
            <span style={{textAlign:'center'}}>Generated QR</span>
            <QRCode value={ticketUrl}  style={{padding:'10px',width:'auto', border:'1px solid black'}}></QRCode>
            <FaLink style={{color:'black',cursor:'pointer'}} onClick={copyLink}></FaLink>
          </div>
        </div>
      </div>
    </div>
  );
}
