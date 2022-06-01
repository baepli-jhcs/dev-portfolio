import Project from "../types/project";
import ProjectsCSS from "./Projects.module.scss";

export default function map(
  projects: [Project] | never[]
): JSX.Element[] | JSX.Element {
  if (!projects) return <> </>;
  let projectsReturn = projects.map((project: Project) => {
    return (
      <div className={ProjectsCSS.project}>
        <img src={project.image} alt={project.name} />
      </div>
    );
  });
  return projectsReturn;
}
