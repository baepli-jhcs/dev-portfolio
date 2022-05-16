import { motion } from "framer-motion";
import { useState } from "react";
import { pageTransition } from "../transitions";
import ProjectsCSS from "./Projects.module.scss";

export default function Projects(props: { data: any }) {
  const [searchText, setSearchText] = useState("");
  const { data } = props;
  console.log(data.get("projects"));

  return (
    <motion.div
      className={ProjectsCSS.container}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className={ProjectsCSS.projects}>
        <h2 className={ProjectsCSS.header}>These are some of my projects:</h2>
        <div className={ProjectsCSS.filters}>
          <div className={ProjectsCSS.search}>
            <input
              type="text"
              placeholder="Search..."
              name="search"
              className={ProjectsCSS["search-input"]}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className={ProjectsCSS.grid}></div>
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
