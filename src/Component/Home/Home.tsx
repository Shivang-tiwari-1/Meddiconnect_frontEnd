import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { socket } from "../../Constants";
import { disconnected_payload, joinroom, sendDataSocket, subscribe_events } from "../../Sockets/Initialize_socket";
import { fetchAllDoctors, sideBarContent, toogleShow, toogleShow5 } from "../../Redux/slices/Patient.Redux";
import { fetch_chatting_doc } from "../../Redux/slices/Message.Redux";
import { get_day, setState } from "../../Redux/slices/StateChange.slice";

import HomeSellect from "../Repetitive_Components/HomeSellect";
import HomeCityDocSpecialization from "../Repetitive_Components/HomeCityDocSpecialization";
import HomeSearch from "../Repetitive_Components/HomeSearch";
import Homeshow from "../Repetitive_Components/Homeshow";
import HomeFeedback from "../Repetitive_Components/HomeFeedback";
import HomeFotter from "../Repetitive_Components/HomeFotter";


const Home = () => {
  const patientData = useAppSelector((state) => state.states.patientData);
  const userData = useAppSelector((state) => state.states.userData);
  const isDark = useAppSelector((state) => state.stateChange.isDark);
  const makeQuery = useAppSelector((state) => state.stateChange.makeQuery);
  const dispatch = useAppDispatch();

  async function reverseGeocode(lat, lng) {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${"c9fe87d9e2d44cbcb1f4537850c7971b"}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return {
        country: data?.results?.[0]?.components.country,
        county: data?.results?.[0]?.components.county,
        postcode: data?.results?.[0]?.components.postcode,
        State: data?.results?.[0]?.components.state,
        state_district: data?.results?.[0]?.components.state_district,
        suburb: data?.results?.[0]?.components.suburb,
        town: data?.results?.[0]?.components.town
      }
    } else {
      return "Location not found.";
    }
  };

  useEffect(() => {
    const setup = async () => {
      sendDataSocket(dispatch, socket, (userData as any)?.data);
      await subscribe_events(socket, { id: (patientData as any)?.userData?.data?._id?.toString(), role: (patientData as any)?.userData?.data?.role }, "subscribe_patient_channel");
      await subscribe_events(socket, { id: (patientData as any)?.userData?.data?._id?.toString(), role: (patientData as any)?.userData?.data?.role }, "subscribe_message_channel");
      await joinroom(socket, { roomName: "patient_information", id: (patientData as any)?.userData?.data?._id?.toString() });
      dispatch(get_day());
      await dispatch(fetch_chatting_doc());
      await dispatch(fetchAllDoctors());
    }

    if (socket.connected && patientData?.accessToken) {
      setup();
    } else {
      console.warn("socket problem")
    }
    if ((makeQuery as any).sideBarContent) {
      dispatch(sideBarContent());
    }
  }, [socket?.connected, patientData?.accessToken]);

  useEffect(() => {
    const manual_update = () => {
      disconnected_payload(socket, {
        id: (userData as any)?.data?._id,
        role: (userData as any)?.data?.role,
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const address = await reverseGeocode(lat, lng);

        dispatch(setState(address));
      });

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    window.addEventListener('beforeunload', manual_update);


    return () => {
      window.removeEventListener('beforeunload', manual_update);
    };
  }, [socket]);



  return (
    <div
      className={`flex flex-col justify-center items-center w-full  min-h-screen h-auto ${isDark ? "dark" : ""
        } ${isDark ? "bg-bgColorDarkBlack" : "bg-[#F0F0F5]"} ${isDark ? "text-black" : "text-white"
        } mobile:w-full`}
    >
      <div className={`flex flex-col   min-h-[100vh] h-auto  items-center w-[70%] ${isDark ? "bg-bgColorDarkBlack text-white" : "bg-[#FFFFFF] text-black "}  mobile:w-[95%]`}>
        <div className={`flex w-[70%] gap-4 py-5  ${isDark && "text-black"
          } mobile:w-full ${!patientData?.accessToken && "hidden"}`}>
          <div className="w-full">
            <HomeSellect />
          </div>
          <div className="w-full">
            <HomeSearch />
          </div>
        </div>
        <Homeshow />

        <HomeCityDocSpecialization />

        <HomeFeedback />
      </div>

      <div className="w-full bg-gradient-to-r from-blue-200 to-blue-400 text-white py-10 px-4 mobile:px-6 tablet:px-10 laptop:px-20">
        <HomeFotter />
      </div>

    </div >
  );
};

export default Home;
