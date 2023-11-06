import { pageTransition } from "../transitions";
import { motion } from "framer-motion";
import AboutCSS from "./About.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadActions } from "../store/slices/loadSlice";
import { useWindowWidth } from "@react-hook/window-size";

function About(props: { images: any }) {
  const dispatch = useDispatch();
  const { images } = props;

  const width = useWindowWidth();
  const imageLocation = width > 900 ? " to your left" : " above";

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={AboutCSS.container}
    >
      <div className={AboutCSS["inner-container"]}>
        <div className={AboutCSS["image-container"]}>
          <img
            className={AboutCSS.image}
            src={images.get("side")}
            alt="myself"
          />
        </div>
        <div className={AboutCSS.content}>
          <div className={AboutCSS["content-container"]}>
            <div className={AboutCSS.info}>
              <div className={AboutCSS.title}> About Me </div>
              <div className={AboutCSS.text}>
                I am a senior at the Jackson Hole Community School in Wyoming.
                These days, I primarily program graphics applications with C++,
                and I plan to pursue this passion in college and beyond. For the
                past year, I've been working on a project known as EXAGE. I also
                have some skill in web development through the MERN stack, and I
                have plenty of experience with Python and Java.
                <br />
                <br />
                On the side, I enjoy skiing, flying, and photography (the image
                {imageLocation} is one of my photos of Wyoming wildlife!).
              </div>
            </div>
            <div className={AboutCSS.buttons}>
              <Link
                onClick={() => {
                  dispatch(loadActions.startLoading());
                }}
                to="/contact"
                className={AboutCSS["contact-button"]}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default About;
