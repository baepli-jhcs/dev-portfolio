import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Buttons from "./Buttons";
import Display from "./Display";
import CalculatorCSS from "./Calculator.module.scss";

export default function Calculator() {
  const mainValue = useSelector((state: RootState) => state.calculator);
  const operationList = useSelector(
    (state: RootState) => state.calculatorOperation
  );
  return (
    <div className={CalculatorCSS.background}>
      <div className={CalculatorCSS.calculator}>
        <div className={CalculatorCSS["display-container"]}>
          <Display operationList={operationList} mainValue={mainValue} />
        </div>
        <div className={CalculatorCSS["buttons-container"]}>
          <Buttons operationList={operationList} mainValue={mainValue} />
        </div>
      </div>
    </div>
  );
}
