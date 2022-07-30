import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkouts } from "../../redux/shoppingCart/slice";

interface orderState {
  loading: boolean;
  error: string | null;
  currentOrder: any;
}

const initialState: orderState = {
  loading: false,
  error: null,
  currentOrder: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (parameters: { orderId: string; jwt: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8089/api/orders/${parameters.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data;
  }
);

export const orderSlice = createSlice({
  name: `order`,
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type](state) {
      state.loading = true;
    },
    [placeOrder.fulfilled.type](state, action) {
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    [placeOrder.rejected.type](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [checkouts.pending.type](state) {
      state.loading = true;
    },
    [checkouts.fulfilled.type](state, action) {
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    [checkouts.rejected.type](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
