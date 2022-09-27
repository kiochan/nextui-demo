import { createAction } from "@reduxjs/toolkit";

export const token = {
  set: createAction<string, "token/set">("token/set"),
  delete: createAction("token/delete"),
};
