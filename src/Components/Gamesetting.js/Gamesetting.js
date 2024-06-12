import Style from './Gamesetting.module.css';
export default function Gamesetting({settingPopup}){
    return(
        <div className={Style.gameSettingContainer} style={settingPopup?{transform:'scale(1)'}:{transform:'scale(0)'}}>
            <div className='col-12 m-0 p-0 h-100' style={{position:'absolute',backgroundColor:'lightblue',opacity:'0.5',height:'100vh'}}>
            </div>
            <div className={'col-6 ' + Style.popupcontainer}>
                <div className={Style.header}>

                </div>
            </div>
        </div>
    );
}