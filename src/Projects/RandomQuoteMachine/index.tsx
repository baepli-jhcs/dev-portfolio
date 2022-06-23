import { useCallback, useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useGetQuoteQuery } from "../../store/apis/fetch-quote";
import RCSS from "./RandomQuoteMachine.module.scss";

export default function RandomQuoteMachine() {
  const { data } = useGetQuoteQuery(undefined);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const setNewQuote = useCallback(() => {
    if (data) {
      let i = Math.floor(Math.random() * (data.quotes.length - 1));
      setQuote(data.quotes[i].quote);
      setAuthor(data.quotes[i].author);
    }
  }, [data, setQuote, setAuthor]);

  let tweetLink =
    "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
    encodeURIComponent('"' + quote + '" ' + author);

  useEffect(() => {
    setNewQuote();
  }, [data, setNewQuote]);
  return (
    <Div100vh className={RCSS.container}>
      <div className={RCSS.quote}>
        <div className={RCSS["quote-text"]}>{quote}</div>
        <div className={RCSS["quote-author"]}>
          -<i>{author}</i>
        </div>
        <div className={RCSS["bottom-bar"]}>
          <button className={RCSS["button"]} onClick={setNewQuote}>
            New Quote
          </button>
          <a
            className={RCSS["button"]}
            href={tweetLink}
            target="_blank"
            rel="noreferrer"
          >
            Tweet Quote
          </a>
        </div>
      </div>
    </Div100vh>
  );
}
