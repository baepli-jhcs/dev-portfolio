import { FormEvent, FormEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetProjectQuery } from "../store/apis/get-project";
import { useSubmitProjectQuery } from "../store/apis/submit-project";

export default function Admin() {
  const { data, error } = useGetProjectQuery(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [git, setGit] = useState("");
  const [demo, setDemo] = useState("");
  const [labels, setLabels] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);
  let projects: JSX.Element[];
  if (data) {
    projects = data.map((project: any) => {
      return (
        <li key={project.name}>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </li>
      );
    });
  } else {
    projects = [<li key="loading">Loading...</li>];
  }

  console.log(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (input: string) => void
  ) => {
    setter(e.target.value);
  };

  const inputProject = {
    name,
    description,
    image,
    git,
    demo,
    labels: labels.split(","),
  };
  const token = useSelector((state: RootState) => state.auth.response.token);
  const submitProject = { project: inputProject, token };

  console.log(useSubmitProjectQuery(submitProject, { skip: !shouldSubmit }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShouldSubmit(true);
  };
  return (
    <>
      <div>Admin</div>
      <ul>{projects}</ul>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}
