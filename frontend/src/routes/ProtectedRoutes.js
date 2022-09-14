// eslint-disable-next-line
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { asyncLoadUser } from "features/authentication/authenSlice";

const ProtectedRoutes = (props) => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.authentication.isAuthenticated);
  // console.log("Auth ProtectedRoutes: ", Auth);

  useEffect(() => {
    dispatch(asyncLoadUser());
    // eslint-disable-next-line
  }, []);

  return Auth ? <Outlet /> : <Navigate to={"/login"} />;
  // return <Outlet />;
};

export default ProtectedRoutes;
