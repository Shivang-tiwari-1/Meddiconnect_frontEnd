import React, { useState } from "react";
import { globalResizeFunction } from "../../Utility/resizer.Utils";
import { IoArrowBackCircle } from "react-icons/io5";
import BookeAppointManually from "../../Utility/PageModel/BookeAppointManually";
import { FaUserDoctor } from "react-icons/fa6";
import {
  BookAppointMent,
  setOpenDoctorId,
} from "../../Redux/slices/Patient.Redux";
import { useAppDispatch } from "../../Redux/Store/Store";
import { BsCalendar2DateFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoChatbubble } from "react-icons/io5";

interface AvailabilityItem {
  day?: string;
  start?: string;
  end?: string;
  date?: string;
  laterNumber?: { number: number };
}

interface data {
  name?: string;
  role?: string;
  profileImage?: string;
  availability?: AvailabilityItem[];
  specializedIn?: object[];
  show?: boolean;
  tabletBool?: boolean;
  handleToggleShow?: (doctorId: any) => void;
  address?: string;
  history?: string[];
  show2?: boolean;
  show3?: boolean;
  handleToggleShow3?: () => void;
  handleToggleShow4?: () => void;
  show4?: boolean;
  id?: any;
  key?: any;
  Max?: number;
  isDark?: boolean;
  currentDate?: string;
  BookAppointment?: (id: string) => void;
  globalResizeFunction?: () => void;
  handleMouseOut?: () => void;
  handleMouseOver?: (fieldName: string) => void;
  hoveredField?: string;
  handleToggleShow2?: () => void;
  timings?: any;
}
const DoctroPageModel = (props: data) => {
  const {
    profileImage,
    handleToggleShow,
    handleToggleShow4,
    show4,
    id,
    availability,
    isDark,
    currentDate,
    handleMouseOut,
    handleMouseOver,
    hoveredField,
    specializedIn,
    show,
    show2,
    handleToggleShow2,
    timings,
  } = props;
  const [click, SetClick] = useState(false);
  const [change, StateChange] = useState(" ");
  const dispatch = useAppDispatch();

  const check_day =
    availability?.filter((index) => {
      return index?.day === change;
    }) || [];

  const current_Day =
    availability?.filter((index) => {
      return index?.day === currentDate;
    }) || [];

  const handlesrs = (id) => {
    dispatch((dispatch) => {
      dispatch(setOpenDoctorId(null));
    });
    handleToggleShow4?.();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-evenly bg-black bg-opacity-80 ">
      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } p-8 rounded-[2rem] shadow-lg w-full max-w-[70%] h-[60vh] flex justify-between laptop:w-[50%] relative `}
      >
        <div className="flex justify-evenly flex-col items-start w-[45%]  h-[50vh] ">
          <div className="flex justify-center w-full items-center h-[20vh]">
            <div className="border-2 w-[16vh] h-[16vh] rounded-full flex justify-center items-center shadow-2xl">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="flex justify-center items-start flex-col h-[23vh] border-2 shadow-2xl w-full rounded-[3rem]  overflow-hidden">
            <div className="space-y-4 p-3 w-full">
              <div className="flex flex-wrap items-center gap-1">
                <p className="text-lg font-medium">Speciality:</p>
                {specializedIn?.map((item, index) => (
                  <div key={index}>
                    <p className="text-base font-medium ">{item.field}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-lg font-medium">Rating:</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-0 gap-2">
          {!click ? (
            <>
              <button
                onMouseOver={() => handleMouseOver("available dates")}
                onMouseOut={() => handleMouseOut()}
                onClick={() => SetClick(true)}
                className="relative transition-transform transform hover:scale-110"
              >
                <BsCalendar2DateFill size={30} />
                {hoveredField === "available dates" && (
                  <div className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                    available dates
                  </div>
                )}
              </button>
            </>
          ) : (
            <div className="transition-all duration-500 ease-in-out flex justify-center items-center z-50">
              <div
                className={`absolute border-2 w-[30%] h-[23vh] rounded-3xl opacity-90 p-4 flex flex-col items-center justify-between ${
                  isDark ? "bg-bgColorDarkBlack" : "bg-white "
                }`}
              >
                {/* Availability Buttons */}
                <div className="w-full">
                  {availability?.map((item, idx) => (
                    <button
                      key={idx}
                      value={item.day}
                      className={`flex justify-center items-center w-full h-[2.7vh] my-[1.5px] transition-transform duration-300 ease-in-out transform hover:scale-105  rounded-2xl   font-semibold shadow-md hover:shadow-lg ${
                        isDark
                          ? "bg-bgColorDarkBlack"
                          : "bg-white  hover:border-t-2 hover:border-b-2"
                      }`}
                      onClick={(e) => {
                        const target = e.target as HTMLButtonElement;
                        StateChange(target.value);
                      }}
                    >
                      {item.day}
                    </button>
                  ))}
                </div>

                {/* Centered Back Button */}
                <button
                  className={`flex justify-center items-center mt-2 p-2 rounded-lg  font-semibold transition-colors duration-300 hover:scale-105 ease-in-out ${
                    isDark ? "bg-bgColorDarkBlack" : "bg-white"
                  }`}
                  onClick={() => SetClick(false)}
                >
                  Back
                </button>
              </div>
            </div>
          )}
          <IoChatbubble size={33} />
        </div>
        <div
          className={`flex flex-col justify-around py-3  w-[45%] h-[50vh] ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <div className="flex h-[20vh] w-full">
            <div className="flex justify-end items-end w-full px-[2rem] pb-2 border-b-4 border-gray-500">
              {" "}
              {!change ? (
                <p className="text-9xl font-medium mb-4">
                  {" "}
                  {current_Day?.length === 0
                    ? 0
                    : current_Day[0]?.laterNumber?.number}
                </p>
              ) : (
                <p className="text-9xl font-medium mb-4">
                  {check_day?.length === 0
                    ? 0
                    : check_day[0]?.laterNumber?.number}
                </p>
              )}
            </div>
          </div>

          {check_day?.length === 0 &&
          check_day[0]?.date !== currentDate &&
          check_day[0]?.day !== change &&
          currentDate?.length === 0 ? (
            <div className=" flex items-center justify-around w-full h-[23vh] border-2 rounded-[3rem] shadow-lg  flex-col">
              <div className={`flex w-full justify-around`}>
                <div className="border-2 rounded-2xl bg-red-400 w-[50%] h-[6vh] flex justify-center items-center">
                  <p className=" text-xl font-bold text-center">
                    Doctor not available
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-around w-full h-[23vh] border-2 rounded-[3rem] shadow-lg  flex-col">
              <div className="flex w-full justify-around ">
                <div
                  className="w-[40%] h-[5vh] rounded-lg flex justify-center items-center border-2  transition-all duration-300 ease-in-out transform hover:scale-105  shadow hover:shadow-lg cursor-pointer"
                  onClick={() => dispatch(BookAppointMent(id))}
                >
                  <p className="text-xl font-bold ">Next</p>
                </div>

                <div
                  className={`w-[40%] h-[5vh] rounded-lg flex justify-center items-center border-2 ${
                    !show4
                      ? "transition-all duration-300 ease-in-out transform hover:scale-105  shadow hover:shadow-lg cursor-pointer"
                      : ""
                  } `}
                >
                  {!show4 ? (
                    <button onClick={handleToggleShow4}>
                      <FaUserDoctor size={30} />
                    </button>
                  ) : (
                    <BookeAppointManually
                      show4={show4}
                      show2={show2}
                      handleToggleShow2={handleToggleShow2}
                      handleToggleShow4={handleToggleShow4}
                      current_Day={current_Day}
                      timings={timings}
                      id={id}
                      availability={availability}
                      currentDate={currentDate}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-4">
          <button onClick={handleToggleShow}>
            <IoArrowBackCircle size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctroPageModel;
