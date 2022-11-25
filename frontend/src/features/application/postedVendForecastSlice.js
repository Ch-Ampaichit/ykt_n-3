import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";
import { api_url } from "config/api";

const initialState = {
  status: "Idle",
  mail_status: "",
  datasource: [],
  currRec: {
    header: {},
    lines: [],
    periodMonth: {
      m1: "M1",
      m2: "M2",
      m3: "M3",
      m4: "M4",
    },
  },
  drawerVisible: false,
  modalVisible: false,
  errors: {
    title: "",
    content: "",
  },
};

export const PostedVendForcaseHeaderSlice = createSlice({
  name: "PostedVendForecast",
  initialState: initialState,
  reducers: {
    setModalVisible: (state, action) => {
      // console.log("OnSetModalVisible");
      state.modalVisible = action.payload;
      state.mail_status = "";
    },
    clearRec: (state, action) => {
      // state.currHeader = {};
      // state.currLines = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncInitPageData.pending, (state, action) => {
        // console.log("asyncInitPageData.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncInitPageData.fulfilled, (state, action) => {
        // console.log("asyncInitPageData.fulfiled: ", action);
        state.status = "Idle";
        state.mail_status = "";
        state.datasource = action.payload;
      })
      .addCase(asyncInitPageData.rejected, (state, action) => {
        // console.log("asyncInitPageData.rejected: ", action);
        state.status = "Rejected";
      })
      .addCase(asyncSetCurrRec.pending, (state, action) => {
        // console.log("asyncSetCurrRec.pending: ", action);
        // state.status = "Loading";
        state.mail_status = "";
      })
      .addCase(asyncSetCurrRec.fulfilled, (state, action) => {
        // console.log("asyncSetCurrRec.fulfiled: ", action);
        state.currRec.header = action.payload.header;
        state.currRec.lines = action.payload.lines;
        state.modalVisible = true;

        state.currRec.periodMonth.m1 = moment(
          new Date(action.payload.header.starting_period)
        ).format("MMM-YY");

        state.currRec.periodMonth.m2 = moment(
          new Date(action.payload.header.starting_period)
        )
          .add(1, "M")
          .format("MMM-YY");

        state.currRec.periodMonth.m3 = moment(
          new Date(action.payload.header.starting_period)
        )
          .add(2, "M")
          .format("MMM-YY");

        state.currRec.periodMonth.m4 = moment(
          new Date(action.payload.header.starting_period)
        )
          .add(3, "M")
          .format("MMM-YY");
      })
      .addCase(asyncSetCurrRec.rejected, (state, action) => {
        // console.log("asyncSetCurrRec.rejected: ", action);
      })
      .addCase(asyncSendEmail.pending, (state) => {
        state.mail_status = "Sending";
      })
      .addCase(asyncSendEmail.fulfilled, (state, action) => {
        // console.log("asyncSendEmail.fulfiled: ", action);
        // state.drawerVisible = false;
        state.mail_status = "Idle";
        // state.datasource = action.payload;
      })
      .addCase(asyncSendEmail.rejected, (state, action) => {
        state.mail_status = "Rejected";
      });
  },
});

export const { setModalVisible, clearRec } =
  PostedVendForcaseHeaderSlice.actions;

export default PostedVendForcaseHeaderSlice.reducer;

export const asyncInitPageData = createAsyncThunk(
  "PostedVendForecast/InitPageData",
  async (_, thunkAPI) => {
    // console.log("get request: ", api_url.posted_vendor_forecast);
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "GET",
        url: api_url.posted_vendor_forecast,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      //   console.log("resp: ", resp);
      return resp.data;
    } catch (err) {
      //   if (!err.response) {
      //     throw err;
      //   }
      //   console.log("Errors: ", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const asyncSetCurrRec = createAsyncThunk(
  "PostedVendForecast/GetCurrRec",
  async (dockNo, thunkAPI) => {
    // console.log("get request: ", api_url.posted_vendor_forecast);
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "GET",
        url: `${api_url.posted_vendor_forecast}${dockNo}/details/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      //   console.log("resp: ", resp);
      return resp.data;
    } catch (err) {
      //   console.log("Errors: ", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const asyncSendEmail = createAsyncThunk(
  "VendorForecast/SendEmail",
  async (doc_no, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "Post",
        url: `${api_url.posted_vendor_forecast}${doc_no}/send_email/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      // console.log("response: ", resp);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      // console.log("Error: ", err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
