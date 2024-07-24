import style from "./drawnnumber.module.css";
import { useSelector } from "react-redux";

export default function Drawnnumber({
  drawnedNumbers,
  drawaball,
  gameStarted,
  clearDrawnedNumbers
}) {
  const isManual = useSelector((state) => state.gameSetting.isManual);
  return (
    <div className={style.drawnnumberContainer + " col-6 col-lg-2 col-md-3 h-50 "}>
      <div
        className={`${style.prevno} col-12 p-2 d-flex justify-content-center align-items-center`}
        style={{ height: "20vh", fontSize: "bolder", fontFamily: "clock" }}
      >
        <span>{[...drawnedNumbers].reverse()[0] || "0"}</span>
      </div>
      <div
        className={`${
          isManual && gameStarted ? "d-flex" : "d-none"
        } justify-content-center m-3 ${style.nextnumber}`}
      >
        <button onClick={drawaball}>Next</button>
        <button onClick={drawnedNumbers.length>=90 ? ()=> clearDrawnedNumbers :()=>{}} style={drawnedNumbers.length>=90?{cursor:'not-allowed',opacity:'0.7'}:{}}>End</button>
      </div>
      <div className="d-flex flex-row flex-md-column justify-content-center align-items-center">
        {[...drawnedNumbers].reverse().map((item, i) =>
          i < 5 ? (
            <div key={i} className={style.numberCube}>
              <span>{item}</span>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}
