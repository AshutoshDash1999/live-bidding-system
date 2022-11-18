import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    userName:"",
    userEmail:"",
    userRole:""
}

export const customReducer = createReducer(initialState, {})