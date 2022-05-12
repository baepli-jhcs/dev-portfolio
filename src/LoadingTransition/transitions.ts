import { LOADING } from "../delays";

export const loadingVariants = {
  initial: {
    x: "0vw",
    opacity: 0,
  },
  animate: {
    x: "0vw",
    opacity: 1,
    transition: {
      duration: 1.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: LOADING,
    },
  },
};
