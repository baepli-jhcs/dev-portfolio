import "./App.scss";
import Nav from "./Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRoutes from "./Routes";
import Login from "./Login";
import Admin from "./Admin";
import Logout from "./Logout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<MostRoutes />} />
      </Routes>
    </Router>
  );
}

function MostRoutes() {
  return (
    <>
      <div id="darken">
        <PageRoutes />
      </div>
      <Nav />
    </>
  );
}
