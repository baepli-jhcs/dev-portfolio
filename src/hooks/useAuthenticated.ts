import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useValidateQuery } from "../store/apis/validate";

const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState("loading");
  const token = useSelector((state: RootState) => state.auth.response.token);
  const result = useValidateQuery(token);
  console.log(result);
  if (result.error) {
    return "false";
  }
  if (result.data) {
    if (result.data.error) return "false";
    return "true";
  }
  return "loading";
};

export default useAuthenticated;
