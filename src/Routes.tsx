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
import MarkdownPreviewer from "./Projects/MarkdownPreviewer";
import DrumMachine from "./Projects/DrumMachine";
import Calculator from "./Projects/Calculator";
import BreakClock from "./Projects/BreakClock";
import UnitConverter from "./Projects/UnitConverter";
import SudokuSolver from "./Projects/SudokuSolver";
import AmericanBritishTranslator from "./Projects/AmericanBritishTranslator";

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
              <Route
                path="markdown-previewer"
                element={<MarkdownPreviewer />}
              />
              <Route
                path="american-british-translator"
                element={<AmericanBritishTranslator />}
              />
              <Route path="drum-machine" element={<DrumMachine />} />
              <Route path="calculator" element={<Calculator />} />
              <Route path="break-clock" element={<BreakClock />} />
              <Route path="unit-converter" element={<UnitConverter />} />
              <Route path="sudoku-solver" element={<SudokuSolver />} />
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
