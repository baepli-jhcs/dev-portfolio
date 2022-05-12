import { useSelector } from "react-redux";
import { RootState } from "../store";

const useInitialLoad = () => {
  return useSelector((state: RootState) => state.initialLoad.isLoading);
};
export default useInitialLoad;
