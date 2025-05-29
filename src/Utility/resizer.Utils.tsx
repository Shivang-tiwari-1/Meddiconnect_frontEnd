import {
  toggleTabletCheck,
  toogleLaptopCheck,
  toogleMobileCheck,
} from "../Redux/slices/signup_login.";
import { toggleMobileMode } from "../Redux/slices/StateChange.slice";
import { useAppDispatch } from "../Redux/Store/Store";
import { useEffect } from "react";

export const globalResizeFunction = function () {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth)
      dispatch(toggleMobileMode(window.innerWidth))
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
};
