import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { GetNotification } from "../../Redux/slices/Notification.Redux";
import { socket } from "../../Constants";

const Home = () => {
  const { accessToken } = useAppSelector((state) => state.states);
  const { isDark } = useAppSelector((state) => state.stateChange);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(GetNotification());
   
    }
  }, [dispatch, accessToken]);

  return (
    <div
      className={`flex justify-center items-center w-full h-[100vh] ${
        isDark ? "dark" : ""
      } ${isDark ? "bg-bgColorDarkBlack" : "bg-white"} ${
        isDark ? "text-textWhite" : "text-black"
      }`}
    >
      <div>Homes</div>
    </div>
  );
};

export default Home;
