import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import InitialTransition from "./InitialTransition";
import useInitialLoad from "./hooks/useInitialLoad";
import useLoad from "./hooks/useLoad";
import LoadingTransition from "./LoadingTransition";
import useAssets from "./hooks/useAssets";
import ResponsiveWebDesign from "./Projects/ResponsiveWebDesign";
import RandomQuoteMachine from "./Projects/RandomQuoteMachine";

export default function PageRoutes() {
  const loading = useLoad();
  const initialLoad = useInitialLoad();

  const location = useLocation();

  const assets = useAssets(location.pathname);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {!loading && !initialLoad && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home images={assets} />} />
            <Route path="/about" element={<About images={assets} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects">
              <Route index element={<Projects data={assets} />} />
              <Route
                path="random-quote-machine"
                element={<RandomQuoteMachine />}
              />
              <Route path="rwd/:id" element={<ResponsiveWebDesign />} />
              <Route path="rwd" element={<Navigate to="/projects/rwd/0" />} />
            </Route>
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
