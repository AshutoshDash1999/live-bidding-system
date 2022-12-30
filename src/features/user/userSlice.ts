import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    userName: string,
    userEmail: string,
    userRole: string,
    userFirstName: string,
    userLastName: string,
}

const initialState: UserState = {
    userName: "",
    userEmail: "",
    userRole: "bidder",
    userFirstName: "",
    userLastName: "",
}

export const userInfoSlice:any = createSlice({
    name:'currentUserStore',
    initialState,
    reducers:{
        updateUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        updateUserEmail: (state, action: PayloadAction<string>) => {
            state.userEmail = action.payload
        },
        updateUserRole: (state, action: PayloadAction<string>) => {
            state.userRole = action.payload
        },
        updateUserFirstName: (state, action: PayloadAction<string>) => {
            state.userFirstName = action.payload
        },
        updateUserLastName: (state, action: PayloadAction<string>) => {
            state.userLastName = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { updateUserName, updateUserEmail, updateUserRole, updateUserFirstName, updateUserLastName } = userInfoSlice.actions

export default userInfoSlice.reducer

