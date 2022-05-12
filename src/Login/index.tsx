import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";
import { loginAdmin } from "../store/slices/authSlice";
import LoginCSS from "./Login.module.scss";

export default function Login() {
  const dispatch = useDispatch();
  const response: any = useSelector((state: RootState) => state.auth.response);
  const status = useSelector((state: RootState) => state.auth.status);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    dispatch(loginAdmin({ email, password }));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let errorMessage: JSX.Element | undefined;

  if (response.error) {
    if (response.error === "invalid credentials") {
      errorMessage = (
        <div className={LoginCSS.error}>Invalid email or password!</div>
      );
    } else {
      errorMessage = (
        <div className={LoginCSS.error}>
          Error fetching database. Try again in a moment.
        </div>
      );
    }
  }

  if (response.token) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div className={LoginCSS.container}>
      <form className={LoginCSS.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          className={LoginCSS.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={LoginCSS.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={LoginCSS.button} type="submit">
          Submit
        </button>
        {status !== "loading" && errorMessage}
      </form>
    </div>
  );
}
