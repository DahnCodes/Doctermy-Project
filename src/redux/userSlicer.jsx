import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    uniqueId: null,
    address: null,
    dateOfBirth: null,
    specialty: null,
    imageUrl: null,
    createdAt: "",
    updatedAt: "",
  },
  reducers: {
    setUser(state, action) {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.phoneNumber = action.payload?.phoneNumber;
      state.role = action.payload?.role;
      state.uniqueId = action.payload?.uniqueId;
      state.address = action.payload?.address;
      state.dateOfBirth = action.payload?.dateOfBirth;
      state.specialty = action.payload?.specialty;
      state.imageUrl = action.payload?.imageUrl;
      state.createdAt = action.payload?.createdAt;
      state.updatedAt = action.payload?.updatedAt;
      state.isLoggedIn = true;
    },
    // setToken(state, action) {
    //   state.token = action.payload?.token;
    // },
  },
});

export const { setUser } = userSlice.actions;
