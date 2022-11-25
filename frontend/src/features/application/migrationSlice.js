import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "config/api";

const initialState = {
  status: "Idle",
  items: [],
  itemCategories: [],
  unitsOfMeasure: [],
  vendors: [],
};

export const migrationSlice = createSlice({
  name: "migrations",
  initialState: initialState,
  reducers: {
    setUnitOfMeasureData: (state, action) => {
      state.unitsOfMeasure = action.payload;
    },
    setItemCategories: (state, action) => {
      state.itemCategories = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncImportUnitsOfMeasure.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(asyncImportUnitsOfMeasure.fulfilled, (state, action) => {
        state.status = "Idle";
        state.unitsOfMeasure = [];
      })
      .addCase(asyncImportUnitsOfMeasure.rejected, (state, action) => {
        state.status = "Rejected";
      })
      .addCase(asyncImportItemCategories.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(asyncImportItemCategories.fulfilled, (state, action) => {
        state.status = "Idle";
        state.itemCategories = [];
      })
      .addCase(asyncImportItemCategories.rejected, (state, action) => {
        state.status = "Rejected";
      })
      .addCase(asyncImportItems.pending, (state, action) => {
        console.log("asyncImportItems.pending: ", action);
        state.status = "Loading";
      })
      .addCase(asyncImportItems.fulfilled, (state, action) => {
        console.log("asyncImportItems.fulfiled: ", action);
        state.status = "Idle";
        state.items = [];
      })
      .addCase(asyncImportItems.rejected, (state, action) => {
        console.log("asyncImportItems.rejected: ", action);
        state.status = "Rejected";
      })
      .addCase(asyncImportVendors.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(asyncImportVendors.fulfilled, (state, action) => {
        state.status = "Idle";
        state.vendors = [];
      })
      .addCase(asyncImportVendors.rejected, (state, action) => {
        state.status = "Rejected";
      });
  },
});

export const { setUnitOfMeasureData, setItemCategories, setItems, setVendors } =
  migrationSlice.actions;

export default migrationSlice.reducer;

export const asyncImportItems = createAsyncThunk(
  "migrations/Items",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "POST",
        url: `${api_url.items}import_data/`,
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

export const asyncImportItemCategories = createAsyncThunk(
  "migrations/ItemCategories",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "POST",
        url: `${api_url.itemCategories}import_data/`,
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

export const asyncImportUnitsOfMeasure = createAsyncThunk(
  "migrations/UnitOfMeasure",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "POST",
        url: `${api_url.unitsOfMeasure}import_data/`,
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

export const asyncImportVendors = createAsyncThunk(
  "migrations/Vendors",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios({
        method: "POST",
        url: `${api_url.vendors}import_data/`,
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
