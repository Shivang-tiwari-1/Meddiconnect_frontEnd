import React, { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import ScheduleAppointmentPageModel from "./ScheduleAppointmentPageModel";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { set_timings, toogleShow2 } from "../../Redux/slices/Patient.Redux";
import { toDatetime } from "../Function";
import moment from "moment";
import { haversineDistance } from "../../Services/service";

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
  name?: string;
  coordinates?: number[];
  charges?: number
}


const BookeAppointManually = (props: bookingState) => {
  const {
    handleToggleShow4,
    show2,
    handleToggleShow2,
    current_Day,
    id,
    availability,
    currentDate,
    phone,
    address,
    name,
    coordinates,
    charges
  } = props;
  const dispatch = useAppDispatch();

  const timings = useAppSelector((state) => state.patient.timings);
  const days = useAppSelector((state) => state.patient.days);
  const isDark = useAppSelector((state) => state.stateChange.isDark);
  const userData = useAppSelector((state) => state.states.userData);


  const current__Day =
    availability?.filter((index) => {
      return index?.day === currentDate;
    }) || [];

  useEffect(() => {
    dispatch(set_timings(current__Day[0]));
  }, []);

  const data = timings.flat().map((timeString) => toDatetime(timeString));
  const newdate = data.filter((date) => {
    return moment(date).isBefore(new Date().toISOString());
  });

  const lon1 = (userData as any)?.data?.coordinates[0]
  const lat1 = (userData as any)?.data?.coordinates[1]
  const lon2 = coordinates?.[0]
  const lat2 = coordinates?.[1]

  return (
    <div className={`fixed inset-0 flex items-end justify-center z-30 ${isDark ? "bg-black bg-opacity-80" : ""}`}>
      <div className={`border-2  w-full desktop:w-[80%] h-auto rounded-t-xl overflow-x-scroll custom-scrollbar ${isDark ? "bg-bgColorDarkBlack text-white" : "bg-white"
        }`}>
        <div className="flex justify-center items-center">
          <div className="border-2 w-16 border-gray-500 rounded-full"></div>
        </div>

        <div className="flex justify-start p-2 ">
          <div className=" w-full animate-slideDown">
            <p className="text-3xl font-[500] ">Dr {name || "unavailable"}</p>
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
              <p className="text-xs  ">Schedule</p>
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
     
        </div>

        <div className="flex flex-col justify-between items-center w-full mt-3">
          <div className="border-[1px] w-[95%]"></div>

          <div className="flex justify-evenly items-center w-full ">
            <div className="flex  justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <p className="text-base ">NEXT AVAILABLE</p>
                <p>{moment(newdate.pop()).format(" h:mm A")}</p>
              </div>
            </div>
            
            <div className="border-2 w-0 h-10 rounded-lg m-1"></div>

            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <p className="text-xs"> ESTIMATED COST</p>
                <p className="">{charges}</p>
              </div>
            </div>
            <div className="border-2 w-0 h-10 rounded-lg m-1"></div>

            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <p className="text-xs">DISTANCE</p>
                <p className="">{`${haversineDistance(
                  (userData as any)?.data?.coordinates[1], (userData as any)?.data?.coordinates[0],
                  coordinates?.[1], coordinates?.[0]
                ) === 0 ? "Close by" : Math.floor(haversineDistance(
                  (userData as any)?.data?.coordinates[1], (userData as any)?.data?.coordinates[0],
                  coordinates?.[1], coordinates?.[0]
                ))}`}</p>
              </div>
            </div>
          </div>
          <div className="border-[1px] w-[95%]"></div>
        </div>

        <div className="flex justify-center flex-col  m-3">
          <p className="text-3xl font-[500]">Doctor details</p>

          <div className=" flex justify-center items-center pt-2 w-full ">
            <div className="w-[90%] h-[30vh] rounded-3xl  flex flex-col justify-center border-2">
              <div className="flex justify-start p-3 flex-col ">
                <p className="text-[500] font-apple">Phone</p>
                <p>{phone || "unavailable"}</p>
              </div>
              <div className="flex justify-start p-3 flex-col ">
                <p className="text-[500] font-apple">Address</p>
                <p>{address}</p>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default BookeAppointManually;
