import { INITIAL, LOADING } from "../delays";

export const headerTransition = {
  initial: {
    x: "-100vw",
  },
  animate: {
    x: 0,
  },
  exit: {
    x: "100vw",
  },
};

export const subtitleTransition = {
  initial: {
    y: "50vh",
  },
  animate: {
    y: "0",
  },
  exit: {
    y: "-50vh",
  },
};

export const createHeaderTransition = (state: boolean) => {
  return {
    initial: {
      x: "-100vw",
    },
    animate: {
      x: 0,
      transition: {
        duration: 0.55,
        delay: state ? INITIAL : LOADING,
      },
    },
    exit: {
      x: "100vw",
    },
  };
};

export const createSubtitleTransition = (state: boolean, type: number) => {
  return {
    initial: {
      y: "70vh",
    },
    animate: {
      y: "0",
      transition: {
        duration: 0.8 - (type === 1 ? 0.1 : 0),
        delay: 0.1 + (state ? INITIAL : LOADING) + (type === 1 ? 0.2 : 0),
      },
    },
    exit: {
      y: "-70vh",
    },
  };
};
