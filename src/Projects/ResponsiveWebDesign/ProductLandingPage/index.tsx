import ProdCSS from "./ProductLandingPage.module.scss";

export default function ProductLandingPage() {
  return (
    <>
      <header className={ProdCSS.header}>
        <img
          className={ProdCSS["header-img"]}
          src="https://images.freecreatives.com/wp-content/uploads/2015/04/logo033.png"
          alt="logo"
        ></img>
        <nav className={ProdCSS["nav"]}>
          <ul>
            <li>
              <a href="#header" className={ProdCSS["nav-link"]}>
                Home
              </a>
            </li>
            <li>
              <a href="#robot" className={ProdCSS["nav-link"]}>
                The Robot
              </a>
            </li>
            <li>
              <a href="#pricing" className={ProdCSS["nav-link"]}>
                Pricing
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section id="robot" className={ProdCSS.robot}>
        <h2>Here is a demo of the robot!</h2>
        <iframe
          className={ProdCSS.video}
          width="750px"
          height="100%"
          src="https://www.youtube.com/embed/BpnnD_0IlbE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>
      <section id="pricing" className={ProdCSS.pricing}>
        <form
          className={ProdCSS.form}
          action="https://www.freecodecamp.com/email-submit"
        >
          <p className={ProdCSS["form-text"]}>
            Sign up for any special offers or news on the robot!
          </p>
          <input
            name="email"
            className={ProdCSS.email}
            type="email"
            placeholder="Enter your email address"
            required
          />
          <input className={ProdCSS.submit} type="submit" value="Submit!" />
        </form>
        <div className={ProdCSS.options}>
          <div className={ProdCSS.option1}>
            <div className={ProdCSS.description}>option1</div>
          </div>
          <div className={ProdCSS.option2}>
            <div className={ProdCSS.description}>option2</div>
          </div>
        </div>
      </section>
    </>
  );
}
