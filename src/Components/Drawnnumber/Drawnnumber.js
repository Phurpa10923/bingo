import style from "./drawnnumber.module.css";
export default function Drawnnumber({drawnedNumbers}){
    return (
        <div className={style.drawnnumberContainer +''}>
            {
                drawnedNumbers.reverse().map((item,i)=>i<6 ? ( <div key={i} className={style.numberCube}>
                    {item}
                </div>
        ): '')
            }
        </div>
    );
}