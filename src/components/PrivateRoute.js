import { Navigate } from "react-router-dom";
import React from "react";
import { mockGetLoggedInUser } from "../mockAPIFunctions/mockUserFunctions";

export function PrivateRoute({ element }) {
  const isLoggedIn = mockGetLoggedInUser() === "" ? false : true;

  return isLoggedIn ? element : <Navigate to="/login" />;
}
