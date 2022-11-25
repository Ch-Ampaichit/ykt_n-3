import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { auth_url } from "config/api";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: "idle",
  connectStatus: null,
  menuItems: [],
  connectStatusText: "",
};

let errorResponse = null;

export const authenSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    // LOGOUT USER
    logout: (state) => {
      // console.log("Logout");
      const token = localStorage.getItem("token");
      axios
        .post(
          auth_url.logout,
          {},
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data);
          return resp;
        })
        .catch((err) => {
          // console.log("err : ", err);
        });

      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      // localStorage.removeItem("token");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state, action) => {
        // console.log("authLogin.pending: ", action);
        state.status = "loading";
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        // console.log("authLogin.fulfilled: ", action);

        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(authLogin.rejected, (state, action) => {
        console.log("authLogin.rejected: ", errorResponse);
        state.status = "error";
      })
      .addCase(asyncLoadUser.pending, (state, action) => {
        // console.log("asyncLoadUser.pending : ", action);
        state.connectStatus = 200;
        state.status = "loading";
      })
      .addCase(asyncLoadUser.fulfilled, (state, action) => {
        // console.log("asyncLoadUser.fulfilled : ", action);
        state.status = "idle";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(asyncLoadUser.rejected, (state, action) => {
        // console.log("asyncLoadUser.rejected: ", errorResponse);
        state.status = "error";
        state.isAuthenticated = false;
        state.user = null;
        localStorage.clear();
      });
  },
});

export const asyncLoadUser = createAsyncThunk(
  "authentication/LoadUser",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios
      .get(auth_url.user, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((resp) => {
        // console.log("asyncLoadUser: ", resp.data);
        return resp;
      })
      .catch((err) => {
        // console.log("authLoadUserError: ", err.response);
        errorResponse = err.response;
      });

    // console.log("LoadUser : ", response.data);
    return response.data;
  }
);

export const authLogin = createAsyncThunk(
  "authentication/login",
  async (user) => {
    const username = user.username.toLowerCase();
    const password = user.password;

    const response = await axios
      .post(auth_url.login, {
        username,
        password,
      })
      .then((resp) => {
        // console.log("AuthLoginSuccess: ", resp.data.token);
        localStorage.setItem("token", resp.data.token);
        return resp;
      })
      .catch((err) => {
        errorResponse = err.response;
      });

    return response.data;
  }
);

export const { logout } = authenSlice.actions;

export default authenSlice.reducer;
