import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface productSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: productSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (
    paramaters: {
      keywords: string;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    let url = `http://123.56.149.216:8089/api/touristRoutes?${paramaters.nextPage}&${paramaters.pageSize}`;
    if (paramaters.keywords) {
      url += `&keywords=${paramaters.keywords}`;
    }
    const response = await axios.get(url);
    return {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"]),
    };
  }
);

export const productSearchSlice = createSlice({
  name: `productSearch`,
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type](state) {
      state.loading = true;
    },
    [searchProduct.fulfilled.type](state, action) {
      state.loading = false;
      state.data = action.payload.data;
      state.error = null;
      state.pagination = action.payload.pagination;
    },
    [searchProduct.rejected.type](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
