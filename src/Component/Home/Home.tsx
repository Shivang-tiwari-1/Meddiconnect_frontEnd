import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { GetNotification } from "../../Redux/slices/Notification.Redux";
import { socket } from "../../Constants";
import {
  receivedmessage,
  sendDataSocket,
} from "../../Sockets/Initialize_socket";

const Home = () => {
  const { doc_accessToken, pat_accessToken, userData } = useAppSelector(
    (state) => state.states
  );
  const { isDark } = useAppSelector((state) => state.stateChange);
  const dispatch = useAppDispatch();

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
