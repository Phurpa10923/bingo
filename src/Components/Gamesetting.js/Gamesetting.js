import { IoOptions } from 'react-icons/io5';
import Style from './Gamesetting.module.css';
export default function Gamesetting({settingPopup}){
    return(
        <div className={Style.gameSettingContainer} style={settingPopup?{transform:'scale(1)'}:{transform:'scale(0)'}}>
            <div className={Style.backpage + ' col-12 m-0 p-0 h-100'} >
            </div>
            <div className={'col-6 ' + Style.popupcontainer}>
                <div className={Style.header + ' d-flex align-item-center'}>
                    <span>Set up</span>
                    <IoOptions className='mx-3'></IoOptions>
                </div>
                <div className="row">
                    <div className='col-12 m-3 d-flex justify-content-start'>
                        <span className='col-3'>Game name </span>
                        <input typeof='text' className='col-4'></input>
                    </div>
                    <div className='col-12 m-3 d-flex justify-content-start'>
                        <span className='col-3'>Manual </span>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}