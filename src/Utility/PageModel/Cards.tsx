import React from "react";
import DocumentPageModel from "./DocumentPageModel";
import ExpertiesPageModel from "./ExpertiesPageModel";
import { searchQuery } from "../../Redux/slices/Patient.Redux";
import SchedulePageModel from "./SchedulePageModel";
import { useAppSelector } from "../../Redux/Store/Store";
import Loader from "../loader/Loader";
import { CollectedDay } from "../../Redux/slices/Doctor.Redux";

interface incomingdata {
  show2?: boolean;
  show3?: boolean;
  show4?: boolean;
  handleToggleShow2?: () => void;
  handleToggleShow3?: () => void;
  handleToggleShow4?: () => void;
  userData?: object;
  isDark?: boolean | undefined;
  hoveredField?: string;
  handleMouseOut?: () => void;
  handleMouseOver?: (fieldNam: string) => void;
  expertise?: string[];
  searchQuery?: searchQuery;
  select?: string[];
  date?: string;
  day?: string;
  collectDay?: string | CollectedDay[] | undefined;
  drop?: boolean;
  submitAvailability?: () => void;
  qualificationExists?: boolean;
  availabilityExists?: boolean;
  specializationExists?: boolean;
}
const Cards: React.FC<incomingdata> = ({
  show2,
  show3,
  show4,
  handleToggleShow2,
  handleToggleShow3,
  handleToggleShow4,
  handleMouseOut,
  handleMouseOver,
  hoveredField,
  isDark,
  expertise = [],
  searchQuery,
  select,
  date,
  day,
  collectDay,
  drop,
  submitAvailability,
}) => {

  const { loading, qualificationExists, availabilityExists,
    specializationExists } = useAppSelector((state) => state.doctor)
    console.log(qualificationExists)
  return (
    <>
      {/* Document Card */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={`border-2 h-[30vh] tablet:w-[30%] desktop:w-[20%] rounded-3xl shadow-2xl ${!show2 ? "hover:scale-105 transition-transform" : ""
              } ${qualificationExists ? "hidden" : ""}`}
          >

            <>
              <div className="flex justify-center h-[20vh] rounded-md py-2">
                <img
                  src="../../../public/Screenshot 2024-11-07 020424.png"
                  alt="image"
                  className="w-[85%] rounded-lg"
                />
              </div>
              {show2 ? (
                <div className="absolute z-50">
                  <DocumentPageModel
                    isDark={isDark}
                    show2={show2}
                    handleToggleShow2={handleToggleShow2}
                    hoveredField={hoveredField}
                    handleMouseOut={handleMouseOut}
                    handleMouseOver={handleMouseOver}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center h-[10vh]">
                  <button
                    className={`${isDark ? "text-white" : ""
                      } h-[5vh] border-2 rounded-full w-[70%] bg-gradient-to-r from-blue-200 to-blue-400`}
                    onClick={handleToggleShow2}
                  >
                    <p className="font-[500] text-xl">Add Document</p>
                  </button>
                </div>
              )}
            </>

          </div>

          {/* Expertise Card */}
          <div
            className={`border-2 h-[30vh] tablet:w-[30%] desktop:w-[20%] rounded-3xl shadow-2xl ${!show3 ? "hover:scale-105 transition-transform" : ""
              } ${specializationExists ? "hidden" : ""}`}
          >
            {specializationExists ? null : (
              <>
                <div className="flex justify-center h-[20vh] rounded-md py-2">
                  <img
                    src="../../../public/Screenshot 2024-11-07 020424.png"
                    alt="image"
                    className="w-[85%] rounded-lg"
                  />
                </div>
                {show3 ? (
                  <div className="absolute z-50">
                    <ExpertiesPageModel
                      isDark={isDark}
                      show3={show3}
                      handleToggleShow3={handleToggleShow3}
                      hoveredField={hoveredField}
                      handleMouseOut={handleMouseOut}
                      handleMouseOver={handleMouseOver}
                      expertise={expertise}
                      searchQuery={searchQuery}
                      select={select ?? []}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-[10vh]">
                    <button
                      className={`${isDark ? "text-white" : ""
                        } h-[5vh] border-2 rounded-full w-[70%] bg-gradient-to-r from-blue-200 to-blue-400`}
                      onClick={handleToggleShow3}
                    >
                      <p className="font-[500] text-xl">Add Expertise</p>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Schedule Card */}
          <div
            className={`border-2 h-[30vh] tablet:w-[30%] desktop:w-[20%] rounded-3xl shadow-2xl ${!show4 ? "hover:scale-105 transition-transform" : ""
              } ${availabilityExists ? "hidden" : ""}`}
          >
            {availabilityExists ? null : (
              <>
                <div className="flex justify-center h-[20vh] rounded-md py-2">
                  <img
                    src="../../../public/Screenshot 2024-11-07 020424.png"
                    alt="image"
                    className="w-[85%] rounded-lg"
                  />
                </div>
                {show4 ? (
                  <div className="absolute z-50">
                    <SchedulePageModel
                      isDark={isDark}
                      hoveredField={hoveredField}
                      handleToggleShow4={handleToggleShow4}
                      handleMouseOver={handleMouseOver}
                      handleMouseOut={handleMouseOut}
                      currentDate={date}
                      currentDay={day}
                      collectDay={collectDay}
                      drop={drop}
                      submitAvailability={submitAvailability}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-[10vh]">
                    <button
                      className={`${isDark ? "text-white" : ""
                        } h-[5vh] border-2 rounded-full w-[70%] bg-gradient-to-r from-blue-200 to-blue-400`}
                      onClick={handleToggleShow4}
                    >
                      <p className="font-[500] text-xl">Add Availability</p>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>)}
    </>
  );
};

export default Cards;
