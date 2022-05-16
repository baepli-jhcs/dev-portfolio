export default function ProductLandingPage() {
  return (
    <>
      <header id="header">
        <img
          id="header-img"
          src="https://images.freecreatives.com/wp-content/uploads/2015/04/logo033.png"
          alt="logo"
        ></img>
        <nav id="nav-bar">
          <ul>
            <li>
              <a href="#header" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#robot" className="nav-link">
                The Robot
              </a>
            </li>
            <li>
              <a href="#pricing" className="nav-link">
                Pricing
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section id="robot">
        <h2>Here is a demo of the robot!</h2>
        <iframe
          id="video"
          width="750px"
          height="100%"
          src="https://www.youtube.com/embed/BpnnD_0IlbE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>
      <section id="pricing">
        <form id="form" action="https://www.freecodecamp.com/email-submit">
          <p id="form-text">
            Sign up for any special offers or news on the robot!
          </p>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <input id="submit" type="submit" value="Submit!" />
        </form>
        <div id="options">
          <div id="option1">
            <div className="description">option1</div>
          </div>
          <div id="option2">
            <div className="description">option2</div>
          </div>
        </div>
      </section>
    </>
  );
}
