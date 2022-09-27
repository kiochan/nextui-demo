import { createReducer } from "@reduxjs/toolkit";
import { request } from "http";
import { token as action } from "../actions";
import { token as initial } from "../initial";

export const token = createReducer(initial, (builder) => {
  builder
    .addCase(action.set, (state, action) => {
      state.value = action.payload;
    })
    .addCase(action.delete, (state, action) => {
      state.value = null;
    });
});
