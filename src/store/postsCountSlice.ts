import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { currentPostsCount: number } = {
  currentPostsCount: 0,
};

export const postsCountSlice = createSlice({
  name: "postsCount",
  initialState,
  reducers: {
    setPostsCount: (state, action: PayloadAction<number>) => {
      state.currentPostsCount = action.payload;
    },
  },
});

export const { setPostsCount } = postsCountSlice.actions;

export default postsCountSlice.reducer;
