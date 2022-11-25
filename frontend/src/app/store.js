import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "features/authentication/authenSlice";
import applicationReducer from "features/application/applicationSlice";
import mrpWorksheetReducer from "features/application/mrpWorksheetSlice";
import vendorReducer from "features/application/vendorSlice";
import migrationReducer from "features/application/migrationSlice";
import vendorForecastReducer from "features/application/vendorForecastSlice";
import postedVendorForecastReducer from "features/application/postedVendForecastSlice";

export const store = configureStore({
  reducer: {
    authentication: authenReducer,
    application: applicationReducer,
    mrp_worksheet: mrpWorksheetReducer,
    vend_forecast: vendorForecastReducer,
    posted_vend_forecast: postedVendorForecastReducer,
    vendors: vendorReducer,
    migration: migrationReducer,
  },
});
