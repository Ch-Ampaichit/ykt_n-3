import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Spin } from "antd";

import { asyncLoadUser } from "features/authentication/authenSlice";

const PublicRoutues = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.authentication.isAuthenticated);
  const status = useSelector((state) => state.authentication.status);
  const connectStatus = useSelector(
    (state) => state.authentication.connectStatus
  );
  // console.log("Auth PublicRoute: ", Auth);

  useEffect(() => {
    dispatch(asyncLoadUser());
    // eslint-disable-next-line
  }, []);

  return connectStatus === 500 ? (
    <Navigate to={"/connection-errors"} />
  ) : Auth ? (
    <Navigate to={"/"} />
  ) : status === "loading" ? (
    <div className="App-header">
      <Spin />
    </div>
  ) : (
    <Outlet />
  );
};

export default PublicRoutues;
