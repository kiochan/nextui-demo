import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";

import { combineReducers, Store } from "redux";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import * as initial from "./initial";
import * as reducers from "./reducers";
import { transforms } from "./persist/transforms";

export * from "./hooks";

export type StoreState = typeof initial;

let store: Store<StoreState> | void;

const persistConfig: PersistConfig<StoreState, string> = {
  key: "root",
  storage,
  transforms,
};

function initStore(preloadedState: StoreState) {
  const combinedReducer = combineReducers(reducers);

  const reducer = persistReducer(persistConfig, combinedReducer);

  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // disable standard serializable check
        // because redux-persist will generate non-serializable value
        serializableCheck: false,
      }),
  });
}

export const initializeStore = (preloadedState: StoreState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: StoreState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  const persistor = useMemo(() => persistStore(store), [store]);
  return { store, persistor };
}
