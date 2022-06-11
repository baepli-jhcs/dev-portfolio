import Project from "../types/project";

export default function filterText(list: [Project], query: string) {
  return list.filter((project) => filterCallback(project, query));
}

const filterCallback = (project: Project, queryStr: string) => {
  let queries: RegExpMatchArray | null | string[] =
    queryStr.match(/[a-z0-9]+/gi);

  if (!queries) return true;
  queries = queries.join(" ").split(" ");
  for (let label of project.labels) {
    let found = true;
    for (let query of queries) {
      if (!label.toLowerCase().includes(query.toLowerCase())) {
        found = false;
      }
    }
    if (found) return true;
  }
  for (let query of queries) {
    if (project.name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
  }
  return false;
};
