import { Ring } from "@uiball/loaders";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Div100vh from "react-div-100vh";
import { useLazyConvertUnitQuery } from "../../store/apis/convert-unit";
import { spinnerVariants } from "./transitions";
import UnitCSS from "./UnitConverter.module.scss";

export default function UnitConverter() {
  const [unit, setUnit] = useState("gal");
  const [value, setValue] = useState("");
  const [trigger, result, lastPromiseInfo] = useLazyConvertUnitQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger(value + unit, true);
  };

  return (
    <Div100vh className={UnitCSS.container}>
      <div className={UnitCSS.inner}>
        <div className={UnitCSS["header-container"]}>
          <h1 className={UnitCSS.header}>Unit Converter</h1>
        </div>
        <div className={UnitCSS.body}>
          <form className={UnitCSS.form} onSubmit={handleSubmit}>
            <div className={UnitCSS["form-inputs"]}>
              <input
                type="number"
                className={UnitCSS.number}
                placeholder="Enter a number"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                required
              />
              <select
                title="Unit selection"
                className={UnitCSS.options}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setUnit(e.target.value)
                }
                value={unit}
              >
                <option value="gal">gal</option>
                <option value="lbs">lbs</option>
                <option value="mi">mi</option>
                <option value="L">L</option>
                <option value="kg">kg</option>
                <option value="km">km</option>
              </select>
            </div>
            <button type="submit" className={UnitCSS.button}>
              Convert!
            </button>
          </form>
          <div className={UnitCSS.output}>
            {result.isFetching && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className={UnitCSS.spinner}
                variants={spinnerVariants}
              >
                <Ring size={25} color="white" />
              </motion.div>
            )}
            <h2 className={UnitCSS["result-header"]}>
              <div className={UnitCSS["result-text"]}>Result: </div>
              {result.error && (
                <div className={UnitCSS.error}>Error. Try again later!</div>
              )}
              {!result.error && result.data && (
                <div className={UnitCSS.result}>
                  {parseFloat(result.data.returnNum.toPrecision(10)) +
                    " " +
                    result.data.returnUnit}
                </div>
              )}
            </h2>
            {!result.error && result.data && (
              <div className={UnitCSS.info}>
                {result.data.string} at a conversion factor of approximately{" "}
                {(result.data.returnNum / result.data.initNum).toFixed(3)}.
              </div>
            )}
          </div>
        </div>
      </div>
    </Div100vh>
  );
}
