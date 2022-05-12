import { Waveform } from "@uiball/loaders";
import { motion } from "framer-motion";
import LoadingCSS from "./LoadingTransition.module.scss";
import { loadingVariants } from "./transitions";

export default function LoadingTransition() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className={LoadingCSS.container}
      variants={loadingVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={LoadingCSS.inner}
        exit={{ scale: 0, transition: { duration: 0.3 } }}
      >
        <Waveform size={75} lineWeight={5} speed={1.4} color="white" />
      </motion.div>
    </motion.div>
  );
}
