import style from './AudioUpload.module.css';
import { useEffect, useRef, useState } from 'react';
import { db } from '../../indexdb';
import { IoClose } from 'react-icons/io5';

export default function AudioUpload({showUpload,setUploadFlag}){
    const fileRef= useRef();
    const getAudio = async ()=>{
        try{
            const result = await db.audio.where('key').equals(showUpload.number).toArray();
            setAudioFile(result);
        }catch(e){
            return [];
        }
    }
    const convertFileToBas64 =(file)=>{
        const reader = new FileReader();
        const fileName = file.name;
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            const result = reader.result.split(',')[1];
            db.audio.add({name:`${showUpload.number}audioBase64`,stream:result,key:showUpload.number,filename:fileName});
            updateShowUpload();
        }
    }
    const uploadAudio = ()=>{
        fileRef.current.click();
    }
    const afterAudioSelection = ()=>{
        const file = fileRef.current.files[0];
        if(file){
            convertFileToBas64(file);
        }
        fileRef.current.value='';
    }
    const updateShowUpload = ()=>{
        setUploadFlag({show:false,number:0});
    }
    const removeAudio = async ()=>{
        await db.audio.delete(showUpload.number);
        updateShowUpload();
    }
    const [audioFile,setAudioFile] = useState([]);
    useEffect(()=>{
        getAudio();
    },[showUpload])
    return(
        <div className={`${style.mainContainer} ${showUpload.show ? style.show: style.hide} d-flex justify-content-center align-items-center`}>
            <div className={style.backcover}></div>
            <div className={`${style.buttonscontainer} col-4`}>
                <div className={`${style.closeAudioUpload} col-12 px-3 py-2`}>
                    <span className='col-6' style={{textAlign:'end',fontSize:'20px',alignItems:'center'}}>{showUpload.number}</span>
                    <div className={`d-flex justify-content-end col-6 `} style={{cursor:'pointer'}}>
                        <IoClose onClick={updateShowUpload}></IoClose>
                    </div>
                </div>
                <div className={style.oldupload}>
                    <span>{audioFile[0] ?
                        <div className='d-flex flex-column'>
                            <div className='d-flex align-items-center mt-4'>
                            <audio controls>
                            <source src={`data:audio/mp3;base64,${audioFile[0].stream}`}></source>
                            <span>Audio not supported</span>
                            </audio>
                            <u className='mx-2' style={{cursor:'pointer'}}>{audioFile[0].filename}</u>
                         </div>
                        </div>
                        :
                        'There is no old attached audio'}
                    </span>
                </div>
                <div className='col-12 my-4 d-flex justify-content-around align-items-end'>
                    <button className='col-4' onClick={uploadAudio}>{audioFile[0] ? 'Replace':'Upload'}</button>
                    <button className='col-4' onClick={removeAudio}>Delete</button>
                </div>
            </div>
            <input type="file" ref={fileRef} className="d-none" typeof="mp3" onChange={afterAudioSelection}></input>
        </div>
    )
}