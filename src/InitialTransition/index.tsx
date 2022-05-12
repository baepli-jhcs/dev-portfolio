import { Waveform } from "@uiball/loaders";
import { motion } from "framer-motion";
import InitialCSS from "./InitialTransition.module.scss";
import { initialVariants } from "./transitions";
export default function InitialTransition() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className={InitialCSS.container}
      variants={initialVariants}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className={InitialCSS.inner}
        exit={{ scale: 0, transition: { duration: 0.3 } }}
      >
        <Waveform size={75} lineWeight={5} speed={1.4} color="white" />
      </motion.div>
    </motion.div>
  );
}
