import { useState } from "react"
import { FaPlay ,  FaInfo ,FaTicketAlt} from "react-icons/fa";
import logo from '../../Bingo.png'
import { IoSettings } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

export default function Navbar({handleStart , showSettingPopup}){
    const [clicked ,setClicked] = useState(false);
    const handleClickFlagUpdate = ()=>{
        setClicked(!clicked);
        handleStart(!clicked);
    }    
    return (
        <div className="navbarContainer">
            <div className="d-flex align-items-center"><img src={logo} alt="Logo" style={{width:'50px', height:'50px',aspectRatio:1}}></img><h1 className="m-2 d-none d-sm-flex">Bingo</h1></div>
            <div className="d-flex justify-content-around" style={{fontSize:'20px',cursor:'pointer'}}>
                <FaPlay className={`mx-3 ${clicked?'disabled':''}`} aria-disabled={{clicked}} onClick={handleClickFlagUpdate}></FaPlay>
                <FaInfo className="mx-3" data-tooltip-id="game-info"></FaInfo>
                <IoSettings className="mx-3" onClick={showSettingPopup}></IoSettings>
                <FaTicketAlt className="mx-3"></FaTicketAlt>
                <Tooltip id="game-info" style={{ fontFamily: 'Robo Regular',width:'300px'}}>
                    <div>
                        <u><h3 style={{fontSize:'16px'}}>Game Info</h3></u>
                        <div className="d-flex row mt-4">
                            <span className="col-6">Game name :</span>
                            <span className="col-6">{}</span>
                        </div>
                        <div className="d-flex row mt-2">
                            <span className="col-6">Timer :</span>
                            <span className="col-6">{'testingianiskfbasgfsabfjghasfjahsgfhj'}</span>
                        </div>
                        <div className="d-flex row mt-2">
                            <span className="col-6">Drawn numbers :</span>
                            <span className="col-6">{}</span>
                        </div>
                    </div>
                </Tooltip>
            </div>
            
        </div>
    )
}