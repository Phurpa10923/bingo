import { createSlice } from "@reduxjs/toolkit";

export const alertmessage = createSlice({
    name:'alertmessage',
    initialState:{
        message:''
    },
    reducers:{
        setMessage:(state,action)=>{
            state.message = action.payload
        }
    }
})

export const {setMessage} = alertmessage.actions;
export default alertmessage.reducer;