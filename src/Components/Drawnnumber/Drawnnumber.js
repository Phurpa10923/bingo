import style from "./drawnnumber.module.css";
export default function Drawnnumber({drawnedNumbers}){
    return (
        <div className={style.drawnnumberContainer +''}>
            <div className={`${style.prevno} col-12 p-2 d-flex justify-content-center align-items-center`} style={{height:'20vh',fontSize:'bolder',fontFamily:'clock'}}>
                <span>{[...drawnedNumbers].reverse()[0]}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
                {
                    [...drawnedNumbers].reverse().map((item,i)=>i<5 ? ( <div key={i} className={ style.numberCube}>
                        {item}
                    </div>
            ): '')
                }
            </div>
        </div>
    );
}