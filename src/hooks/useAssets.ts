import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../controllers/loading";
import { loadActions } from "../store/slices/loadSlice";
import Asset from "../types/asset";

const useAssets = (location: string) => {
  const [assets, setAssets] = useState<Map<string, string>>(new Map());
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAssets = async (required: [Asset]) => {
      let all = await Loading.fetchAssets(required);
      setAssets(all);
      dispatch(loadActions.stopLoading());
    };

    setAssets(new Map());
    let required: [Asset] | [] = Loading.getRequiredAssets(location);
    if (required.length === 0) {
      dispatch(loadActions.stopLoading());
      return;
    }
    void fetchAssets(required);
  }, [location, dispatch]);

  return assets;
};

export default useAssets;
