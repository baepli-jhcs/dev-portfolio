import SurveyCSS from "./SurveyPage.module.scss";

export default function SurveyPage() {
  return (
    <div className={SurveyCSS["survey-page"]}>
      <div className={SurveyCSS.container}>
        <header className={SurveyCSS.header}>
          <h1 className={SurveyCSS.title}>Pet Ownership!</h1>
          <p className={SurveyCSS.description}>
            Are you a pet owner? Become a member of our exclusive club!
          </p>
        </header>
        <form className={SurveyCSS["survey-form"]}>
          <label id="name-label" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            placeholder="Enter your name"
            type="text"
            required
            className={SurveyCSS.regular}
          />
          <label id="email-label" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            type="email"
            required
            className={SurveyCSS.regular}
          />
          <label id="number-label" htmlFor="number">
            Number:
          </label>
          <input
            id="number"
            placeholder="Enter your number"
            type="number"
            min="100000"
            max="9999999999"
            className={SurveyCSS.regular}
          />
          <p> How much experience do you have with owning a pet?</p>
          <select className={SurveyCSS.dropdown} title="experience with pets">
            <option value="none">No Experience</option>
            <option value="little">Some Experience</option>
            <option value="experienced"> Experienced </option>
          </select>
          <p> Would you like to join our newsletter?</p>
          <div className={SurveyCSS.radio}>
            <label>
              <input
                name="join"
                value="yes"
                type="radio"
                title="join"
                defaultChecked
              />
              Yes
            </label>
            <label>
              <input name="join" value="no" type="radio" title="don't join" />
              No
            </label>
          </div>
          <p> What types of pets do you have?</p>
          <div className={SurveyCSS.checkboxes}>
            <label htmlFor="dogs">
              <input name="dogs" value="dogs" type="checkbox" /> Dogs
            </label>
            <label htmlFor="cats">
              <input name="cats" value="cats" type="checkbox" /> Cats
            </label>
            <label htmlFor="fish">
              <input name="fish" value="fish" type="checkbox" /> Fish
            </label>
          </div>
          <p>Any Addditional Comments? </p>
          <textarea title="comments" className={SurveyCSS.textarea} />
          <label htmlFor="submit">
            <input className={SurveyCSS.submit} name="submit" type="submit" />
          </label>
        </form>
      </div>
    </div>
  );
}
