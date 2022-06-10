import Project from "../types/project";

export default function filterText(list: [Project], query: string) {}

const filterCallback = (project: Project, query: string) => {
  for (let label of project.labels) {
    if (label.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
  }
  if (project.name.toLowerCase().includes(query.toLowerCase())) {
    return true;
  }
};
