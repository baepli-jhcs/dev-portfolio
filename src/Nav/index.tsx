import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";
import NavCSS from "./Nav.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { debounce } from "../utilities/debounce";
import { useDispatch } from "react-redux";
import useWindowDimensions from "../utilities/dimensions";
import { loadActions } from "../store/slices/loadSlice";
import useNavOpen from "./useNavOpen";
import { fixedNavbars } from "../controllers/fixedNavbars";
function Nav() {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const location = useLocation();
  const unOpen = (loc: string) => {
    setOpen(false);
    if (location.pathname === loc) return;
    dispatch(loadActions.startLoading());
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setOpen(false);
    });
  }, []);

  useNavOpen(open);

  useEffect(() => {
    const handleScroll = () => {
      if (fixedNavbars.get(location.pathname))
        return !visible && setVisible(true);
      debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible(
          (prevScrollPos > currentScrollPos &&
            prevScrollPos - currentScrollPos > 0) ||
            currentScrollPos < 10
        );

        setPrevScrollPos(currentScrollPos);
      }, 175)();
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, location.pathname]);

  return (
    <>
      <motion.nav
        transition={{ duration: 0.5 }}
        animate={{ top: visible || (width < 900 && open) ? "0" : "-70px" }}
        className={NavCSS.nav}
      >
        <div className={NavCSS.container}>
          <h1>BEN AEPLI</h1>
          <div className={`${NavCSS.links}` + (open ? ` ${NavCSS.open}` : "")}>
            <NavLink
              onClick={() => unOpen("/")}
              className={NavCSS.link}
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => unOpen("/about")}
              className={NavCSS.link}
              to={"/about"}
            >
              About
            </NavLink>
            <NavLink
              onClick={() => unOpen("/contact")}
              className={NavCSS.link}
              to={"/contact"}
            >
              Contact
            </NavLink>
            <NavLink
              onClick={() => unOpen("/projects")}
              className={NavCSS.link}
              to={"/projects"}
            >
              Projects
            </NavLink>
          </div>
          {open ? (
            <FaWindowClose
              onClick={() => setOpen(!open)}
              className={NavCSS["burger-menu"]}
            />
          ) : (
            <FaBars
              onClick={() => setOpen(!open)}
              className={NavCSS["burger-menu"]}
            />
          )}
        </div>
      </motion.nav>
      <div id="blur-container" onClick={() => setOpen(false)} />
    </>
  );
}
export default Nav;
