import React, { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import BookeAppointManually from "../../Utility/PageModel/BookeAppointManually";
import {
  BookAppointMent
} from "../../Redux/slices/Patient.Redux";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { toggleAlertCheck, toggleStatusCheck } from "../../Redux/slices/signup_login.";
import { doctorInformation } from "../../Sockets/Initialize_socket";
import { socket } from "../../Constants";
import { CiStar } from "react-icons/ci";
import moment from "moment";
import Calanders from "../Repetitive_Components/FindDoctorComponents/DoctorPageModelComponents/Calanders";
import AppointmentNumberShow from "../Repetitive_Components/FindDoctorComponents/DoctorPageModelComponents/AppointmentNumberShow";
import Loader from "../../Utility/loader/Loader";

interface AvailabilityItem {
  day?: string;
  start?: string;
  end?: string;
  date?: string;
  laterNumber?: { number: number };
};

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
  phone?: number;
  day?: string;
  coordinates?: number[];
  charges?: number

};
const DoctroPageModel: React.FC<data> = React.memo((props) => {

  const {
    profileImage,
    handleToggleShow,
    handleToggleShow4,
    show4,
    id,
    availability,
    isDark,
    currentDate,
    hoveredField,
    specializedIn,
    show2,
    handleToggleShow2,
    timings,
    name,
    phone,
    address,
    role,
    coordinates,
    charges
  } = props;
  const dispatch = useAppDispatch();
  const [change, StateChange] = useState(" ");
  const makeQuery = useAppSelector((state) => state.stateChange.makeQuery);
  const allow_action = useAppSelector((state) => state.patient.allow_action);
  const userData = useAppSelector((state) => state.states.userData);
  const loading = useAppSelector((state) => state.patient.loading);

  const yourRatings = useAppSelector((state) => state.doctor.yourRatings);

  const check_day =
    availability?.filter((index) => {
      return index?.day === moment(new Date()).format('dddd').toString().toLowerCase() || index?.day === change.toLowerCase();
    }) || [];

  const current_Day =
    availability?.filter((index) => {
      return index?.day === currentDate;
    }) || [];

  const multiple_Actions = () => {
    handleToggleShow4?.();
  };

  const [rating, setRating] = useState(0);
  return (
    <>
      {!loading ? <Loader /> : (<div className="fixed inset-0 flex items-center justify-evenly bg-black bg-opacity-80 mobile:hidden">
        <div
          className={`${isDark ? "bg-bgColorDarkBlack " : "bg-white"
            } p-8 rounded-[2rem] shadow-lg w-full desktop:max-w-[50%] laptop:max-w-[50%] tablet:max-w-[70%] h-[60vh] flex justify-between laptop:w-[50%] relative`}
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
                  <p className="text-lg font-medium">Specialty:</p>
                  {specializedIn?.map((item, index) => (
                    <div key={index}>
                      <p className="text-base font-medium ">{(item as any).field}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-full ">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-medium">Rate:</p>
                    {(yourRatings as any)?.rating === 0 || !yourRatings || yourRatings === undefined || yourRatings === null ? (
                      [...Array(5)].map((_, index) => (
                        <CiStar
                          key={index}
                          size={23}
                          color={index < rating ? "gold" : "gray"}
                          onClick={async () => {
                            doctorInformation(socket, {
                              patientId: (userData as any)?.data?._id,
                              patientrole: (userData as any)?.data?.role,
                              doctorId: id,
                              rating: index + 1,
                            });
                            setRating(index + 1);
                          }}
                        />
                      ))
                    ) : (
                      [...Array((yourRatings as any).rating)].map((_, index) => (
                        <CiStar
                          key={index}
                          size={23}
                          color={"gold"}

                        />
                      ))
                    )}
                  </div>

                </div>
              </div>
            </div>

          </div>

          <Calanders
            availability={availability}
            stateChange={StateChange}
            id={id}
            profileImage={profileImage}
            name={name}
            role={role}
          />

          <div
            className={`flex flex-col justify-around py-3  w-[45%] h-[50vh] ${isDark ? "text-white" : "text-black"
              }`}
          >
            <AppointmentNumberShow
              availability={availability}
              change={change}
            />
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
              <div className="flex items-center justify-around w-full h-[23vh] flex-col">
                <div className="flex flex-col w-full justify-center items-center gap-8">

                  <div
                    className="tablet:w-[80%] desktop:w-[80%] laptop:w-[80%]  h-[5vh] rounded-lg flex justify-center items-center border-2  transition-all duration-300 ease-in-out transform hover:scale-105  shadow hover:shadow-lg cursor-pointer hover:bg-[#02a6d8]"
                    onClick={() => {
                      allow_action ? (makeQuery as any)?.bookAppointment ? dispatch(BookAppointMent(id)) : dispatch(toggleAlertCheck("you already booked an appointment ")) : dispatch(toggleAlertCheck("Clinic is not open yet"));
                      dispatch(toggleStatusCheck(200));
                    }}
                  >
                    <p className="text-base font-bold  w-full  flex justify-center text-nowrap">Get the next Appointment</p>
                  </div>

                  <div
                    className={`tablet:w-[80%] desktop:w-[80%] laptop:w-[80%] h-[5vh] rounded-lg flex justify-center items-center border-2  ${!show4
                      ? "transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#02a6d8]  shadow hover:shadow-lg cursor-pointer"
                      : ""
                      } `}
                  >
                    {!show4 ? (
                      <button onClick={multiple_Actions}>
                        <p className="text-base font-[600]  flex justify-center text-nowrap">Schedule An appointment</p>
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
                        address={address}
                        phone={phone}
                        name={name}
                        coordinates={coordinates}
                        charges={charges}
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
      </div>)}
    </>

  );
});

export default DoctroPageModel;
