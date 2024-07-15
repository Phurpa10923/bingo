import { configureStore } from "@reduxjs/toolkit";
import gameSettingReducer from "../Reducers/gameSettingActions.js";
import alertmessage from "../Reducers/messagereducers.js";

export default configureStore({
    reducer:{
        gameSetting:gameSettingReducer,
        alertMessage:alertmessage
    }
})