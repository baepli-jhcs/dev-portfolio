import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useValidateQuery } from "../store/apis/validate";

const useAuthenticated = () => {
  const token = useSelector((state: RootState) => state.auth.response.token);
  const result = useValidateQuery(token);
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
