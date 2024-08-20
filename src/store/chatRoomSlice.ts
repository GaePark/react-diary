import { createSlice } from "@reduxjs/toolkit";
import { chatRoomTypes } from "../types/storeTypes";

const initialState: { currentChatRoom: chatRoomTypes } = {
  currentChatRoom: {
    createBy: {
      name: "",
    },
    description: "",
    id: "",
    name: "",
  },
};

export const cahtRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {},
});

export default cahtRoomSlice.reducer;
