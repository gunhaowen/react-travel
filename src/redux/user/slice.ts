import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface userState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: userState = {
  loading: false,
  error: null,
  token: null,
};

export const singIn = createAsyncThunk(
  "user/singIn",
  async (
    paramaters: { email: string; password: number | string },
    thunkAPI
  ) => {
    const { data } = await axios.post(`http://123.56.149.216:8089/auth/login`, {
      email: paramaters.email,
      password: paramaters.password,
    });
    return data.token;
  }
);

export const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    logOut: (state) => {
      state.error = null;
      state.loading = false;
      state.token = null;
    },
  },
  extraReducers: {
    [singIn.pending.type](state) {
      state.loading = true;
    },
    [singIn.fulfilled.type](state, action) {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
    [singIn.rejected.type](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
