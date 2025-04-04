import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import globalUseEffect from "../../Utility/GlobalUseeffect";
import {
  getUserData,
  history,
  toogleShow,
  toogleShow2,
  toogleShow3,
  toogleShow4,
} from "../../Redux/slices/Patient.Redux";
import PageModel from "../../Utility/PageModel.Utils";
import { getDoctorData } from "../../Redux/slices/Doctor.Redux";
import PageModel2 from "../../Utility/PageModel/PageModel2.Utils";
import { logout, set_hashed_id } from "../../Redux/slices/signup_login.";
import { socket } from "../../Constants";
import listners from "../../Sockets/listners";
import { useLocation, useNavigate } from "react-router-dom";

//*****************************Interface**********************************/

const Patient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //****************************APPSELECTOR*******************************//
  const { patientData, show, Appointmenthistory, show2, show3, show4 } =
    useAppSelector((state) => state.patient);
  const { role } = useAppSelector((state) => state.states);
  const { doctordata } = useAppSelector((state) => state.doctor);
  const { isDark } = useAppSelector((state) => state?.stateChange);
  //****************************APPSELECTOR*******************************//

  //*************************** DISPATCH**********************************//
  const dispatch = useAppDispatch();
  //*************************** DISPATCH**********************************//

  //**************************HANDLEFUNCTION*****************************//

  useEffect(() => {
    if (role === "patient") {
      dispatch(getUserData()).then((action) => {
        if (action.type === "patient/getUserData/fulfilled") {
          const queryParams = new URLSearchParams(location.search);
          dispatch(set_hashed_id("getUserData"));
          queryParams.set("key", "getUserData");
          navigate(`${location.pathname}?${queryParams.toString()}`);
        }
      });
    } else {
      dispatch(getDoctorData());
    }
  }, []);

  const handleToggleShow = () => {
    dispatch(toogleShow2());
  };

  const handleToggleShow4 = () => {
    dispatch(toogleShow4());
  };

  const handleToggleShow3 = () => {
    dispatch(toogleShow3());
  };

  const handleToogeleShow2 = () => {
    dispatch(toogleShow2());
  };

  const handleHistory = () => {
    dispatch(history());
    dispatch(toogleShow2());
  };
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      dispatch(logout()).then((action) => {
        if (action.type === "user/logout/fulfilled") {
          navigate("/home", { replace: true });
        }
      });
    } catch (error) {
      console.error("Logout failed", error);
    }

  };

  const data = {};
  if (role === "patient") {
    Object.keys(patientData).forEach((key) => {
      if (patientData[key] !== null) {
        data[key] = patientData[key];
      }
    });
  } else {
    Object.keys(doctordata).forEach((key) => {
      if (doctordata[key] !== null) {
        data[key] = doctordata[key];
      }
    });
  }
  //*******************************HTMLFILE*********************************//
  return (
    <div
      className={`flex justify-center items-center w-full h-[85vh]  ${isDark ? "bg-bgColorDarkBlack" : "bg-white"
        } ${isDark ? "text-textWhite" : "text-black"}`}
    >
      <div className=" border-2  w-[70%] desktop:w-[40%] h-[80vh] shadow-2xl rounded-2xl flex justify-center pl-3 ">
        <div className="flex justify-center  flex-col font-[300px] gap-4 w-[60%]">
          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Name:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>
                  {role === "patient" ? data?.data?.name : data?.data?.name}
                </p>
              </div>
            </div>
          </div>

          {show3 ? (
            <PageModel
              isDark={isDark}
              address={data?.data?.address}
              handleToggleShow3={handleToggleShow3}
            />
          ) : (
            <div className="border-2 rounded-md w-[60] h-11 flex items-center">
              <div className="flex w-full pl-4">
                <p className="flex-shrink-0 w1/3 text-left">Address</p>
                <div className="flex-grow flex items items-center justify-center">
                  <div className="flex gap-3">
                    <p>{data?.data?.address?.substring(0, 25)}</p>
                    <button onClick={handleToggleShow3}>show...</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Phone:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{data?.data?.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Email:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{data?.data?.email}</p>
              </div>
            </div>
          </div>

          <div
            className={`${data?.data?.role === "doctor"
                ? "hidden"
                : "border-2 rounded-md w-[60] h-11 flex items-center shadow-lg"
              }`}
          >
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Appointment:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>
                  {data?.data?.appointmentStatus?.length === 0
                    ? "No appointment"
                    : "appointment active"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={` ${data?.data?.role === "doctor"
                ? "hidden"
                : "border-2 rounded-md w-[60] h-11 flex items-center shadow-lg"
              }`}
          >
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">History:</p>
              <div className="flex-grow flex items-center justify-center ">
                {data?.data?.history?.length === 0 ? (
                  <div>
                    <p>No history</p>
                  </div>
                ) : !show2 ? (
                  <button onClick={handleHistory}>...show history</button>
                ) : (
                  <PageModel2
                    history={Appointmenthistory}
                    toggleShow={handleToggleShow}
                    handleToggleShow2={handleToogeleShow2}
                    handleToggleShow3={handleToggleShow3}
                    handleToggleShow4={handleToggleShow4}
                    show={show}
                    show2={show2}
                    show3={show3}
                    show4={show4}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Role:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{data?.data?.role}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-around">
            <div
              className="w-[30%] h-[5vh] border-2  rounded-md flex justify-center items-center bg-red-400"
              onClick={handleLogout}
            >
              <button className=" text-lg ">logout</button>
            </div>

            <div className="w-[30%] h-[5vh] border-2  rounded-md flex justify-center items-center bg-green-500">
              <button className=" text-md ">forgot password</button>
            </div>

            <div className="w-[30%] h-[5vh] border-2  rounded-md flex justify-center items-center  bg-red-400">
              <button className=" text-md ">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
