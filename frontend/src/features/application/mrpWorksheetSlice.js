import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "config/api";

const initialState = {
  status: "Idle",
  jnl_batches: [],
  vendor_batch: [],
  datasource: [],
  columns: [],
};

export const mrpWorksheetSlice = createSlice({
  name: "mrpWorksheet",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncInitPage.pending, (state, action) => {
        // console.log("asyncInitPage.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncInitPage.fulfilled, (state, action) => {
        // console.log("asyncInitPage.fulfilled: ", action);
        state.status = "idle";
        state.jnl_batches = action.payload.batches;
        state.datasource = action.payload.data.journal_line;
        state.vendor_batch = action.payload.data.vendor;
      })
      .addCase(asyncInitPage.rejected, (state, action) => {
        // console.log("asyncInitPage.rejected: ", action);
        state.status = "error";
      })
      .addCase(asyncGetMRPJournalBatch.pending, (state, action) => {
        // console.log("asyncGetMRPJournalBatch.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncGetMRPJournalBatch.fulfilled, (state, action) => {
        // console.log("asyncGetMRPJournalBatch.fulfilled: ", action);
        state.status = "idle";
        state.datasource = action.payload.journal_line;
        state.vendor_batch = action.payload.vendor;
      })
      .addCase(asyncGetMRPJournalBatch.rejected, (state, action) => {
        // console.log("asyncGetMRPJournalBatch.rejected", action);
        state.status = "error";
      })
      .addCase(asyncImportMRPJournalLine.pending, (state, action) => {
        // console.log("asyncImportMRPJournalLine.pending: ", action);
        state.status = "Importing";
      })
      .addCase(asyncImportMRPJournalLine.fulfilled, (state, action) => {
        // console.log("asyncImportMRPJournalLine.fulfilled: ", action);
        state.status = "idle";
        state.datasource = action.payload.data.journal_line;
        state.vendor_batch = action.payload.data.vendor;
      })
      .addCase(asyncImportMRPJournalLine.rejected, (state, action) => {
        // console.log("asyncImportMRPJournalLine.rejected: ", action);
        state.status = "error";
      })
      .addCase(asyncClearAll.pending, (state, action) => {
        // console.log("asyncClearAll.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncClearAll.fulfilled, (state, action) => {
        // console.log("asyncClearAll.fulfilled: ", action);
        state.status = "idle";
        state.datasource = [];
        state.vendor_batch = [];
      })
      .addCase(asyncClearAll.rejected, (state, action) => {
        // console.log("asyncClearAll.rejected: ", action);
        state.status = "error";
      })
      .addCase(asyncDelete.pending, (state, action) => {
        // console.log("asyncClearAll.pending: ", action);
        state.status = "idle";
        state.datasource = [];
      })
      .addCase(asyncDelete.fulfilled, (state, action) => {
        // console.log("asyncClearAll.fulfilled: ", action);
        state.status = "idle";
        // state.datasource = [];
      })
      .addCase(asyncDelete.rejected, (state, action) => {
        // console.log("asyncClearAll.rejected: ", action);
      })
      .addCase(asyncGenVendForecast.pending, (state, action) => {
        // console.log("asyncGenVendForecast.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncGenVendForecast.fulfilled, (state, action) => {
        // console.log("asyncGenVendForecast.fulfilled: ", action);
        state.status = "idle";
        state.datasource = [];
      });
  },
});

export const asyncInitPage = createAsyncThunk(
  "MRPWorksheet/initial",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "GET",
        url: api_url.mrp_page,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        // data,
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

export const asyncGetMRPJournalBatch = createAsyncThunk(
  "MRPWorksheet/GetJournalBatch",
  async (batch_name, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "GET",
        url: `${api_url.mrp_journal_batch}${batch_name}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        // data,
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

export const asyncImportMRPJournalLine = createAsyncThunk(
  "MRPWorksheet/import",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "POST",
        url: api_url.import_mrp,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        data,
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

export const asyncClearAll = createAsyncThunk(
  "MRPWorksheet/clear_all",
  async (req, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "DELETE",
        url: api_url.clear_all_jnl_line,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        data: req,
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

export const asyncGenVendForecast = createAsyncThunk(
  "MRPWorksheet/GenVendForecast",
  async (period_data, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "POST",
        url: api_url.gen_vend_forecast,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        data: period_data,
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

export const asyncDelete = createAsyncThunk(
  "MRPWorksheet/delete",
  async (pk, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "DELETE",
        url: `${api_url.mrp_journal_line}${pk}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        // data,
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

export default mrpWorksheetSlice.reducer;
