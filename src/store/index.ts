import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatRoomReducer from "./chatRoomSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  user: userReducer,
  chatRoom: chatRoomReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "chatRoom"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  //action 직렬화가 불가능한 값을 전달받았을 때 발생하는 오류 해결
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
