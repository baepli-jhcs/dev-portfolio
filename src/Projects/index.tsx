import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchProjects } from "../store/slices/projectsSlice";
import { pageTransition } from "../transitions";
import map from "./map";
import ProjectsCSS from "./Projects.module.scss";

export default function Projects() {
  const projectsResponse = useSelector((state: RootState) => state.projects);

  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projectsResponse.status === "error") {
      dispatch(fetchProjects());
    }
  }, [dispatch, projectsResponse]);

  let projects = map(projectsResponse.response);
  return (
    <motion.div
      className={ProjectsCSS.container}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.75 }}
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
            />
          </div>
        </div>
        <div className={ProjectsCSS.grid}>{projects}</div>
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
