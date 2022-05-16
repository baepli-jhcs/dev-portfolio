import AdminCSS from "./Admin.module.scss";
import ProjectForm from "./ProjectForm";
import ProjectsList from "./ProjectsList";

export default function Admin() {
  return (
    <div className={AdminCSS.container}>
      <h1 className={AdminCSS.header}>Admin</h1>
      <ProjectsList />
      <ProjectForm />
    </div>
  );
}
