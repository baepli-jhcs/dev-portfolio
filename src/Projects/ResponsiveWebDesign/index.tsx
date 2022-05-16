import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ProductLandingPage from "./ProductLandingPage";
import RwdCSS from "./ResponsiveWebDesign.module.scss";
import SurveyPage from "./SurveyPage";
import TechnicalDocumentationPage from "./TechnicalDocumentationPage";
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
      {number === 0 && <TechnicalDocumentationPage />}
      {number === 2 && <SurveyPage />}
      {number === 3 && <TributePage />}
      {number === 4 && <ProductLandingPage />}
    </>
  );
}
