import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthenticated from "./hooks/useAuthenticated";

export default function ProtectedRoutes() {
  const authenticated = useAuthenticated();
  if (authenticated === "loading") {
    return <div>Loading...</div>;
  } else if (authenticated === "false") {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
