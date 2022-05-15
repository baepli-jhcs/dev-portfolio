import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { persistor } from "..";
import { authActions } from "../store/slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    const handleLogout = async () => {
      dispatch(authActions.clear());
      await persistor.purge();
      setLoggedOut(true);
    };
    void handleLogout();
  }, [dispatch]);
  if (loggedOut) {
    return <Navigate to={"/"} />;
  }
  return <></>;
}
