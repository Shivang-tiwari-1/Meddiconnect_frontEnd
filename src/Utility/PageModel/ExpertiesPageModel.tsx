import React, { useState } from "react";
import { IoArrowBackCircle, IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { setSearchQuery, toogleShow3 } from "../../Redux/slices/Patient.Redux";
import {
  captureString,
  deSelect,
  spealisesIn,
} from "../../Redux/slices/Doctor.Redux";
import {
  toggleAlertCheck,
  toggleStatusCheck,
} from "../../Redux/slices/signup_login.";
import { updateProgressBar } from "../../Sockets/Initialize_socket";
interface incomingData {
  isDark?: any;
  show3?: boolean;
  handleToggleShow3?: () => void;
  hoveredField?: string;
  handleMouseOut?: () => void;
  handleMouseOver?: (fieldName: string) => void;
  expertise: string[];
  searchQuery?: object;
  select: string[];
}
const ExpertiesPageModel = (prop: incomingData) => {
  const {
    isDark,
    handleToggleShow3,
    expertise,
    searchQuery,
    select,
  } = prop;

  const dispatch = useAppDispatch();
  const {
    userData
  } = useAppSelector((state) => state.states);
  //****************************function*********************************/

  const fiiterout = expertise?.filter((index) =>
    index.toLowerCase().includes((searchQuery as any)?.name?.toLowerCase() || 0)
  );

  const handleinput = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      setSearchQuery({ field: name as keyof typeof searchQuery, value })
    );
  };
  //****************************function*********************************/

  return (
    <form
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onSubmit={(e) => {
        e.preventDefault();
        if (select.length > 3) {
          dispatch(spealisesIn(select));
          updateProgressBar((userData as any)?.data?._id);
        } else {
          dispatch(toggleAlertCheck("you need to select at least three"));
          dispatch(toggleStatusCheck(403));
        }
      }}
    >
      <div
        className={`w-[70%] laptop:w-[50%] h-[60vh] rounded-lg p-4 relative ${isDark ? "bg-bgColorDarkBlack" : "bg-white"
          } ${isDark ? "text-white" : ""}`}
      >
        <div className="flex flex-col justify-center items-center ">
          <div className="flex items-center h-[5vh] animate-slideDown">
            <p className="font-[500] text-lg">
              {" "}
              Add Expertise for better experience{" "}
            </p>
          </div>

          <div className="flex justify-center items-center h-[10vh] w-full">
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Enter here"
              value={(searchQuery as any)?.name}
              onChange={handleinput}
              className={`rounded-full w-full h-[6vh] border-2  placeholder:font-[500]${isDark ? "text-black" : ""
                }`}
            />
          </div>

          <div
            className={` ${select.length > 2
              ? "grid grid-cols-3 border-b-2 border-black w-full h-[8vh] overflow-x-scroll custom-scrollbar rounded-lg my-5"
              : "flex justify-start items-center border-b-2 border-black w-full h-[8vh] overflow-x-scroll custom-scrollbar rounded-lg my-5"
              }`}
          >
            {select.map((text) => (
              <div
                className={` ${select.length > 2
                  ? "m-1 flex  justify-evenly items-center border-2 h-10  w-[90%] rounded-full"
                  : "m-1 flex  justify-evenly items-center border-2 h-10  w-[30%] rounded-full"
                  } `}
                key={text}
              >
                <p className="  flex  justify-center items-center  rounded-md font-[500]">
                  {" "}
                  {text}
                </p>
                <div
                  className={`cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (select.includes(text)) {
                      dispatch(deSelect(text));
                    }
                  }}
                >
                  <IoClose size={25} />
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 h-[20vh] w-full rounded-lg overflow-x-scroll custom-scrollbar ">
            {fiiterout?.length === 0 ? (
              <div className="grid grid-cols-3 gap-4 p-2">
                {expertise?.map((item, index) => (
                  <div key={index} className="p-2">
                    <button
                      type="button"
                      className={`w-full h-[7vh] rounded-full border-2 flex justify-evenly items-center ${select?.includes(item)
                        ? "bg-gradient-to-r from-blue-200 to-blue-400"
                        : ""
                        }`}
                      onClick={() => dispatch(captureString({ item }))}
                    >
                      <p className="font-[500] text-lg ">{item}</p>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 p-2">
                {fiiterout?.map((item, index) => (
                  <div key={index} className="p-2">
                    <button
                      type="button"
                      className={`w-full h-[7vh] rounded-full border-2 flex justify-evenly items-center ${select?.includes(item)
                        ? "bg-gradient-to-r from-blue-200 to-blue-400"
                        : ""
                        }`}
                      onClick={() => dispatch(captureString({ item }))}
                    >
                      <p className="font-medium text-lg">{item}s</p>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center h-[6.5vh]  w-[60%]  overflow-x-scroll custom-scrollbar">
            <button
              className="border-2 w-[40%] h-[3rem] rounded-full   bg-gradient-to-r from-blue-200 to-blue-400"
              type="submit"
            >
              <p className="font-[500]">Submit</p>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <button onClick={handleToggleShow3}>
            {isDark ? (
              <IoArrowBackCircle size={35} color="white" />
            ) : (
              <IoArrowBackCircle size={35} color="black" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpertiesPageModel;
