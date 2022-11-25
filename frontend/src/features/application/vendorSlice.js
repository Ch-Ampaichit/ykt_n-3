import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "config/api";

const initialState = {
  status: "Idle",
  datasource: [],
  columns: [],
};

export const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoadVendor.pending, (state, action) => {
        // console.log("asyncLoadVendor.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncLoadVendor.fulfilled, (state, action) => {
        // console.log("asyncLoadVendor.fulfilled: ", action);
        state.datasource = action.payload;
        state.status = "Idle";
      })
      .addCase(asyncUpdateVendor.pending, (state, action) => {
        // console.log("asyncUpdateVendor.pending: ", action);
      })
      .addCase(asyncUpdateVendor.fulfilled, (state, action) => {
        // console.log("asyncUpdateVendor.fulfilled", action);
        state.datasource = action.payload;
      });
  },
});

export const { updateVendor } = vendorSlice.actions;

export const asyncLoadVendor = createAsyncThunk(
  "vendor/LoadVendors",
  async () => {
    const response = await axios_get(api_url.vendors);
    return response.data;
  }
);

export const asyncUpdateVendor = createAsyncThunk(
  "vendor/update",
  async (vendor) => {
    // console.log("vendor data: ", vendor);
    const response = await axios_put(`${api_url.vendors}${vendor.no}/`, vendor);
    return response.data;
  }
);

const axios_get = async (uri) => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(uri, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return resp;
  } catch (err) {}
};

const axios_put = async (uri, data) => {
  // console.log("uri: ", uri);
  const token = localStorage.getItem("token");
  try {
    const resp = await axios({
      method: "put",
      url: uri,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    return resp;
  } catch (err) {}
};

export default vendorSlice.reducer;
