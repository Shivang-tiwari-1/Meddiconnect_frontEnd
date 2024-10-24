import React from "react";
import Doctors from "../../Component/Patient/Finddoctors/Doctors";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { IoCalendarNumberSharp } from "react-icons/io5";

import "./scrol.css";
import BookApointment from "../../Component/Patient/BookApintment/BookApointment.patient";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { useAppSelector } from "../../Redux/Store/Store";
interface UserData {
  toggleShow?: () => void;
  history?: string[];
  show?: boolean;
  handleToggleShow2?: () => void;
  handleToggleShow3?: () => void;
  show2?: boolean;
  show3?: boolean;
  show4?: boolean;
  handleToggleShow4?: () => void;
}

const PageModel2 = (props: UserData) => {
  const { isDark } = useAppSelector((state) => state.stateChange);
  const {
    toggleShow,
    history,
    show,
    handleToggleShow2,
    show2,
    handleToggleShow3,
    show3,
    show4,
    handleToggleShow4,
  } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={` w-[70%] laptop:w-[50%]  h-[50vh] rounded-lg p-4 relative overflow-y-scroll custom-scrollbar ${
          isDark ? "bg-bgColorDarkBlack" : "bg-white"
        } `}
      >
        <div className="grid grid-cols-1 gap-4">
          {history?.map((item) => (
            <div className="w-full border-2 h-[13vh] flex rounded-2xl ">
              <div className="w-full flex justify-around">
                <div className="w-[50%] flex justify-start flex-col my-1">
                  <p className="text-lg font-semibold ">Name: {item?.name}</p>
                  <p className="mt-2 flex items-center text-lg font-semibold ">
                    <a
                      href={`tel:${item?.phone}`}
                      className="flex items-center"
                    >
                      <IoIosCall size={25} className="mr-2" />:{item?.phone}
                    </a>
                  </p>

                  {item?.availability?.length > 0 && (
                    <div className="border-2 rounded-lg w-[30%] h-[5vh]  flex justify-center items-center my-2 bg-green-400 ">
                      <Link to="/BookAppointmentManually">
                        <IoCalendarNumberSharp size={25} />
                      </Link>
                    </div>
                  )}
                </div>

                <div className={`flex justify-center items-center my-2 w-[20%]`}>
                  <p
                    className={`text-lg font-semibold  ${isDark?"bg-bgColorDarkBlack":"bg-white"} p-3 rounded-full shadow-lg border border-gray-300 transition-all duration-300 w-[80%] text-center`}
                  >
                    {item?.availability?.length > 0 ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-4">
          <button onClick={handleToggleShow2}>
            <IoArrowBackCircle size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageModel2;
