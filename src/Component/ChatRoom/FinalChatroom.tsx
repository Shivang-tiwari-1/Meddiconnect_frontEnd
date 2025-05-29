import { BsChatFill } from "react-icons/bs";
import SocketContext from "../../Context/Socket/SocketContext";
import { useAppSelector } from "../../Redux/Store/Store";
import { globalResizeFunction } from "../../Utility/resizer.Utils";
import ChatArea from "../Repetitive_Components/ChatArea";
import InputBox from "./InputBox";
import LeftScrollBar from "./LeftScrollBar";
import Profile from "./Profile";
import React from "react";

const FinalChatroom = React.memo(() => {
  const showDoctorByid = useAppSelector((state) => state.patient.showDoctorByid);
  const isDark = useAppSelector((state) => state.stateChange.isDark);
  const isMobile = useAppSelector((state) => state.stateChange.isMobile);

  globalResizeFunction();

  return (
    <div
      className={`h-[84vh] w-full flex  ${isDark ? "bg-lightBlack" : ""

        }  ${isDark ? "text-textWhite" : "text-black"}`}
    >

      {!isMobile ? (
        <div className="h-[84vh] w-full flex  mobile:hidden">
          {/* <div className="flex-1 flex flex-col">
            <div className="h-full w-full"></div>
          </div> */}
          <div className={`flex-none laptop:w-[20%] h-full p-0 tablet:w-[30%] `}>
            <LeftScrollBar />
          </div>

          {showDoctorByid !== null ? (
            <>
              <div className={`w-[90%] h-[82vh]  flex flex-col justify-between  ml-auto px-4 ${!isDark && "bg-[#F0F0F5] rounded-2xl"}`}>
                <div className="w-full flex justify-end">
                  <Profile DoctorData={showDoctorByid} isDark={isDark} />
                </div>
                <div className={`flex flex-col justify-center items-center h-[65vh]  `}>
                  <ChatArea />
                </div>
                <div className="w-full flex justify-end  ">
                  <InputBox />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col justify-center items-center ml-auto pr-4">
              <BsChatFill size={40} color="#02a6d8" />
              <h2 className="text-xl font-semibold">Start chatting</h2>
              <p>Select a doctor from the left to begin your conversation</p>
            </div>
          )}
        </div>
      ) :
        (
          <div className="flex w-full justify-center items-center">
            <div className={`flex-none  h-full p-0 w-full `}>
              <LeftScrollBar />
            </div>
          </div>
        )}
    </div>
  );
});

export default FinalChatroom;
