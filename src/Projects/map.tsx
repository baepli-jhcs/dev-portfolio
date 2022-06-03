import Project from "../types/project";
import ProjectsCSS from "./Projects.module.scss";

export default function map(
  projects: [Project] | never[]
): JSX.Element[] | JSX.Element {
  if (!projects) return <> </>;
  let projectsReturn = projects.map((project: Project) => {
    return (
      <div className={ProjectsCSS.project} key={project.name}>
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className={ProjectsCSS.image}
        />
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
