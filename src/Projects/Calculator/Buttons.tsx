import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import ButtonsCSS from "./Buttons.module.scss";
import { calculatorOperationActions } from "../../store/slices/mathOperationSlice";
import { calculatorActions } from "../../store/slices/mathSlice";
import { ADD, DIVIDE, MULTIPLY } from "./constants";
let buttonNames: { [key: string]: string } = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const Buttons = (props: { mainValue: string; operationList: any }) => {
  const dispatch = useDispatch();
  const { addValue, multiplyValue, divideValue, clearValue, setValue } =
    bindActionCreators(calculatorActions, dispatch);
  const { clearList, addList, changeList } = bindActionCreators(
    calculatorOperationActions,
    dispatch
  );
  let numberButtons = [];
  for (let i = 9; i >= 0; i--) {
    numberButtons.push(
      <button
        key={i}
        className={ButtonsCSS[buttonNames[i]]}
        onClick={() => {
          if (props.operationList.length === 0) {
            setValue((props.mainValue === "0" ? "" : props.mainValue) + i);
          } else if (
            props.operationList[props.operationList.length - 1].value != null
          ) {
            changeList(
              props.operationList[props.operationList.length - 1].value + "" + i
            );
          } else {
            changeList(i + "");
          }
        }}
      >
        {i}
      </button>
    );
  }
  return (
    <div className={ButtonsCSS.buttons}>
      {numberButtons.slice(0, 3).reverse()}
      {numberButtons.slice(3, 6).reverse()}
      {numberButtons.slice(6, 10).reverse()}
      <button
        className={ButtonsCSS.decimal}
        onClick={() => {
          if (
            props.operationList.length === 0 &&
            props.mainValue.indexOf(".") === -1
          ) {
            setValue(props.mainValue + ".");
          } else if (
            props.operationList.length === 0 &&
            props.mainValue.indexOf(".") !== -1
          ) {
          } else if (
            props.operationList[props.operationList.length - 1].value !==
              null &&
            props.operationList[props.operationList.length - 1].value.indexOf(
              "."
            ) === -1
          ) {
            changeList(
              props.operationList[props.operationList.length - 1].value + "."
            );
          } else if (
            props.operationList[props.operationList.length - 1].value === null
          ) {
            changeList("0.");
          } else if (
            props.operationList[props.operationList.length - 1].value.indexOf(
              "."
            ) === -1
          ) {
            changeList("0.");
          }
        }}
      >
        .
      </button>
      <button
        className={ButtonsCSS.add}
        onClick={() => {
          if (props.operationList.length === 0) {
            addList({ type: ADD, value: null });
          } else if (
            props.operationList[props.operationList.length - 1].value !== null
          ) {
            addList({ type: ADD, value: null });
          }
        }}
      >
        +
      </button>
      <button
        className={ButtonsCSS.subtract}
        onClick={() => {
          if (props.operationList.length === 0) {
            addList({ type: ADD, value: "-" });
          } else if (
            props.operationList[props.operationList.length - 1].value === null
          ) {
            changeList("-");
          } else if (
            props.operationList[props.operationList.length - 1].value !== "-"
          ) {
            addList({ type: ADD, value: "-" });
          }
        }}
      >
        -
      </button>
      <button
        className={ButtonsCSS.multiply}
        onClick={() => {
          if (props.operationList.length === 0) {
            addList({ type: MULTIPLY, value: null });
          } else if (
            props.operationList[props.operationList.length - 1].value !== null
          ) {
            addList({ type: MULTIPLY, value: null });
          }
        }}
      >
        *
      </button>
      <button
        className={ButtonsCSS.divide}
        onClick={() => {
          if (props.operationList.length === 0) {
            addList({ type: DIVIDE, value: null });
          } else if (
            props.operationList[props.operationList.length - 1].value !== null
          ) {
            addList({ type: DIVIDE, value: null });
          }
        }}
      >
        /
      </button>
      <button
        className={ButtonsCSS.clear}
        onClick={() => {
          clearValue();
          clearList();
        }}
      >
        A/C
      </button>
      <button
        className={ButtonsCSS.equals}
        onClick={() => {
          const doMath = (pair: {
            type: string | null;
            value: string | null;
          }) => {
            if (pair.value !== (null || "-")) {
              switch (pair.type) {
                case ADD:
                  addValue(pair.value);
                  break;
                case MULTIPLY:
                  multiplyValue(pair.value);
                  break;
                case DIVIDE:
                  divideValue(pair.value);
                  break;
                default:
              }
            }
          };
          for (let i = 0; i < props.operationList.length; i++) {
            doMath(props.operationList[i]);
          }
          clearList();
        }}
      >
        =
      </button>
    </div>
  );
};
export default Buttons;
