import { createAction } from "@reduxjs/toolkit";

interface UserLoginData {
    email: string
    password: string
}

interface UserChangePasswordData {
    old: string
    new: string
}

type UserAdditionalData = Record<string, string>

export const user = {
  login: createAction<UserLoginData, "user/login">("user/login"),
  logout: createAction("user/logout"),
  refresh: createAction("user/refresh"),
  changePassword: createAction<UserChangePasswordData, "counter/changePassword">(
    "counter/changePassword"
  ),
  changeAdditional: createAction<UserAdditionalData, "counter/changeAdditional">(
    "counter/changeAdditional"
  ),
};
