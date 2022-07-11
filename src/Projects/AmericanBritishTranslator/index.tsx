import { Ring } from "@uiball/loaders";
import { motion } from "framer-motion";
import { useState } from "react";
import Div100vh from "react-div-100vh";
import { useLazyTranslateAmericanBritishQuery } from "../../store/apis/translate-american-british";
import TransCSS from "./AmericanBritishTranslator.module.scss";
import { spinnerVariants } from "./transitions";

export default function AmericanBritishTranslator() {
  const [direction, setDirection] = useState("American -> British");
  const [value, setValue] = useState("");
  const [trigger, result, lastPromiseInfo] =
    useLazyTranslateAmericanBritishQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let locale: string;
    if (direction === "American -> British") {
      locale = "american-to-british";
    } else {
      locale = "british-to-american";
    }
    trigger({ text: value, locale }, true);
  };

  return (
    <Div100vh className={TransCSS.container}>
      <div className={TransCSS.inner}>
        <div className={TransCSS["header-container"]}>
          <h1 className={TransCSS.header}>American-British Translator</h1>
        </div>
        <div className={TransCSS.body}>
          <form className={TransCSS.form} onSubmit={handleSubmit}>
            <div className={TransCSS["input-container"]}>
              <input
                type="text"
                className={TransCSS.text}
                placeholder="Enter some text"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                required
              />
            </div>
            <div className={TransCSS["form-inputs"]}>
              <select
                title="Unit selection"
                className={TransCSS.options}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setDirection(e.target.value)
                }
                value={direction}
              >
                <option value="American -> British">
                  {"American -> British"}
                </option>
                <option value="British -> American">
                  {"British -> American"}
                </option>
              </select>
              <button type="submit" className={TransCSS.button}>
                Translate!
              </button>
            </div>
          </form>
          <div className={TransCSS.output}>
            {result.isFetching && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className={TransCSS.spinner}
                variants={spinnerVariants}
              >
                <Ring size={25} color="white" />
              </motion.div>
            )}
            <h2 className={TransCSS["result-header"]}>
              <div className={TransCSS["result-text"]}>Result: </div>
              {result.error && (
                <div className={TransCSS.error}>Error. Try again later!</div>
              )}
              {!result.error && result.data && (
                <div className={TransCSS.result}>{result.data.translation}</div>
              )}
            </h2>
          </div>
        </div>
      </div>
    </Div100vh>
  );
}
