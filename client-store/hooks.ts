import { useDispatch, useSelector } from "react-redux";

import * as initial from "./initial";
import * as actions from "./actions";

export function useAppSelector<T>(selector: (state: typeof initial) => T): T {
  return useSelector<typeof initial, T>(selector);
}

// TODO: improvement of typing is needed
type Actions = typeof actions[keyof typeof actions];

export function useAppDispatch() {
  return useDispatch();
}
