import React from "react";
import { useAppSelector } from "../Redux/Store/Store";
import NavBarComponents from "./Repetitive_Components/NavBarComponents";

const Navbar = () => {
  const { isDark } = useAppSelector((state) => state.stateChange);


  return (
    <div className={`sticky top-0 z-10  ${isDark ? "dark" : ""}`}>
      <NavBarComponents />
    </div>
  );
};

export default React.memo(Navbar);
