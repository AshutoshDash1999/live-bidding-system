import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducer from "./userInfoSlice"

export const rtkStore = configureStore({
    reducer:{
        userInfo: UserInfoReducer
    },
})