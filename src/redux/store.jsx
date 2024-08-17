import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlicer";
import { tokenSlice } from "./tokenSlicer";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    token: tokenSlice.reducer,
  },
});

export default store;
