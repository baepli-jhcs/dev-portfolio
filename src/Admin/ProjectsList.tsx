import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetProjectQuery } from "../store/apis/get-project";
import AdminCSS from "./Admin.module.scss";

export default function ProjectsList() {
  let projects: JSX.Element[];
  const { data, error } = useGetProjectQuery(undefined);
  if (error) {
    console.log(error);
  }

  if (data) {
    projects = data.map((project: any) => {
      return (
        <li key={project.name}>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <FaTrash onClick={(e) => void handleDelete(e, project.name)} />
          <button
            onClick={() => edit(project["_id"])}
            className={AdminCSS.pedit}
          >
            Edit
          </button>
        </li>
      );
    });
  } else {
    projects = [<li key="loading">Loading...</li>];
  }
  const token = useSelector((state: RootState) => state.auth.response.token);
  const handleDelete = async (
    e: React.MouseEvent<SVGElement>,
    name: string
  ): Promise<void> => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, token }),
    });
    window.location.reload();
  };

  const edit = async (id: string): Promise<void> => {
    window.location.href = `/admin/edit/${id}`;
  };

  return <ul>{projects}</ul>;
}
