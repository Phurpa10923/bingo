import { createSlice } from "@reduxjs/toolkit";

export const gameSettingSlice = createSlice({
    name:'gameSetting',
    initialState:{
        timer:5,
        gamename:'default',
        isManual:false
    },
    reducers:{
        setGameName:(state,action)=>{
            state.gamename=action.payload;
        },
        setManualFlag:(state,action)=>{
            state.isManual=action.payload;
        },
        setTimer:(state,action)=>{
            state.timer=action.payload;
        }
    }
    
})

export const{setGameName,setManualFlag,setTimer} = gameSettingSlice.actions;
export default gameSettingSlice.reducer;