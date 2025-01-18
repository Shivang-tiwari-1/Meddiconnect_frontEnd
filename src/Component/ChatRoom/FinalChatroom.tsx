import { socket } from "../../Constants";
import {
  setOpenDoctorById,
  toogleShow,
} from "../../Redux/slices/Patient.Redux";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { sendMessage } from "../../Sockets/Initialize_socket";
import InputBox from "./InputBox";
import LeftScrollBar from "./LeftScrollBar";
import Profile from "./Profile";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const FinalChatroom = () => {
  /************************************VARIABLES***********************/
  let DoctorData: any;
  /************************************USEAPPSELECTORS******************/

  const { isDark } = useAppSelector((state) => state.stateChange);
  const { showDoctorByid } = useAppSelector((state) => state.patient);
  const { message, text } = useAppSelector((state) => state.MessageSlice);
  const { userData } = useAppSelector((state) => state.states);
  const { show, doctors } = useAppSelector((state) => state.patient);
  /************************************DISPATCHERS**********************/
  const dispatch = useAppDispatch();

  /***********************************FUNCTION**************************/
  const handleToggleShow = (doctorId: string | null) => {
    dispatch(setOpenDoctorById(doctorId));
    dispatch(toogleShow());
  };


  const sendChat = (e: any) => {
    e.preventDefault();
    sendMessage(
      socket,
      dispatch,
      {
        receiver: showDoctorByid?._id, role: "receiver"
      },
      {
        sender: userData?.data?._id, role: "sender"
      },
      message,
      userData?.data?.role
    );
  };
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "other" },
    { id: 2, text: "Hi there!", sender: "me" },
  ]);
  const messageEndRef = useRef(null);
  return (
    <div
      className={`h-[85vh] w-full flex ${isDark ? "bg-lightBlack" : "bg-white"
        }  ${isDark ? "text-textWhite" : "text-black"}`}
    >
      <div className="flex-1 flex flex-col">
        <div className="h-full w-full"></div>
      </div>
      <div className={`flex-none laptop:w-[20%] h-full p-0 tablet:w-[30%]`}>
        <LeftScrollBar
          show={show}
          doctors={doctors}
          handleToggleShow={handleToggleShow}
          isDark={isDark}
        />
      </div>

      {showDoctorByid !== null ? (
        <>
          <div className="w-[80%] h-[82vh] flex flex-col justify-between ml-auto pr-4 ">
            <div className="w-full flex justify-end">
              <Profile DoctorData={showDoctorByid} isDark={isDark} />
            </div>
            <div className=" flex  flex-col justify-center items-center h-[65vh] ">
              <div className="flex flex-col space-y-2  w-[90%] h-[60vh] overflow-y-scroll custom-scrollbar">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${msg.sender === "me"
                      ? "self-end bg-blue-500"
                      : "self-start bg-gray-300"
                      } text-white px-4 py-2 rounded-lg max-w-[70%]`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messageEndRef} />{" "}
                {/* Invisible div for auto-scroll */}
              </div>
            </div>

            <div className="w-full flex justify-end">
              <InputBox message={message} sendChat={sendChat} />
            </div>
          </div>
        </>
      ) : (
        <div className="w-[80%] flex flex-col justify-between ml-auto pr-4"></div>
      )}
    </div>
  );
};

export default FinalChatroom;
