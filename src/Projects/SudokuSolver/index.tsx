import { useCallback, useEffect, useRef, useState } from "react";
import Div100vh from "react-div-100vh";
import SudokuCSS from "./SudokuSolver.module.scss";

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
  const [puzzle, setPuzzle] = useState(defaultPuzzle);

  const handleChange = (newChar: string, index: number) => {
    const newPuzzle =
      puzzle.slice(0, index) + newChar + puzzle.slice(index + 1);
    setPuzzle(newPuzzle);
  };

  let boxes = puzzle.split("").map((char, index) => {
    return (
      <div className={SudokuCSS.box}>
        <input
          type="text"
          title={`box ${index}`}
          value={char === "." ? "" : char}
          onChange={(e) => handleChange(e.target.value, index)}
          className={SudokuCSS.input}
        />
      </div>
    );
  });

  let gridDiv: React.RefObject<HTMLDivElement> = useRef(null);

  let enclosures: JSX.Element[] = [];
  for (let i = 0; i < 9; i++) {
    enclosures.push(
      <div className={SudokuCSS.enclosure}>{boxes.slice(i * 9, i * 9 + 9)}</div>
    );
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

  return (
    <Div100vh className={SudokuCSS.container}>
      <div className={SudokuCSS.grid} ref={gridDiv}>
        {enclosures}
      </div>
    </Div100vh>
  );
}
