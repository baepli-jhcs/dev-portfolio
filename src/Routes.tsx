import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import InitialTransition from "./InitialTransition";
import { initialLoadActions } from "./store/slices/initialLoadSlice";
import useInitialLoad from "./hooks/useInitialLoad";
import useLoad from "./hooks/useLoad";
import LoadingTransition from "./LoadingTransition";
import useAssets from "./hooks/useAssets";

export default function PageRoutes() {
  const loading = useLoad();
  const initialLoad = useInitialLoad();

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      dispatch(initialLoadActions.stopLoading());
    }, 300);
  }, [dispatch]);

  const assets = useAssets(location.pathname);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {!loading && !initialLoad && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home images={assets} />} />
            <Route path="/about" element={<About images={assets} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {initialLoad && <InitialTransition />}
        {loading && <LoadingTransition />}
      </AnimatePresence>
    </>
  );
}
