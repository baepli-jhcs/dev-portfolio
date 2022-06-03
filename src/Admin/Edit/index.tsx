import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import EditCSS from "./Edit.module.scss";

export default function EditProject() {
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

  const { id } = useParams();
  const token = useSelector((state: RootState) => state.auth.response.token);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const map = new Map();
    if (name) map.set("name", name);
    if (description) map.set("description", description);
    if (image) map.set("image", image);
    if (git) map.set("git", git);
    if (demo) map.set("demo", demo);
    if (labels) map.set("labels", labels.split(","));
    map.set("token", token);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(map)),
      });
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div className={EditCSS.container}>
      <form className={EditCSS.form} onSubmit={(e) => void handleSubmit(e)}>
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
    </div>
  );
}
