import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName:"",
    userEmail:"",
    userRole:"bidder"
}

const userInfoSlice = createSlice({
    name:"UserInfo",
    initialState,
    reducers: {},
})

// console.log(userInfoSlice);
export default userInfoSlice.reducer