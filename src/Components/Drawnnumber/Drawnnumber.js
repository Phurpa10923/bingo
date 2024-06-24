import style from "./drawnnumber.module.css";
export default function Drawnnumber({drawnedNumbers}){
    return (
        <div className={style.drawnnumberContainer +''}>
            <div className="prev-no col-12 p-2 d-flex justify-content-center align-items-center" style={{height:'20vh',fontSize:'bolder', backgroundColor:'black',fontFamily:'clock',color:'white'}}>
                <span>{drawnedNumbers.reverse()[0]}</span>
            </div>
            <div>
                {
                    drawnedNumbers.reverse().map((item,i)=>i<6 ? ( <div key={i} className={ style.numberCube}>
                        {item}
                    </div>
            ): '')
                }
            </div>
        </div>
    );
}