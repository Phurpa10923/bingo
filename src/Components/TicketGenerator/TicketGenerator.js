import { IoOptions, IoSave, IoTicket } from "react-icons/io5";
import Style from "./TicketGen.module.css";
import { useRef, useState } from "react";
import { generateTicket } from "../../Service/GenerateTicket";
import QRCode from "react-qr-code";
import { FaLink, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function TicketGen({ ticketPopup, setTicketPopup }) {
  const gameContainerRef = useRef();
  const quantityRef = useRef();
  const gameInfor = useSelector((state)=>state.gameSetting);
  const [ticketType,setTicketType] = useState('');
  const [quantity,setQuantity] = useState(0);
  const [ticketUrl,setTicketUrl] = useState('');
  const hideSetting = () => {
    gameContainerRef.current.style.transform = "translateX(100%)";
    setTicketPopup(!setTicketPopup);
    quantityRef.current.value='';
    setTicketUrl('');
  };
  const updateTicketTypeState = (event)=>{
    setTicketType(event.currentTarget.value);
  }
  const updateNoOfTicketState = ()=>{
    const noOfTicket = parseInt(quantityRef.current.value);
    if(noOfTicket===NaN){
      return;
    }
    if(noOfTicket>6){
      quantityRef.current.value='';
      quantityRef.current.style.border = '1px solid red';
      quantityRef.current.classList.add('invalid-input-value');
      quantityRef.current.placeholder='Max 6';
      setTimeout(()=>{
        quantityRef.current.style.border = '';
        quantityRef.current.classList.remove('invalid-input-value');
        quantityRef.current.placeholder='';
      },3000);
      return
    }
    setQuantity(noOfTicket);
    
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
      <div className={"col-10 col-md-4 " + Style.popupcontainer}>
        <div
          className={
            Style.header + " d-flex align-item-center justify-content-between"
          }
        >
          <div className="d-flex align-items-center gap-2">
            <span>Generate Ticket</span>
            <IoTicket></IoTicket>
          </div>
        </div>
        <div className="row mt-3 mx-2">
          <div className="col-12 m-3 d-flex justify-content-start">
            <select name="typeofticket" className="col-6" onChange={updateTicketTypeState} >
              <option value=''>Select an option</option>
              <option value="ticket">Ticket</option>
              <option value="sheet">Sheet</option>
            </select>
          </div>
          <div className={`col-12 m-3 ${ticketType =='ticket' ? 'd-flex' :'d-none'} justify-content-start `}>
            <input
              typeof="number"
              className="col-4"
              ref={quantityRef}
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
            <span style={{textAlign:'center',fontWeight:'bold'}}>Generated QR</span>
            <QRCode value={ticketUrl}   style={{padding:'10px',width:'auto', border:'1px solid black'}}></QRCode>
            <div className="col-6 d-flex  align-items-center flex-column gap-3" style={{color:'black',cursor:'pointer'}}>
              <span style={{textAlign:'center',fontWeight:'bold'}}>Share :</span>
              <div className="d-flex justify-content-around align-items-center" style={{width:'30px',height:'30px',borderRadius:'15px',background:'white'}}>
                <FaLink  onClick={copyLink}></FaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
