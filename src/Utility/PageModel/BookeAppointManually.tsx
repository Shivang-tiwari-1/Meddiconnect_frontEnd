import React, { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import ScheduleAppointmentPageModel from "./ScheduleAppointmentPageModel";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { set_timings, toogleShow2 } from "../../Redux/slices/Patient.Redux";

interface bookingState {
  show4?: boolean;
  show2?: boolean;
  handleToggleShow2?: () => void;
  handleToggleShow4?: () => void;
  current_Day?: any;
  timings?: any;
  id?: string;
  availability?: any;
  currentDate?: string;
  address?: string;
  distnace?: number;
  phone?: number;
  name?: string

}


const BookeAppointManually = (props: bookingState) => {
  const {
    show4,
    handleToggleShow4,
    show2,
    handleToggleShow2,
    current_Day,
    id,
    availability,
    currentDate,
    phone,
    address,
    name
  } = props;
  const dispatch = useAppDispatch();

  const { timings, days } = useAppSelector((state) => state.patient);
  const current__Day =
    availability?.filter((index) => {
      return index?.day === currentDate;
    }) || [];

  useEffect(() => {
    dispatch(set_timings(current__Day[0]));
  }, []);

  return (
    <div className="fixed inset-0 flex items-end justify-center z-30 ">
      <div className=" border-2  w-full desktop:w-[80%] h-[80vh] bg-white rounded-t-xl overflow-x-scroll custom-scrollbar">
        <div className="flex justify-center items-center">
          <div className="border-2 w-16 border-gray-500 rounded-full"></div>
        </div>

        <div className="flex justify-start p-2 ">
          <div className=" w-full animate-slideDown">
            <p className="text-3xl font-[500] ">Dr {name ||  "unavailable"}</p>
            <p className="text-base font-apple">
              {address || "unavailable"}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={handleToggleShow4}>
              <MdOutlineCancel size={30} />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center w-full gap-3">
          {!show2 ? (
            <button
              className="flex justify-center items-center border-2 w-[30%] h-16 rounded-2xl bg-blue-500 hover:scale-110 ease-in-out duration-500"
              onClick={() => dispatch(toogleShow2())}
            >
              <p className="text-xs text-white ">Schedule</p>
            </button>
          ) : (
            <ScheduleAppointmentPageModel
              show2={show2}
              handleToggleShow2={handleToggleShow2}
              current_Day={current_Day}
              timings={timings}
              days={days}
              id={id}
              availability={availability}
              currentDate={currentDate}
              name={name}
              
            />
          )}
          <button className="flex justify-center items-center border-2 w-[30%] h-16 rounded-2xl hover:scale-110 ease-in-out duration-500">
            <p className="text-xs text-black">WebSite</p>
          </button>
        </div>

        <div className="flex flex-col justify-between items-center w-full mt-3">
          <div className="border-[1px] w-[95%]"></div>

          <div className="flex justify-evenly items-center w-full ">
            <div className="flex  justify-center items-center">
              <div className="flex flex-col">
                <p className="text-xs">NEXT AVAILABLE</p>
                <p>Today,5:40PM</p>
              </div>
            </div>
            <div className="border-2 w-0 h-10 rounded-lg m-1"></div>

            <div className="flex justify-center items-center">
              <div className="flex flex-col">
                <p className="text-xs"> ESTIMATED COST</p>
                <p className="">25,990</p>
              </div>
            </div>
            <div className="border-2 w-0 h-10 rounded-lg m-1"></div>

            <div className="flex justify-center items-center">
              <div className="flex flex-col">
                <p className="text-xs">DISTANCE</p>
                <p className="">1.8Km</p>
              </div>
            </div>
          </div>
          <div className="border-[1px] w-[95%]"></div>
        </div>

        <div className="flex justify-center flex-col  m-3">
          <p className="text-3xl font-[500]">Doctor details</p>

          <div className=" flex justify-center items-center pt-2 w-full ">
            <div className="w-[90%] h-[30vh] rounded-3xl bg-slate-200 flex flex-col justify-center">
              <div className="flex justify-start p-3 flex-col ">
                <p className="text-[500] font-apple">Phone</p>
                <p>{phone ||  "unavailable"}</p>
              </div>
              <div className="flex justify-start p-3 flex-col ">
                <p className="text-[500] font-apple">website</p>
                <a>aotronixinida.com</a>
              </div>
              <div className="flex justify-start p-3 flex-col ">
                <p className="text-[500] font-apple">Address</p>
                <p>9326977987</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center  flex-col m-3">
          <p className="text-3xl font-[500]">Store Opening Hour</p>

          <div className=" flex justify-center items-center pt-2 w-full ">
            <div className="w-[90%] h-[30vh] rounded-3xl bg-slate-200 flex flex-col justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookeAppointManually;
