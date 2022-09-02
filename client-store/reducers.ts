import { combineReducers } from "redux";
import { State, TestValueState } from "./initialState";
import types from "./types";

const initialTestValueState = {
  counter: 100,
};

interface CounterReducerPayload {
  type: keyof typeof types;
}

// COUNTER REDUCER
const counterReducer = (
  state: TestValueState,
  { type }: CounterReducerPayload
) => {
  state = state ?? initialTestValueState;
  switch (type) {
    case types.INCREMENT:
      return state.counter + 1;
    case types.DECREMENT:
      return state.counter - 1;
    case types.RESET:
      return 0;
    default:
      return state.counter;
  }
};

// COMBINED REDUCERS
const reducers = {
  testValue: counterReducer,
};

export default combineReducers(reducers);
