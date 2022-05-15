import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetProjectQuery } from "../store/apis/get-project";
import AdminCSS from "./Admin.module.scss";
import { FaTrash } from "react-icons/fa";

export default function Admin() {
  const { data, error } = useGetProjectQuery(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [git, setGit] = useState("");
  const [demo, setDemo] = useState("");
  const [labels, setLabels] = useState("");
  let projects: JSX.Element[];
  if (data) {
    projects = data.map((project: any) => {
      return (
        <li key={project.name}>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <FaTrash onClick={(e) => void handleDelete(e, project.name)} />
        </li>
      );
    });
  } else {
    projects = [<li key="loading">Loading...</li>];
  }

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (input: string) => void
  ) => {
    setter(e.target.value);
  };
  const token = useSelector((state: RootState) => state.auth.response.token);

  const inputProject = {
    name,
    description,
    image,
    git,
    demo,
    labels: labels.split(","),
    token,
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // fetch POST request
    let response;
    try {
      response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputProject),
      });
    } catch (err) {
      return console.log(err);
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className={AdminCSS.container}>
      <h1 className={AdminCSS.header}>Admin</h1>
      <ul>{projects}</ul>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className={AdminCSS["projects-form"]}
      >
        <input
          type="text"
          placeholder="name"
          onChange={(e) => handleChange(e, setName)}
          value={name}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => handleChange(e, setDescription)}
          value={description}
        />
        <input
          type="text"
          placeholder="image"
          onChange={(e) => handleChange(e, setImage)}
          value={image}
        />
        <input
          type="text"
          placeholder="git"
          onChange={(e) => handleChange(e, setGit)}
          value={git}
        />
        <input
          type="text"
          placeholder="demo"
          onChange={(e) => handleChange(e, setDemo)}
          value={demo}
        />
        <input
          type="text"
          placeholder="enter labels, separated by spaces"
          onChange={(e) => handleChange(e, setLabels)}
          value={labels}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
