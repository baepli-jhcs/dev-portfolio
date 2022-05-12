import HomeCSS from "./Home.module.scss";
import { motion } from "framer-motion";
import { pageTransition } from "../transitions";
import {
  createHeaderTransition,
  createSubtitleTransition,
} from "./transitions";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadActions } from "../store/slices/loadSlice";
import useInitialLoad from "../hooks/useInitialLoad";
function Home(props: { images: any }) {
  const { images } = props;
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const initialLoad = useInitialLoad();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={HomeCSS.container}
    >
      <div className={`content ${HomeCSS["title-container"]}`}>
        <div className={HomeCSS.title}>
          <motion.h1
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            variants={createHeaderTransition(initialLoad)}
            className={HomeCSS["main-title"]}
          >
            Benjamin Aepli
          </motion.h1>
          <motion.h3
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7 }}
            variants={createSubtitleTransition(initialLoad, 0)}
            className={HomeCSS.subtitle}
          >
            A Responsive Web Developer
          </motion.h3>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
            variants={createSubtitleTransition(initialLoad, 1)}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
          >
            <Link
              onClick={() => {
                dispatch(loadActions.startLoading());
              }}
              to="/about"
              className={HomeCSS["about-button"]}
            >
              About Me
              <motion.div
                className={HomeCSS["about-icon"]}
                animate={{ opacity: hover ? 1 : 0, width: hover ? 20 : 0 }}
                transition={{ type: "tween" }}
                initial="hide"
              >
                <FaArrowRight />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className={HomeCSS.background}>
        <img
          className={HomeCSS.image}
          src={images.get("background")}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 100vw"
          alt="laptop with code"
        ></img>
      </div>
    </motion.div>
  );
}
export default Home;
