import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// project import
import MainLayout from "layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoures";
import DashboardPage from "pages/Dashboard";
import Login from "pages/Authentication/Login";
import Result404Page from "pages/Response/Result404Page";
import Result500Page from "pages/Response/Result500Page";
import ItemsPage from "pages/Item";
import VendorsPage from "pages/Vendor";
import ProfilePage from "pages/Profile";
import UsersManagement from "pages/UsersManagement";
import MigrationPage from "pages/Migration";
import MRPWorksheetPage from "pages/MRPWorksheet";
import VendorForecastPage from "pages/VendorForecast";
import VendorForecastEntryPage from "pages/VendorForecastEntry";
import PostedVendorForecast from "pages/PostedVendForecast";

const MainRoute = () => {
  // const location = localStorage.getItem("currLocation");

  return (
    <Routes>
      {/* Protected Routes */}
      {/* Wrap all Route under Protected element */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate replace to={"vendor_forecast"} />}
          />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="vendor_forecast" element={<VendorForecastPage />} />
          <Route path="mrp_worksheet" element={<MRPWorksheetPage />} />
          <Route
            path="vendor_forecast_entry"
            element={<VendorForecastEntryPage />}
          />
          <Route path="items" element={<ItemsPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="approved_entries" element={<PostedVendorForecast />} />
          <Route path="users_management" element={<UsersManagement />} />
          <Route path="data_migrations" element={<MigrationPage />} />
        </Route>
      </Route>

      {/* Public Routes */}
      {/* Wrap all Route under Public Routes element */}
      <Route path="login" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/connection-errors" element={<Result500Page />} />
      <Route path="/*" element={<Result404Page />} />
    </Routes>
  );
};

export default MainRoute;
