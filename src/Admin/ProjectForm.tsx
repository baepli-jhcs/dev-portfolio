import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AdminCSS from "./Admin.module.scss";

export default function ProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [git, setGit] = useState("");
  const [demo, setDemo] = useState("");
  const [labels, setLabels] = useState("");

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
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputProject),
      });
    } catch (err) {
      return console.log(err);
    }
    window.location.reload();
  };

  return (
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
        placeholder="enter labels, separated by commas"
        onChange={(e) => handleChange(e, setLabels)}
        value={labels}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
