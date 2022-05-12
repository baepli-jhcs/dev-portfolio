import { INITIAL } from "../delays";

export const initialVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: INITIAL,
    },
  },
};
