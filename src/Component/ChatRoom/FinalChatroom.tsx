import {
  setOpenDoctorById,
  toogleShow,
} from "../../Redux/slices/Patient.Redux";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import InputBox from "./InputBox";
import LeftScrollBar from "./LeftScrollBar";
import Profile from "./Profile";
import React, { useState } from "react";

const FinalChatroom = () => {
  /************************************VARIABLES***********************/
  let DoctorData: any;
  /************************************USEAPPSELECTORS******************/
  const { show, doctors } = useAppSelector((state) => state.patient);
  const { isDark } = useAppSelector((state) => state.stateChange);
  const { showDoctorByid } = useAppSelector((state) => state.patient);
  const [openDoctorId, setOpenDoctorId] = useState<string | null>(null);
  /************************************DISPATCHERS**********************/
  const dispatch = useAppDispatch();

  /***********************************FUNCTION**************************/

  const handleToggleShow = (doctorId: string | null) => {
    dispatch(setOpenDoctorById(doctorId));
    dispatch(toogleShow());
  };

  console.log("showDoctorByid", showDoctorByid);
  return (
    <div
      className={`h-screen w-full flex ${
        isDark ? "bg-lightBlack" : "bg-white"
      }  ${isDark ? "text-textWhite" : "text-black"}`}
    >
      <div className="flex-1 flex flex-col">
        <div className="h-full w-full"></div>
      </div>
      <div className={`flex-none laptop:w-[20%] h-full p-0 tablet:w-[30%]`}>
        <LeftScrollBar
          show={show}
          doctors={doctors}
          openDoctorId={openDoctorId}
          handleToggleShow={handleToggleShow}
          isDark={isDark}
        />
      </div>

      {showDoctorByid !== null ? (
        <>
          <div className="w-[80%] flex flex-col justify-between ml-auto pr-4">
            <div className="w-full flex justify-end">
              <Profile DoctorData={showDoctorByid} isDark={isDark} />
            </div>
            <div className="w-full flex justify-end">
              <InputBox />
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
