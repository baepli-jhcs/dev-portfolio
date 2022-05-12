import { pageTransition } from "../transitions";
import { motion } from "framer-motion";
import AboutCSS from "./About.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadActions } from "../store/slices/loadSlice";

function About(props: { images: any }) {
  const dispatch = useDispatch();
  const { images } = props;
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={AboutCSS.container}
    >
      <div className={AboutCSS["image-container"]}>
        <img className={AboutCSS.image} src={images.get("side")} alt="myself" />
      </div>
      <div className={AboutCSS.content}>
        <div className={AboutCSS.info}>
          <div className={AboutCSS.title}> About Me </div>
          <div className={AboutCSS.text}>
            I am a high school student with a passion for software development
            and programming. I am currently a sophomore at the Jackson Hole
            Community School. I mostly work with ReactJS and TypeScript, but am
            also comfortable with the MERN stack and other modern web
            development technologies. Along with this, I also work with the
            Java, Python, and C++ programming languages, including libraries
            such as NumPy, Pandas, and Tensorflow. I also enjoy game development
            with Unreal Engine.
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
    </motion.div>
  );
}
export default About;
