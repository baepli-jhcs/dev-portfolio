import Project from "../types/project";
import ProjectsCSS from "./Projects.module.scss";

export default function map(projects: Project[]): JSX.Element[] | JSX.Element {
  if (!projects) return <> </>;
  let projectsReturn = projects.map((project: Project) => {
    return (
      <div className={ProjectsCSS.project} key={project.name}>
        <figure className={ProjectsCSS.figure}>
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className={ProjectsCSS.image}
          />
          <figcaption className={ProjectsCSS.overlay}>
            <a
              className={`${ProjectsCSS.demo} ${ProjectsCSS.link}`}
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </a>
            <a
              className={`${ProjectsCSS.git} ${ProjectsCSS.link}`}
              href={project.git}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </figcaption>
        </figure>
        <div className={ProjectsCSS["info-container"]}>
          <div className={ProjectsCSS.info}>
            <h2 className={ProjectsCSS.name}>{project.name}</h2>
            <p className={ProjectsCSS.description}>{project.description}</p>
          </div>
        </div>
      </div>
    );
  });
  return projectsReturn;
}
