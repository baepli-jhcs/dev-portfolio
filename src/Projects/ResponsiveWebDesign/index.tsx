import { useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import RwdCSS from "./ResponsiveWebDesign.module.scss";
import SurveyPage from "./SurveyPage";
import TributePage from "./TributePage";
export default function ResponsiveWebDesign() {
  const [navigate, setNavigate] = useState(false);
  let { id } = useParams();
  let number: number = +id!;
  if (isNaN(number)) {
    return <Navigate to={"/projects/rwd/0"} />;
  }
  if (navigate) {
    return (
      <Navigate to={"/projects/rwd/" + (number >= 4 ? "0" : number + 1)} />
    );
  }
  return (
    <>
      <div className={RwdCSS.next} onClick={() => setNavigate(true)}>
        Next Page
      </div>
      {number === 0 && <SurveyPage />}
      {number === 1 && <TributePage />}
    </>
  );
}
