import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { persistor } from "..";
import { authActions } from "../store/slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);
  const handleLogout = async () => {
    dispatch(authActions.clear());
    await persistor.purge();
    setLoggedOut(true);
  };
  useEffect(() => {
    handleLogout();
  }, []);
  if (loggedOut) {
    return <Navigate to={"/"} />;
  }
  return <></>;
}
