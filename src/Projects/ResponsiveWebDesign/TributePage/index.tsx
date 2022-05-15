import TributeCSS from "./TributePage.module.scss";

export default function TributePage() {
  return (
    <>
      <main className={TributeCSS.main}>
        <h1 className={TributeCSS.title}>
          Cesar Chavez
          <p>An important civil rights activist and leader.</p>
        </h1>
        <figure className={TributeCSS["img-div"]}>
          <img
            id="image"
            src="https://upload.wikimedia.org/wikipedia/commons/f/f6/C%C3%A9sar_Ch%C3%A1vez.jpg"
            title="Cesar Chavez"
          />
          <figcaption className={TributeCSS["img-caption"]}>
            <i>An image of Cesar Chavez</i>
          </figcaption>
        </figure>
        <section className={TributeCSS["tribute-info"]}>
          <div className={TributeCSS.body}>
            "The Mexican-American labor leader and civil rights activist Cesar
            Chavez dedicated his life's work to what he called la causa (the
            cause): the struggle of farm workers in the United States to improve
            their working and living conditions through organizing and
            negotiating contracts with their employers.
            <br />
            <br />
            Committed to the tactics of nonviolent resistance practiced by
            Mahatma Gandhi and Martin Luther King Jr., Chavez founded the
            National Farm Workers Association (later the United Farm Workers of
            America) and won important victories to raise pay and improve
            working conditions for farm workers in the late 1960s and 1970s."
            <br />
            <br />
            This is a{" "}
            <a
              id="tribute-link"
              target="blank"
              href="https://www.history.com/topics/mexico/cesar-chavez"
            >
              good article about Censar Chavez's life and work.
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
