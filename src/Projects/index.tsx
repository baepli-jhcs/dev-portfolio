import { motion } from "framer-motion";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { pageTransition } from "../transitions";
import filterText from "./filter";
import map from "./map";
import ProjectsCSS from "./Projects.module.scss";

export default function Projects(props: { data: any }) {
  const [searchText, setSearchText] = useState("");
  const projects = props.data.get("projects");
  const labels: MutableRefObject<string[]> = useRef([]);

  useEffect(() => {
    for (let project of projects) {
      labels.current = labels.current.concat(project.labels);
    }
  }, [projects]);

  const filtered = filterText(projects, searchText);
  const mapped = map(filtered);

  return (
    <motion.div
      className={ProjectsCSS.container}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className={ProjectsCSS.inner}>
        <h1 className={ProjectsCSS.header}>Projects</h1>
        <p className={ProjectsCSS.description}>
          Check out my latest projects! These demonstrate a wide varety of
          skills including React and Express web development, C++ with Unreal
          and Arduino, Python and Data Science, and Java.
        </p>
        <label htmlFor="input">
          <input
            type="search"
            title="Search"
            placeholder="Portfolio"
            className={ProjectsCSS.search}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>

        <div className={ProjectsCSS.grid}>{mapped}</div>
      </div>
      {/* <footer className={ProjectsCSS.footer}>
        <h2>Find me on...</h2>
        <a
          className={ProjectsCSS.profile}
          title="link"
          href="https://github.com/baepli-jhcs"
          target="_blank"
        >
          <FaGithub className={ProjectsCSS.icon} /> GitHub
        </a>
      </footer> */}
    </motion.div>
  );
}
