import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface shoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: shoppingCartState = {
  loading: true,
  error: null,
  items: [],
};

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8089/api/shoppingCart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const addShoppingCart = createAsyncThunk(
  "shoppingCart/addShoppingCart",
  async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8089/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const clearShoppingCart = createAsyncThunk(
  "shoppingCart/clearShoppingCart",
  async (parameters: { itemIds: number[]; jwt: string }, thunkAPI) => {
    return await axios.delete(
      `http://123.56.149.216:8089/api/shoppingCart/items/(${parameters.itemIds.join(
        ","
      )})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
  }
);

export const checkouts = createAsyncThunk(
  "shoppingCart/checkout",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8089/api/shoppingCart/checkout`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);

export const shoppingCartSlice = createSlice({
  name: `shoppingCart`,
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type](state) {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type](state, action) {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [getShoppingCart.rejected.type](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [addShoppingCart.pending.type](state) {
      state.loading = true;
    },
    [addShoppingCart.fulfilled.type](state, action) {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [addShoppingCart.rejected.type](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [clearShoppingCart.pending.type](state) {
      state.loading = true;
    },
    [clearShoppingCart.fulfilled.type](state, action) {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
    [clearShoppingCart.rejected.type](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [checkouts.pending.type]: (state) => {
      state.loading = true;
    },
    [checkouts.fulfilled.type]: (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [checkouts.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
