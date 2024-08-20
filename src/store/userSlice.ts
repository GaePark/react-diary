import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userTypes } from "../types/storeTypes";

const initialState: { currentUser: userTypes } = {
  currentUser: {
    uid: "",
    displayName: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userTypes>) => {
      state.currentUser.uid = action.payload.uid;
      state.currentUser.displayName = action.payload.displayName;
    },
    clearUser: (state) => {
      state.currentUser = {
        uid: "",
        displayName: "",
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
