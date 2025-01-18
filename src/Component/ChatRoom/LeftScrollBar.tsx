import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { setSearchQuery } from "../../Redux/slices/Patient.Redux";
import Profile from "./Profile";

interface incomingData {
  show?: boolean;
  name?: string;
  profileImage?: string;
  handleToggleShow?: (id: string) => void;
  openDoctorId?: string | null;
  key?: string;
  doctors?: [] | null;
  isDark?: boolean;
}

const LeftScrollBar = ({
  show,
  name,
  profileImage,
  handleToggleShow,
  openDoctorId,
  key,
  doctors,
  isDark,
}: incomingData) => {
  //****************************APP_SELECTORS*******************************/
  const { searchQuery } = useAppSelector((state) => state?.patient);
  //*******************************DIPATCH************************************/
  const dispatch = useAppDispatch();

  //******************************FUNCTIONS************************************/
  const handleinput = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      setSearchQuery({ field: name as keyof typeof searchQuery, value })
    );
  };

  //******************************VARIABLES***********************************/

  //******************************DATATYPESMETHODS*******************************/
  const filterResults = doctors?.filter((doctor) =>
    doctor?.name.toLowerCase().includes(searchQuery?.name?.toLowerCase() || 0)
  );
  //*********************************LOGS****************************************/

  //**********************************HTML-CSS**************************************/
  return (
    <div
      className={`flex flex-col items-center border-2 shadow-lg rounded-md w-[100%] h-full p-4 space-y-4 `}
    >
      <div
        className={`w-full ${
          !isDark ? "border-b-2 border-gray-300 outline-none shadow-lg" : ""
        }`}
      >
        <input
          className={`w-full h-[2.5rem] outline-none  ${
            isDark ? "bg-slate-700" : "bg-white"
          } placeholder-gray-500 px-4 rounded-full`}
          type="text"
          placeholder="name"
          id="name"
          name="name"
          value={searchQuery?.name}
          onChange={handleinput}
        />
      </div>

      {filterResults?.length === 0
        ? doctors?.map((data) => (
            <button
              key={data?._id}
              className="flex  w-full space-y-2  h-[6vh] p-2  border-b-[0.25px] items-center"
              onClick={() => handleToggleShow?.(data?._id)}
            >
              <div className=" flex gap-2 w-full items-center" key={data?._id}>
                <div className="px-2 flex items-center gap-2">
                  <div className="w-[60px] h-[50px] ">
                    <img
                      src={data?.profileImage}
                      alt="Profile"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>

                  <div className="text-sm font-light">{data?.name}</div>
                </div>
              </div>
            </button>
          ))
        : filterResults?.map((data) => (
            <button
              className="flex  w-full space-y-2  h-[6vh] p-2  border-b-[0.25px] items-center"
              onClick={() => handleToggleShow?.(data?._id)}
            >
              <div className=" flex gap-2 w-full" key={data?._id}>
                <div className="px-2 w-[70px] h-[50px]">
                  <img
                    src={data?.profileImage}
                    alt="Profile"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                <div className="text-sm font-light">{data?.name}</div>
              </div>
            </button>
          ))}
    </div>
  );
};

export default LeftScrollBar;
