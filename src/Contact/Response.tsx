import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ResponseCSS from "./Response.module.scss";

export default function Response(props: { loadingState: number }) {
  const { loadingState } = props;
  let [threeDots, setThreeDots] = useState("...");
  useEffect(() => {
    if (loadingState !== 1) return;
    const interval = setInterval(() => {
      if (threeDots === "...") return setThreeDots("");
      setThreeDots(threeDots + ".");
    }, 350);
    return () => clearInterval(interval);
  }, [threeDots, setThreeDots, loadingState]);
  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{
        backgroundColor:
          loadingState === 1
            ? "rgba(173, 216, 230, 1)"
            : loadingState === 2
            ? "rgba(0, 128, 0, 1)"
            : "rgba(255, 0, 0, 1)",
        x: 0,
      }}
      exit={{ x: 300 }}
      transition={{ duration: 0.75 }}
      className={ResponseCSS.container}
    >
      <h2>
        {loadingState === 1 && "Sending" + threeDots}
        {loadingState === 2 && "Success!"}
        {loadingState === 3 && "Error... Try again!"}
      </h2>
    </motion.div>
  );
}
