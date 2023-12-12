import { Navigate } from "react-router-dom";
import React from "react";
import { mockGetLoggedInUser } from "../mockAPIFunctions/mockUserFunctions";

export function PrivateRoute({ element }) {
  const getLoggedInUser = mockGetLoggedInUser()
  const isLoggedIn = (getLoggedInUser && getLoggedInUser !== "") ? true : false;

  return isLoggedIn ? element : <Navigate to="/login" />;
}
