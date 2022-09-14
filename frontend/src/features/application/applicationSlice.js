import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { url } from "config/api";

export const asyncInitMRPWorksheetPage = createAsyncThunk(
  "application/asyncInitMRPWorksheetPage",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios
      .get(url.mrp_page, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((resp) => {
        return resp;
      });

    console.log("mrp_worksheet_init : ", response.data);
    return response.data;
  }
);

const initialState = {
  location: localStorage.getItem("currLocation"),
  status: "idle",
  data: [],
  jnl_batches: [],
};

export const appSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    setLocation: (state, action) => {
      localStorage.setItem("currLocation", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncInitMRPWorksheetPage.pending, (state, action) => {
        // console.log("asyncInitMRPWorksheetPage.pending");
        state.status = "loading";
      })
      .addCase(asyncInitMRPWorksheetPage.fulfilled, (state, action) => {
        console.log("asyncInitMRPWorksheetPage.fulfilled : ", action.payload);
        state.status = "idle";
        state.jnl_batches = action.payload.batches;
      });
  },
});

export const { setLocation } = appSlice.actions;

export default appSlice.reducer;
