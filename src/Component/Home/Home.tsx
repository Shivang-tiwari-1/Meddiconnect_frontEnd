import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { socket } from "../../Constants";
import { sendDataSocket } from "../../Sockets/Initialize_socket";

import { sideBarContent } from "../../Redux/slices/Patient.Redux";

const Home = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const address = await reverseGeocode(lat, lng);
      console.log("Your address: ", address);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  async function reverseGeocode(lat, lng) {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${"c9fe87d9e2d44cbcb1f4537850c7971b"}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].formatted;
    } else {
      return "Location not found.";
    }
  }

  const { userData } = useAppSelector((state) => state.states);
  const { isDark } = useAppSelector((state) => state.stateChange);
  const dispatch = useAppDispatch();
  console.log("-------------->", userData?.data);
  useEffect(() => {
    if (socket.connected) {
      sendDataSocket(dispatch, socket, userData?.data);
      dispatch(sideBarContent());
    }
  }, [socket]);

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
