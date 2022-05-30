import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect, useState, useRef, LegacyRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BreakCSS from "./BreakClock.module.scss";
import { motion } from "framer-motion";
import { RootState } from "../../store";
import { clockActions } from "../../store/slices/clockSlice";
import { breakActions } from "../../store/slices/breakSlice";

function App() {
  const clockValue = useSelector((state: RootState) => state.clock);
  const breakValue = useSelector((state: RootState) => state.break);
  const dispatch = useDispatch();
  const {
    incrementClock,
    decrementClock,
    restartClock,
    resetClock,
    timeClock,
  } = bindActionCreators(clockActions, dispatch);
  const {
    incrementBreak,
    decrementBreak,
    restartBreak,
    resetBreak,
    timeBreak,
  } = bindActionCreators(breakActions, dispatch);
  const [play, setPlay] = useState(false);
  const [settings, setSettings] = useState(false);
  const currentPlay = useRef("Session");
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  let settingsSize;
  let mainSize;
  if (matches) {
    settingsSize = 20;
    mainSize = 80;
  } else {
    settingsSize = 40;
    mainSize = 100;
  }
  const audio: LegacyRef<HTMLAudioElement> | undefined = useRef(null);
  const decreaseTime = () => {
    if (clockValue[1] === "00:00") {
      currentPlay.current = "Break";
      restartClock();
    } else if (breakValue[1] === "00:00") {
      currentPlay.current = "Session";
      restartBreak();
    } else if (currentPlay.current === "Session") {
      if (!audio.current) return;
      if (clockValue[1] === "00:01") audio.current.play();
      timeClock();
    } else if (currentPlay.current === "Break") {
      if (!audio.current) return;
      if (breakValue[1] === "00:01") audio.current.play();
      timeBreak();
    }
  };
  useEffect(() => {
    if (!play) return;
    const className = setInterval(decreaseTime, 1000);
    return () => clearInterval(className);
    // eslint-disable-next-line
  }, [play, clockValue[1], breakValue[1]]);

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <div className={BreakCSS.container}>
      <div className={BreakCSS["main-container"]}>
        <motion.div
          animate={{
            width: settings ? mainSize + "%" : "100%",
            borderRadius: !matches
              ? "0px 0px 0px 0px"
              : settings
              ? "50px 0px 0px 50px"
              : "50px 50px 50px 50px",
            padding: "2.2%",
          }}
          transition={{ duration: 0.3 }}
          className={BreakCSS["timer-container"]}
        >
          <div className={BreakCSS["timer-label"]}>
            {currentPlay.current === "Break"
              ? "Take a break!"
              : "Time to focus!"}
          </div>
          <div className={BreakCSS["time-left"]}>
            {currentPlay.current === "Break" ? breakValue[1] : clockValue[1]}
          </div>
          <button
            className={`${BreakCSS.start_stop} ${BreakCSS["main-controls"]}`}
            onClick={() => {
              setPlay(!play);
            }}
          >
            {play ? "Pause" : "Play"}
          </button>
          <button
            className={`${BreakCSS.reset} ${BreakCSS["main-controls"]}`}
            onClick={() => {
              if (!audio.current) return;
              audio.current.pause();
              audio.current.currentTime = 0;
              currentPlay.current = "Session";
              resetBreak();
              resetClock();
              setPlay(false);
            }}
          >
            Reset
          </button>
          <button
            className={BreakCSS.settings}
            onClick={() => setSettings(!settings)}
          >
            Settings
          </button>
        </motion.div>
        <motion.div
          animate={{ width: settings ? settingsSize + "%" : "0%" }}
          className={BreakCSS["timer-settings"]}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`${BreakCSS["session-label"]} ${BreakCSS["settings-label"]}`}
          >
            Session Length: &nbsp;
            <div className={BreakCSS["session-length"]}>
              {parseInt(clockValue[0].substring(0, 2))}
            </div>
          </div>
          <button
            className={BreakCSS["session-increment"]}
            onClick={() => {
              if (!play && parseInt(clockValue[0].substring(0, 2)) < 60)
                incrementClock();
            }}
          >
            +
          </button>
          <button
            className={BreakCSS["session-decrement"]}
            onClick={() => {
              if (!play && parseInt(clockValue[0].substring(0, 2)) > 1)
                decrementClock();
            }}
          >
            -
          </button>
          <div
            className={`${BreakCSS["break-label"]} ${BreakCSS["settings-label"]}`}
          >
            Break Length: &nbsp;
            <div className={BreakCSS["break-length"]}>
              {parseInt(breakValue[0].substring(0, 2))}
            </div>
          </div>
          <button
            className={BreakCSS["break-increment"]}
            onClick={() => {
              if (!play && parseInt(breakValue[0].substring(0, 2)) < 60)
                incrementBreak();
            }}
          >
            +
          </button>
          <button
            className={BreakCSS["break-decrement"]}
            onClick={() => {
              if (!play && parseInt(breakValue[0].substring(0, 2)) > 1)
                decrementBreak();
            }}
          >
            -
          </button>
        </motion.div>
      </div>
      <audio
        className="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ref={audio}
      />
    </div>
  );
}

export default App;
