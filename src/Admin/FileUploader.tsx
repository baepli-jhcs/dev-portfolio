import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AdminCSS from "./Admin.module.scss";

export default function FileUploader() {
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const set = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setFile(e.currentTarget.files[0]);
    }
  };

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
  };

  const token = useSelector((state: RootState) => state.auth.response.token);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const base64Uncleaned = await file2Base64(file);
    if (!base64Uncleaned) return;
    const base64 = base64Uncleaned.substring(base64Uncleaned.indexOf(",") + 1);
    let type = file.type.indexOf("image") !== -1 ? "image" : "file";
    try {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          file: base64,
          fileName: file.name,
          type,
        }),
      });
      let response = await data.json();
      setLink(response.link);
    } catch (err) {
      return console.log(err);
    }
  };
  console.log(link);
  return (
    <>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className={AdminCSS["file-form"]}
      >
        <div>{link}</div>
        <input type="file" onChange={set} />
        <button type="submit" className={AdminCSS["file-submit"]}>
          Upload
        </button>
      </form>
    </>
  );
}
