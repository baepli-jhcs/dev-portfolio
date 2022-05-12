import { LOADING } from "../delays";

export const loadingVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: LOADING,
    },
  },
};
