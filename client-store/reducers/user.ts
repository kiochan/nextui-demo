import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { user as action } from "../actions";
import { user as initial } from "../initial";
import { token } from "./token";

// TODO: 没写完呢

export const user = createReducer(initial, (builder) => {
  builder
    .addCase(action.login, (state, action) => {
    })
    .addCase(action.logout, (state, action) => {
      (
        async () => {
          await axios({
            method: "post",
            url: "/api/userInfo",
            data: { token }
          })

          state.email = ''
          state.isLoading = false
          state.token = null
          state.name = ''
          state.isLogin = false
          state.id = -1
        }
      )()
    })
    .addCase(action.refresh, (state, action) => {
      (
        async () => {
          state.isLoading = true
          try {
          const res = await axios({
            method: "post",
            url: "/api/userInfo",
            data: { token }
          })
          if (res.data.error || res.data.status !== 'ok') {
            throw new Error(res.data.error)
          }
          const info = res.data.info
          state.email = info.email
          state.isLoading = false
          state.name = info.name
          state.isLogin = true
          state.id = info.id
        } catch {
          state.email = ''
          state.isLoading = false
          state.token = null
          state.name = ''
          state.isLogin = false
          state.id = -1
        }
        }
      )()
    })
    .addCase(action.changeAdditional, (state, action) => {
    })
    .addCase(action.changePassword, (state, action) => {
    });
});
