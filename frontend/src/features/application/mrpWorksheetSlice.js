import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "config/api";

const initialState = {
  status: "Idle",
  jnl_batches: [],
  vendor_batch: [],
  datasource: [],
  columns: [],
};

const token = localStorage.getItem("token");

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
      });
  },
});

export const asyncInitPage = createAsyncThunk(
  "MRPWorksheet/initial",
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
      })
      .catch((err) => {
        // console.log("asyncInitPage Error: ", err);
      });

    return response.data;
  }
);

export const asyncGetMRPJournalBatch = createAsyncThunk(
  "MRPWorksheet/GetJournalBatch",
  async (batch_name) => {
    const response = await axios
      .get(`${url.mrp_journal_batch}${batch_name}/`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((resp) => {
        return resp;
      });
    return response.data;
  }
);

export const asyncImportMRPJournalLine = createAsyncThunk(
  "MRPWorksheet/import",
  async (data) => {
    // console.log("import_data: ", data);
    const response = await axios
      .post(url.import_mrp, data, {
        headers: { Authorization: `token ${token}` },
      })
      .then((resp) => {
        // console.log("return: ", resp);
        return resp;
      })
      .catch((err) => {
        console.log("Error: ", err.response);
      });
    return response.data;
  }
);

export const asyncClearAll = createAsyncThunk(
  "MRPWorksheet/clear_all",
  async (batch_name) => {
    // console.log("batch_name: ", batch_name);
    const response = await axios
      .post(
        url.clear_all_jnl_line,
        { batch_name },
        {
          headers: { Authorization: `token ${token}` },
        }
      )
      .then((resp) => {
        return resp;
      });
    return response.data;
  }
);

export const asyncDelete = createAsyncThunk(
  "MRPWorksheet/delete",
  async (pk) => {
    // console.log("batch_name: ", batch_name);
    const response = await axios
      .delete(`${url.mrp_journal_line}/${pk}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((resp) => {
        console.log("resp: ", resp);
        return resp.data;
      });
    return response.data;
  }
);

export default mrpWorksheetSlice.reducer;
