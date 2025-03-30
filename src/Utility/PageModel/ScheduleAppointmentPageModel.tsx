import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  BookAppointmentManually,
  set_bookappointme,
  set_timings,
  toogleShow2,
} from "../../Redux/slices/Patient.Redux";
import Button from "../../Component/UtilityComponents/Button";
import { MdOutlineCancel } from "react-icons/md";
import { toggleAlertCheck, toggleStatusCheck } from "../../Redux/slices/signup_login.";
interface incomingdata {
  show2?: boolean;
  handleToggleShow2?: () => void;
  current_Day?: any;
  timings?: any;
  days?: string[];
  id: any;
  availability?: any;
  currentDate?: string;
  name?:string
}
const ScheduleAppointmentPageModel = (props: incomingdata) => {
  const {
    show2,
    handleToggleShow2,
    timings = [],
    days,
    id,
    availability,
    currentDate,
    name
  } = props;

  const { appointmementdata, color } = useAppSelector((state) => state.patient);
  const dispatch = useAppDispatch();
  const { day } = useAppSelector((state) => state.stateChange)
  const { allow_action } = useAppSelector((state) => state.patient)
  const capture_string = (key, item, index) => {
    dispatch(set_bookappointme({ key, item, index }));
    if (key === "day") {
      const current__Day =
        availability?.filter((index) => {
          return index?.day === item;
        }) || [];
      dispatch(set_timings(current__Day[0]));
    }
  };
  return (
    <div className="fixed inset-0 flex items-end justify-center  ">
      <div className=" border-2  w-full desktop:w-[80%] h-[80vh] bg-white rounded-t-xl overflow-x-scroll custom-scrollbar ">
        <div className="flex justify-center items-center">
          <div className="border-2 w-16 border-gray-500 rounded-full"></div>
        </div>

        <div className="flex justify-start p-2 ">
          <div className="w-full animate-slideDown">
            <p className="text-3xl font-[500]">{`Dr ${name}`||"unavailable"}</p>
            <p className="text-lg font-[500]">Schedule an appointment</p>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={() => dispatch(toogleShow2())}>
              <MdOutlineCancel size={30} />
            </button>
          </div>
        </div>

        <div className="flex justify-center pt-4 w-full">
          <div className="w-[90%] h-[35vh] rounded-3xl bg-slate-200 flex flex-col justify-start">
            <div className="flex justify-evenly items-start mt-4">
              {days?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => capture_string("day", item, index)}
                  className={`flex justify-center items-center border-2 w-[10%] h-[4vh]  rounded-xl${color === index ? " bg-blue-500" : ""
                    }`}
                >
                  <button className={``}>{item}</button>
                </div>
              ))}
            </div>

            <div className="flex flex-row justify-center items-center w-full  pt-4 ">
              <div className="flex flex-wrap gap-2 w-[80%]  h-[27vh] justify-center items-center overflow-x-scroll custom-scrollbar">
                {timings?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => capture_string("time", item, undefined)}
                    className="border-2 rounded-2xl w-[19%] bg-blue-500 h-[5vh] flex justify-center items-center"
                  >
                    <p className="font-[500]">{item}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4 w-full">
          <div className="w-[40%] h-[30vh] rounded-3xl bg-slate-200 flex flex-col ">
            <div className="flex flex-col justify-center items-center h-full gap-3">
              <div className="text-4xl font-[500]">
                <p>Day: {(appointmementdata as any).day}</p>
              </div>
              <div className="text-4xl font-[500]">
                <p>time: {(appointmementdata as any).time}</p>
              </div>
            </div>
            <div
              className="flex justify-center items-center w-full"
              onClick={() => {
                if (allow_action) {
                  dispatch(
                    BookAppointmentManually({
                      day: (appointmementdata as any)?.day,
                      time: (appointmementdata as any)?.time,
                      id: id,
                    })
                  );
                } else {
                  dispatch(toggleAlertCheck("Clinic is not open yet"));
                }
                dispatch(toggleStatusCheck(200));
              }}
            >
              <button className="w-[30%] h-[4vh] bg-blue-500 border-2 rounded-lg">
                <p>Submit</p>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAppointmentPageModel;
