import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useValidateQuery } from "../store/apis/validate";
import { authActions } from "../store/slices/authSlice";

const useAuthenticated = () => {
  const token = useSelector((state: RootState) => state.auth.response.token);
  const result = useValidateQuery(token);
  const dispatch = useDispatch();
  const clear = () => {
    dispatch(authActions.clear());
  };
  if (result.error) {
    clear();
    return "false";
  }
  if (result.data) {
    if (result.data.error) {
      clear();
      return "false";
    }
    return "true";
  }
  return "loading";
};

export default useAuthenticated;
