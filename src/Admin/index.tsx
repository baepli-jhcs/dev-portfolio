import { Navigate } from "react-router-dom";
import useAuthenticated from "../hooks/useAuthenticated";

export default function Admin() {
  const isAuthenticated = useAuthenticated();
  if (isAuthenticated === "false") {
    return <Navigate to="/login" />;
  }
  return <div>Admin</div>;
}
