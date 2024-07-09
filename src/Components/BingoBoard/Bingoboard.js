
export default function Bingoboard({drawnnumbers}){
    const bingoItem = [];
    for(var i=1;i<91;i++){
        bingoItem.push(<div key={i} className={`bingoItem ${drawnnumbers.includes(i)?"numberDrawned" :""} ${drawnnumbers[drawnnumbers.length-1]===i?"isPicked":''}`}>
            {i}
        </div>);
    }
    return(
        <div className="bingoBoard">
            <div >
                {bingoItem}
            </div>
        </div>
    )
}