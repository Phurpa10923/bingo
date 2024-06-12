import { useState } from "react"
import { FaPlay ,  FaInfo ,FaTicketAlt} from "react-icons/fa";
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
            <h1 style={{margin:'0'}}>This is Navbar</h1>
            <div className="d-flex justify-content-around" style={{fontSize:'20px'}}>
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