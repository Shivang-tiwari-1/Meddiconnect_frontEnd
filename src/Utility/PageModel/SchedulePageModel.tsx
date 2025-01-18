import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useAppDispatch } from "../../Redux/Store/Store";
import {
  CollectedDay,
  doctorPayload,
  filterCollectionDay,
  setCollectedDay,
  setCriteria,
  setDrop,
} from "../../Redux/slices/Doctor.Redux";
import { convertToLocalTime } from "../Function";

interface incomingData {
  isDark?: boolean;
  hoveredField?: string;
  handleToggleShow4?: () => void;
  handleMouseOver?: (fieldName: string) => void;
  handleMouseOut?: () => void;
  currentDay?: string;
  currentDate?: string;
  collectDay?: [CollectedDay];
  drop?: boolean;
  submitAvailability?: () => void;
}

const SchedulePageModel: React.FC<incomingData> = ({
  isDark,
  hoveredField,
  handleToggleShow4,
  handleMouseOver,
  handleMouseOut,
  currentDate,
  currentDay,
  collectDay = [],
  submitAvailability,
  drop,
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  console.log(collectDay);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`w-[70%] laptop:w-[50%] h-[53vh] rounded-lg p-4 relative ${
          isDark ? "bg-bgColorDarkBlack" : "bg-white"
        } ${isDark ? "text-white" : ""} mx-4`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-center h-[5vh] animate-slideDown">
            <p className="font-[500] text-lg">Set your timing </p>
          </div>
          {/* <div className="flex justify-between animate-slideDown">
            <p className="font-[500] text-lg">Date:</p>
            <p className="font-[500] text-lg">Day: </p>
            <p className="font-[500] text-lg">Start: </p>
            <p className="font-[500] text-lg">End:</p>
          </div> */}
          <div className=" flex flex-row  ">
            {drop ? (
              <div className="w-[30%] h-[37vh] py-5 flex flex-col gap-5 overflow-y-scroll custom-scrollbar">
                {[
                  "sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="w-full h-auto border-2 rounded-md flex flex-col justify-center items-center p-2"
                  >
                    <button
                      onClick={() =>
                        dispatch(
                          setCollectedDay({
                            HowManyPatients: null,
                            day: item,
                            start: null,
                            end: null,
                            index: index,
                          })
                        )
                      }
                    >
                      <p className="font-[500]">{item}</p>
                    </button>
                    {collectDay[index]?.showInput && (
                      <>
                        <input
                          type="number"
                          placeholder="Enter patients"
                          className={`border rounded-md p-1 mt-2 w-[90%] ${
                            isDark ? "text-black" : ""
                          } ${show ? "hidden" : ""}`}
                          onChange={(e) =>
                            dispatch(
                              setCollectedDay({
                                index: index,
                                HowManyPatients: parseInt(e.target.value),
                                day: collectDay[index]?.day,
                                start: collectDay[index]?.start,
                                end: collectDay[index]?.end,
                              })
                            )
                          }
                        />
                      </>
                    )}
                    {collectDay[index]?.showTimeStart && (
                      <input
                        type="time"
                        placeholder="Enter patients"
                        className={`border rounded-md p-1 mt-2 w-[90%] ${
                          isDark ? "text-black" : ""
                        } ${show ? "hidden" : ""}`}
                        onChange={(e) =>
                          dispatch(
                            setCollectedDay({
                              index: index,
                              HowManyPatients:
                                collectDay[index].HowManyPatients,
                              day: collectDay[index]?.day,
                              start: convertToLocalTime(e.target.value),
                              end: collectDay[index]?.end,
                            })
                          )
                        }
                      />
                    )}
                    {collectDay[index]?.showTimeEnd && (
                      <input
                        type="time"
                        placeholder="Enter patients"
                        className={`border rounded-md p-1 mt-2 w-[90%] ${
                          isDark ? "text-black" : ""
                        } ${show ? "hidden" : ""}`}
                        onChange={(e) =>
                          dispatch(
                            setCollectedDay({
                              index: index,
                              HowManyPatients:
                                collectDay[index].HowManyPatients,
                              day: collectDay[index]?.day,
                              start: collectDay[index]?.start,
                              end: convertToLocalTime(e.target.value),
                            })
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-[30%]  flex  justify-center items-start my-4">
                <button
                  className="border-2 w-full rounded-full h-11 flex justify-center gap-7 items-center"
                  onClick={() => dispatch(setDrop())}
                >
                  {" "}
                  <p>
                    <FaRegCalendarDays size={25} />
                  </p>
                  <p className="font-[500] ">SetDay </p>
                </button>
              </div>
            )}

            <div className="w-[70%] flex justify-center border-2 mx-2 my-2 rounded-md h-[37vh] overflow-y-scroll custom-scrollbar">
              <div className="flex flex-col w-full">
                <div className="h-6 flex justify-center">
                  <p className="font-[500] ">your schedule</p>
                </div>

                <div className="flex flex-col gap-[2.1rem]">
                  <div className="flex justify-between mx-4">
                    <p>Patients</p>
                    <p>Day</p>
                    <p>Start</p>
                    <p>End</p>
                  </div>
                  {collectDay?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between mx-4"
                    >
                      <p>{item.HowManyPatients}</p>
                      <p>{item.day}</p>
                      <p>{item.start}</p>
                      <p>{item.end}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  justify-center items-center ">
          <div
            className=" flex  justify-center w-[50%]"
            onClick={submitAvailability}
          >
            <button className="w-[50%] h-9 border-2 rounded-full  bg-gradient-to-r from-blue-200 to-blue-400 ">
              <p className="font-[500] text-lg">Submit</p>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <button onClick={handleToggleShow4}>
            {isDark ? (
              <IoArrowBackCircle size={35} color="white" />
            ) : (
              <IoArrowBackCircle size={35} color="black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePageModel;
