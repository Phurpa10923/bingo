import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Bingoboard from "./Components/BingoBoard/Bingoboard";
import Drawnnumber from "./Components/Drawnnumber/Drawnnumber";
import { useState, useEffect, useRef } from "react";
import { pickAball } from "./Service/Generaterandno";
import 'bootstrap/dist/css/bootstrap.min.css'
import Gamesetting from "./Components/Gamesetting/Gamesetting";
function App() {
  const [latestDrawnNumber, setLatestDrawnNumber] = useState(0);
  const [drawnnumbers, setDrawnNumbers] = useState([]);
  const [count, setCount] = useState(5);
  const [isCounting, setIsCounting] = useState(false);
  const countRef = useRef(null);
  const numberPickRef = useRef(null);

  const [settingPopup,setSettingPopup]=useState(false);
  useEffect(() => {
    if (isCounting) {
      countRef.current = setInterval(() => {
        setCount((prevCount) => (prevCount === 0 ? 5 : prevCount - 1));
      }, 1000);
      return () => clearInterval(countRef.current);
    } else {
      clearInterval(countRef.current);
    }
  }, [isCounting]);

  useEffect(() => {
    if (isCounting) {
      numberPickRef.current = setInterval(() => {
        if (drawnnumbers.length > 100) {
          clearInterval(numberPickRef.current);
          return;
        }
        const picked = pickAball(1, 100, drawnnumbers);
        setDrawnNumbers((prevDrawnNumbers) => [...prevDrawnNumbers, picked]);
        setLatestDrawnNumber(picked);
      }, 6000);
      return () => clearInterval(numberPickRef.current);
    } else {
      clearInterval(numberPickRef.current);
    }
  }, [isCounting, drawnnumbers]);

  const handleStart = (clicked) => {
    setIsCounting(clicked);
  };

  const showSettingPopup = ()=>{
    setSettingPopup(!settingPopup);
  }

  return (
    <div className="App">
      <Gamesetting settingPopup={settingPopup}></Gamesetting>
      <Navbar handleStart={handleStart} showSettingPopup={showSettingPopup}/>
      <div class ='timer' style={{width:`${(count*100/5)}%`}}></div>
      <div className="d-flex justify-content-around mt-4">
        <div className=" d-flex col-2">
          <Drawnnumber  drawnedNumbers={drawnnumbers} />
        </div>
        <div className="col-8">
          <Bingoboard
            drawnnumbers={drawnnumbers}
            latestDrawnNumber={latestDrawnNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
