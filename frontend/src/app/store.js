import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "features/authentication/authenSlice";
import applicationReducer from "features/application/applicationSlice";
import mrpWorksheetReducer from "features/application/mrpWorksheetSlice";

export const store = configureStore({
  reducer: {
    authentication: authenReducer,
    application: applicationReducer,
    mrp_worksheet: mrpWorksheetReducer,
  },
});
