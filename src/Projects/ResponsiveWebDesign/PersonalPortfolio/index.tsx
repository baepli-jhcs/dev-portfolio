import { FaGithub } from "react-icons/fa";
import PerCSS from "./PersonalPortfolio.module.scss";

export default function PersonalPortfolio() {
  return (
    <div className={PerCSS.container}>
      <nav className={PerCSS.navbar}>
        <ul>
          <li>
            <a href="#welcome-section">About</a>
          </li>
          <li>
            <a href="#projects"> Projects </a>{" "}
          </li>
          <li>
            <a href="#social">Social</a>
          </li>
        </ul>
      </nav>
      <section className={PerCSS["welcome-section"]} id="welcome-section">
        <h1>Welcome!</h1>
        <h2 className={PerCSS.subtitle}>I am Ben Aepli, a student.</h2>
      </section>
      <section id="projects" className={PerCSS.projects}>
        <h2 className={PerCSS["projects-heading"]}>
          These are some of my projects:
        </h2>
        <div className={PerCSS["projects-section"]}>
          <a
            href="https://codepen.io/baepli-jhcs/pen/BawZJQq"
            className={PerCSS["project-tile"]}
          >
            <div className={PerCSS["project-title"]}> Project 1</div>
            <img
              className={PerCSS["project-image"]}
              src="https://cdn.freecodecamp.org/testable-projects-fcc/images/tribute.jpg"
            />
          </a>
          <a
            href="https://codepen.io/baepli-jhcs/pen/NWavPXo"
            className={PerCSS["project-tile"]}
          >
            <div className={PerCSS["project-title"]}>Project 2</div>
            <img
              className={PerCSS["project-image"]}
              src="https://cdn.freecodecamp.org/testable-projects-fcc/images/random-quote-machine.png"
            />
          </a>
          <a
            href="https://codepen.io/baepli-jhcs/pen/abLyZGg"
            className={PerCSS["project-tile"]}
          >
            <div className={PerCSS["project-title"]}>Project 3</div>
            <img
              className={PerCSS["project-image"]}
              src="https://cdn.freecodecamp.org/testable-projects-fcc/images/calc.png"
            />
          </a>
        </div>
      </section>
      <section className={PerCSS.social}>
        <h2> Find me on...</h2>
        <br />
        <a
          className={PerCSS["profile-link"]}
          href="https://github.com/baepli-jhcs"
          target="_blank"
        >
          <FaGithub /> GitHub
        </a>
      </section>
    </div>
  );
}
