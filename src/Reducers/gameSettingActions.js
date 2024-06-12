import { createSlice } from "@reduxjs/toolkit";

export const gameSettingReducer = createSlice({
    name:'gameSetting',
    initialState:{
        timer:5,
        gamename:'default',
    },
    reducers:{
        gamename:(state,action)=>{
            state.gamename=action.payload;
        },
        timer:(state,action)=>{
            state.timer=action.payload;
        }
    }
    
})