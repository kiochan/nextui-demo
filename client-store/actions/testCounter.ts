import { createAction } from "@reduxjs/toolkit";

export const testCounter = {
  increment: createAction("counter/increment"),
  decrement: createAction("counter/decrement"),
  incrementByAmount: createAction<number, "counter/incrementByAmount">(
    "counter/incrementByAmount"
  ),
};
