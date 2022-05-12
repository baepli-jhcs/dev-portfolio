import { useEffect } from "react";

const useNavOpen = (open: boolean) => {
  useEffect(() => {
    let element = document.getElementById("blur-container");
    let darken = document.getElementById("darken");
    if (!element || !darken) return;
    if (open) {
      element.classList.add("prevent-click");
      darken.classList.add("darken");
    } else {
      element.classList.remove("prevent-click");
      darken.classList.remove("darken");
    }
  }, [open]);
};
export default useNavOpen;
