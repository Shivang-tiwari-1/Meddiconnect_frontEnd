import React from "react";
import { globalResizeFunction } from "../../Utility/resizer.Utils";
import { IoArrowBackCircle } from "react-icons/io5";
import BookeAppointManually from "../Patient/BookApintment/BookeAppointManually";
import { FaUserDoctor } from "react-icons/fa6";
import { BookAppointMent } from "../../Redux/slices/Patient.Redux";
import { useAppDispatch } from "../../Redux/Store/Store";
interface data {
  name?: string;
  role?: string;
  profileImage?: string;
  availability?: object[];
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
}
const DoctroPageModel = (props: data) => {
  const {
    name,
    role,
    profileImage,
    show,
    tabletBool,
    handleToggleShow,
    address,
    history,
    show2,
    show3,
    handleToggleShow3,
    handleToggleShow4,
    show4,
    id,
    availability,
    Max,
    isDark,
    currentDate,
    BookAppointment,
  } = props;
  const max_patient_check = availability?.filter((index) => {
    return index?.day === currentDate;
  });

  const dispatch = useAppDispatch();

  globalResizeFunction();
  return (
    <div className="fixed inset-0 flex items-center justify-evenly bg-black bg-opacity-80 ">
      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } p-8 rounded-[2rem] shadow-lg w-full max-w-[70%] h-[60vh] flex justify-between laptop:w-[50%] relative `}
      >
        <div className="flex justify-evenly flex-col items-start w-[45%]  h-[50vh] ">
          <div className="flex justify-center w-full items-center h-[20vh] ">
            <div className=" border-2 w-[50%] h-[16vh] rounded-[7rem] flex justify-center items-center shadow-2xl]">
              <img
                src={`http://localhost:5000/images/${profileImage}`}
                alt="Profile"
                className="w-full h-auto object-cover rounded-full"
              />
            </div>
          </div>

          <div className="flex justify-center items-start flex-col h-[23vh] border-2 shadow-2xl w-full rounded-[3rem]">
            <div className="space-y-4 p-3">
              <div>
                <p className="text-lg font-medium">Speciality:</p>
              </div>
              <div>
                <p className="text-lg font-medium">Rating:</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col justify-around py-3  w-[45%] h-[50vh] ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <div className="flex h-[20vh] justify-center items-center shadow-lg w-full rounded-[3rem] border-2">
            <p className=" text-4xl font-medium">
              {max_patient_check[0]?.laterNumber?.number}
            </p>
          </div>

          {availability?.length === 0 ? (
            <div className=" flex items-center justify-around w-full h-[23vh] border-2 rounded-[3rem] shadow-lg  flex-col">
              <div className={`flex w-full justify-around`}>
                {max_patient_check?.length !== 0 &&
                max_patient_check[0]?.laterNumber?.number === Max ? (
                  <div
                    className={`  w-[40%] h-[5vh] rounded-lg flex justify-center items-center border-2`}
                  >
                    <p className=" text-xl font-bold  ">FULL</p>
                  </div>
                ) : (
                  <div className="border-2 rounded-2xl bg-red-400 w-[50%] h-[6vh] flex justify-center items-center">
                    <p className=" text-xl font-bold text-center">
                      Doctor not available
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-around w-full h-[23vh] border-2 rounded-[3rem] shadow-lg  flex-col">
              <div className="flex w-full justify-around">
                <div
                  className="w-[40%] h-[5vh] rounded-lg flex justify-center items-center border-2"
                  onClick={() => dispatch(BookAppointMent(id))} // Correct dispatch with id as argument
                >
                  <p className=" text-xl font-bold ">Next</p>
                </div>

                <div className=" w-[40%] h-[5vh] rounded-lg flex justify-center items-center border-2">
                  {!show4 ? (
                    <button onClick={handleToggleShow4}>
                      <FaUserDoctor size={30} />
                    </button>
                  ) : (
                    <BookeAppointManually />
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
