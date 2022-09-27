import { useDispatch, useSelector } from "react-redux";

import * as initial from "./initial";
import { Store } from ".";

export function useAppSelector<T>(selector: (state: typeof initial) => T): T {
  return useSelector<typeof initial, T>(selector);
}

export type AppDispatch = Store["dispatch"];

// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch;
