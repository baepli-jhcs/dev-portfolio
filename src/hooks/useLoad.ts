import { useSelector } from "react-redux";
import { RootState } from "../store";

const useLoad = () => {
  return useSelector((state: RootState) => state.load.isLoading);
};

export default useLoad;
