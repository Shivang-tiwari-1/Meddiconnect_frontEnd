import SocketContext from "../../Context/Socket/SocketContext";
import { is_active } from "../../Redux/slices/Doctor.Redux";
import { fetch_chatting_pat } from "../../Redux/slices/Message.Redux";
import {
  setOpenDoctorById,
  toogleShow,
} from "../../Redux/slices/Patient.Redux";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import InputBox from "./InputBox";
import LeftScrollBar from "./LeftScrollBar";
import Profile from "./Profile";
import React, { useContext, useEffect, useRef, useState } from "react";

const FinalChatroom = React.memo(() => {
  const socket = useContext(SocketContext);

  /************************************USEAPPSELECTORS******************/
  const { isDark } = useAppSelector((state) => state.stateChange);
  const { showDoctorByid } = useAppSelector((state) => state.patient);
  const { userData, doctorData } = useAppSelector((state) => state.states);
  const { show, doctors } = useAppSelector((state) => state.patient);
  const { idtomatch } = useAppSelector(state => state.stateChange);
  const { patient_Text_records, doctor_Text_records } = useAppSelector((state) => state.MessageSlice);
  const { active_doctors } = useAppSelector((state) => state.doctor);

  /************************************DISPATCHERS**********************/
  const dispatch = useAppDispatch();
  /************************************DISPATCHERS**********************/

  /***********************************FUNCTION**************************/
  const handleToggleShow = (doctorId: string | null) => {
    dispatch(setOpenDoctorById(doctorId));
    dispatch(toogleShow());
  };
  /***********************************FUNCTION**************************/

  const messageEndRef = useRef(null);
  /************************************HOOKS**********************/



  /************************************HOOKS**********************/
  return (
    <div
      className={`h-[85vh] w-full flex ${isDark ? "bg-lightBlack" : ""
        }  ${isDark ? "text-textWhite" : "text-black"}`}
    >
      <div className="flex-1 flex flex-col">
        <div className="h-full w-full"></div>
      </div>
      <div className={`flex-none laptop:w-[20%] h-full p-0 tablet:w-[30%] `}>
        <LeftScrollBar
          show={show}
          doctors={doctors}
          handleToggleShow={handleToggleShow}
          isDark={isDark}
          socket={socket}
          senderData={userData}
        />
      </div>

      {showDoctorByid !== null ? (
        <>
          <div className={`w-[80%] h-[82vh]  flex flex-col justify-between  ml-auto px-4 ${!isDark && "bg-[#F0F0F5] rounded-2xl"}`}>
            <div className="w-full flex justify-end">
              <Profile DoctorData={showDoctorByid} isDark={isDark} />
            </div>

            <div className={`flex flex-col justify-center items-center h-[65vh] `}>
              {!doctorData?.accessToken ? (
                <div className={`flex flex-col space-y-2 w-[90%] h-[60vh] overflow-y-scroll custom-scrollbar `}>
                  {patient_Text_records.map((msg, index) => (
                    <div
                      key={index}
                      className={`${msg.role === "me" ? "  self-end bg-blue-500" : "self-start bg-gray-300"
                        } text-white px-4 py-2 rounded-lg max-w-[70%]`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              ) : (
                <div className={`flex flex-col space-y-2 w-[90%] h-[60vh] overflow-y-scroll custom-scrollbar `}>
                  {doctor_Text_records.map((msg, index) => (
                    <div
                      key={index}
                      className={`${msg.role === "sender" ? " self-start bg-gray-300" : "self-end bg-blue-500 "
                        } text-white px-4 py-2 rounded-lg max-w-[70%]`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              )}
            </div>

            <div className="w-full flex justify-end  ">
              <InputBox receiverid={idtomatch?.toString()} senderid={(userData as any)?.data?._id} socket={socket} role={(userData as any).data?.role} />
            </div>
          </div>
        </>
      ) : (
        <div className="w-[80%] flex flex-col justify-between ml-auto pr-4"></div>
      )}

    </div>
  );
});

export default FinalChatroom;
