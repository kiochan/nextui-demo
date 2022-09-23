import { createReducer } from "@reduxjs/toolkit";
import { testCounter as action } from "../actions/";
import { testCounter as initial } from "../initial";

export const testCounter = createReducer(initial, (builder) => {
  builder
    .addCase(action.increment, (state, action) => {
      state.value++;
    })
    .addCase(action.decrement, (state, action) => {
      state.value--;
    })
    .addCase(action.incrementByAmount, (state, action) => {
      state.value += action.payload;
    });
});
