//store.jsx

"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";

const rootReducer = combineReducers({
  posts: postsReducer,
},);

export const store = configureStore({
  reducer: rootReducer,

 });