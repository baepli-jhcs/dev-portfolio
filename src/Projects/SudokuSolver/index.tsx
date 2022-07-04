import { Ring } from "@uiball/loaders";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLazySolveSudokuQuery } from "../../store/apis/solve-sudoku";
import { spinnerVariants } from "./transitions";
import SudokuCSS from "./SudokuSolver.module.scss";
import { use100vh } from "react-div-100vh";

const defaultPuzzles = [
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
  "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
  "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
  ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6",
  "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51",
];

const defaultPuzzle =
  defaultPuzzles[Math.floor(Math.random() * defaultPuzzles.length)];

export default function SudokuSolver() {
  const [puzzle, setPuzzle] = useState(defaultPuzzle.split(""));

  const handleChange = (newChar: string, index: number) => {
    const newPuzzle = [...puzzle];
    let correctChar: string;
    if (newChar === "-1") {
      correctChar = "9";
    } else if (newChar.length === 0) {
      correctChar = ".";
    } else if (newChar.length > 1) {
      correctChar = newChar[newChar.length - 1];
    } else {
      correctChar = newChar[0];
    }
    newPuzzle[index] = correctChar;
    setPuzzle(newPuzzle);
  };

  let boxes = puzzle.map((char, index) => {
    return (
      <div className={SudokuCSS.box}>
        <input
          type="number"
          title={`box ${index}`}
          value={char === "." ? "" : char}
          onChange={(e) => handleChange(e.target.value, index)}
          className={SudokuCSS.input}
        />
      </div>
    );
  });

  let gridDiv: React.RefObject<HTMLDivElement> = useRef(null);

  let borders: JSX.Element[] = [];
  for (let i = 0; i < 9; i++) {
    borders.push(<div className={SudokuCSS.border} />);
  }

  const setGridHeight = useCallback(() => {
    if (gridDiv.current)
      gridDiv.current.style.height = gridDiv.current.clientWidth + "px";
  }, []);

  useEffect(() => {
    setGridHeight();
    window.addEventListener("resize", setGridHeight);
    return () => {
      window.removeEventListener("resize", setGridHeight);
    };
  }, [setGridHeight]);

  const [trigger, result] = useLazySolveSudokuQuery();

  const handleSolve = (e: React.MouseEvent<HTMLButtonElement>) => {
    trigger(puzzle.join(""));
  };

  useEffect(() => {
    if (!result.isFetching && result.data && result.data.solution) {
      setPuzzle(result.data.solution.split(""));
    }
  }, [result]);

  const height = use100vh() || "100vh";

  return (
    <div className={SudokuCSS.container} style={{ minHeight: height }}>
      <div className={SudokuCSS.inner}>
        <div className={SudokuCSS.grid} ref={gridDiv}>
          {result.isFetching && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={SudokuCSS.spinner}
              variants={spinnerVariants}
            >
              <Ring size={30} color="white" />
            </motion.div>
          )}
          {boxes}
          <div className={SudokuCSS.borders}>{borders}</div>
        </div>

        <div className={SudokuCSS.buttons}>
          <button onClick={handleSolve} className={SudokuCSS.button}>
            Solve Puzzle
          </button>
        </div>
      </div>
    </div>
  );
}
