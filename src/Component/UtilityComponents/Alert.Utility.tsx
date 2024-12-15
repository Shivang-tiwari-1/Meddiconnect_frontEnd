import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  toggleAlertCheck,
  toggleStatusCheck,
} from "../../Redux/slices/signup_login.";
import React from "react";


const Alert = () => {
  const dispatch = useAppDispatch();
  const { alert, status } = useAppSelector((state) => state.states);

  useEffect(() => {
    if (alert !== null) {
      const timer = setTimeout(() => {
        dispatch(toggleAlertCheck(null));
        dispatch(toggleStatusCheck(null));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  if (!alert) return null;

  return (
    <div
      style={{  
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        color: "white",
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        backgroundColor: status !== 200 ? "rgb(248, 113, 113)" : undefined,
      }}
      className={`border-2 flex justify-center items-center outline-none w-[30%] laptop:w-[15%] h-[10vh] rounded-xl ${
        status === 200 ? "bg-primaryGreen" : ""
      }`}
    >
      <p
        className={`${
          status === 200 ? "text-primaryBlack" : "text-white"
        } text-md font-medium`}
      >
        {alert}
      </p>
    </div>
  );
};

export default Alert;
