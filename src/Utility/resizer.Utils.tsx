import {
  toggleTabletCheck,
  toogleLaptopCheck,
  toogleMobileCheck,
} from "../Redux/slices/signup_login.";
import { useAppDispatch } from "../Redux/Store/Store";
import { useEffect } from "react";

export const globalResizeFunction = function () {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleResize = () => {
      console.log("mobile");
      if (window.innerWidth <= 500) {
        dispatch(toogleMobileCheck(true));
      } else {
        dispatch(toogleMobileCheck(false));
      }

      if (window.innerWidth > 500) {
        console.log("tablet");
        dispatch(toggleTabletCheck(true));
      } else {
        dispatch(toggleTabletCheck(false));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
};
