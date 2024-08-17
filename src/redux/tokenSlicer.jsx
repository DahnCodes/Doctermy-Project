import { createSlice } from "@reduxjs/toolkit";


export const tokenSlice = createSlice({
    name: "token",
    initialState:{
        myToken: "",
    },
    reducers: {
        setToken(state, action){
            state.myToken = action.payload.myToken;
        },
    }
});

export const { setToken } = tokenSlice.actions;