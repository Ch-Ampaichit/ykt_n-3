import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { api_url } from "config/api";

const initialState = {
  status: "Idle",
  mail_status: "Idle",
  datasource: [],
  columns: [],
  vendForcaseHeader: {},
  vend_forecast_lines: [],
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

export const vendorForecastSlice = createSlice({
  name: "vendorForecast",
  initialState: initialState,
  reducers: {
    setCurrRecord: (state, action) => {
      // console.log("CurrRec: ", action.payload);
      state.vendForcaseHeader = action.payload;
      // state.drawerVisible = true;
    },
    setDrawerVisible: (state, action) => {
      // console.log("setDrawerVisible: ", action);
      state.drawerVisible = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    clearErrors: (state) => {
      state.mail_status = "Idle";
      state.errors.title = "";
      state.errors.content = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoadDataSource.pending, (state, action) => {
        // console.log("asyncLoadDataSource.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncLoadDataSource.fulfilled, (state, action) => {
        // console.log("asyncLoadDataSource.fulfilled: ", action.payload);
        state.status = "idle";
        state.datasource = action.payload;
      })
      .addCase(asyncLoadDataSource.rejected, (state, action) => {
        // console.log("asyncLoadDataSource.rejected: ", action.payload);
        state.status = "error";
      })
      .addCase(asyncSetCurrRec.pending, (state, action) => {})
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
        console.log("asyncSetCurrRec.rejected: ", action);
      })
      .addCase(asyncPostApprove.pending, (state, action) => {
        // console.log("asyncPostApprove.pending: ", action);
      })
      .addCase(asyncPostApprove.fulfilled, (state, action) => {
        // console.log("asyncPostApprove.fulfiled: ", action);
        state.currRec.header = action.payload.data;
        state.datasource = action.payload.list;
      })
      .addCase(asyncSendEmail.pending, (state, action) => {
        // console.log("asyncSendEmail.pending: ", action);
        state.mail_status = "Loading";
        state.errors.title = "";
        state.errors.content = "";
      })
      .addCase(asyncSendEmail.fulfilled, (state, action) => {
        console.log("asyncSendEmail.fulfiled: ", action);
        // state.drawerVisible = false;
        state.modalVisible = false;
        state.mail_status = "Idle";
        state.datasource = action.payload;
      })
      .addCase(asyncSendEmail.rejected, (state, action) => {
        // console.log("asyncSendEmail.rejected: ", action);
        state.mail_status = "Rejected";
        state.modalVisible = true;
        state.errors.title = action.payload.title;
        state.errors.content = action.payload.detail;
      })
      .addCase(asyncDelete.pending, (state, action) => {
        // console.log("asyncDelete.pending: ", action);
      })
      .addCase(asyncDelete.fulfilled, (state, action) => {
        // console.log("asyncDelete.fulfiled: ", action);
        state.datasource = action.payload;
      })
      .addCase(asyncDelete.rejected, (state, action) => {
        // console.log("asyncDelete.rejected: ", action);
      });
  },
});

export const { setCurrRecord, clearErrors, setModalVisible } =
  vendorForecastSlice.actions;

export const asyncLoadDataSource = createAsyncThunk(
  "VendorForecast/LoadDataSource",
  async () => {
    const response = await async_get(api_url.vendor_forecast);
    return response.data;
  }
);

export const asyncSetCurrRec = createAsyncThunk(
  "VendorForecast/SetCurrRec",
  async (doc_no, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "GET",
        url: `${api_url.vendor_forecast}${doc_no}/details/`,
        // data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const asyncLoadVendForecastLines = createAsyncThunk(
  "VendorForecast/LoadVendForecastDetail",
  async (document_no) => {
    const response = await async_get(
      `${api_url.vend_forecast_detail}${document_no}`
    );
    return response.data;
  }
);

export const asyncDelete = createAsyncThunk(
  "VendorForecast/Delete",
  async (data, thunkAPI) => {
    // console.log("delete: ", data);
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "DELETE",
        url: `${api_url.vendor_forecast}deletes/`,
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const asyncPostApprove = createAsyncThunk(
  "VendorForecast/PostApprove",
  async (doc_no, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "Post",
        url: `${api_url.vendor_forecast}${doc_no}/approved/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
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
        url: `${api_url.vend_forecast_detail}${doc_no}/send_email/`,
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

// export const asyncLoadPdf

const async_get = async (uri) => {
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

export default vendorForecastSlice.reducer;
