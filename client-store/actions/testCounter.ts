import { createAction } from "@reduxjs/toolkit";

export const testCounter = {
  increment: createAction("counter/increment"),
  decrement: createAction("counter/decrement"),
  incrementByAmount: createAction<number>("counter/incrementByAmount"),
};

export const testCounterA = {
  a: createAction("counter/a"),
  b: createAction("counter/b"),
  c: createAction<number>("counter/c"),
};
