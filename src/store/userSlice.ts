import { createSlice } from "@reduxjs/toolkit";
import { userTypes } from "../types/storeTypes";

const initialState: userTypes = {
  currentUser: {
    uid: "",
    photoURL: "",
    displayName: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
