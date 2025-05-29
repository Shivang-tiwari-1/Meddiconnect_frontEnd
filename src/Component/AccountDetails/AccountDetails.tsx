import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  getUserData,
  history,
  toogleShow2,
  toogleShow3,
  toogleShow4,
} from "../../Redux/slices/Patient.Redux";
import PageModel from "../../Utility/PageModel.Utils";
import { getDoctorData } from "../../Redux/slices/Doctor.Redux";
import PageModel2 from "../../Utility/PageModel/PageModel2.Utils";
import { logout, set_hashed_id } from "../../Redux/slices/signup_login.";
import { useLocation, useNavigate } from "react-router-dom";

//*****************************Interface**********************************/

const Patient = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const patientData = useAppSelector((state) => state.states.patientData);
  const show = useAppSelector((state) => state.patient.show);
  const Appointmenthistory = useAppSelector((state) => state.patient.Appointmenthistory);
  const show2 = useAppSelector((state) => state.patient.show2);
  const show3 = useAppSelector((state) => state.patient.show3);
  const show4 = useAppSelector((state) => state.patient.show4);
  const role = useAppSelector((state) => state.states.role);
  const doctordata = useAppSelector((state) => state.doctor.doctordata);
  const isDark = useAppSelector((state) => state?.stateChange.isDark);
  const userData = useAppSelector((state) => state.states.userData)
  const doctorData = useAppSelector((state) => state.states.doctorData);

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
  }, [userData, patientData?.accessToken, doctorData?.accessToken]);

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

  // let data = {};
  // if (role === "patient") {
  //   Object.keys(patientData).forEach((key) => {
  //     if (patientData[key] !== null) {
  //       data[key] = patientData[key];
  //     }
  //   });
  // } else {
  //   Object.keys(doctordata).forEach((key) => {
  //     if (doctordata[key] !== null) {
  //       data[key] = doctordata[key];
  //     }
  //   });
  // }


 
  return (
    <div
      className={`flex  justify-center items-center w-full h-[85vh] ${isDark ? "bg-bgColorDarkBlack" : "bg-white"
        } ${isDark ? "text-textWhite" : "text-black"}`}
    >
      <div className=" border-2  w-[70%] desktop:w-[40%] h-[80vh] shadow-2xl rounded-2xl flex justify-center pl-3 flex-col items-center ">
        <div className="flex justify-center  flex-col font-[300px] gap-4 w-[60%]">
          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Name:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>
                  {role === "patient" ? userData?.name : userData?.name}
                </p>
              </div>
            </div>
          </div>

          {show3 ? (
            <PageModel
              isDark={isDark}
              address={userData?.address}
              handleToggleShow3={handleToggleShow3}
            />
          ) : (
            <div className="border-2 rounded-md w-[60] h-11 flex items-center">
              <div className="flex w-full pl-4">
                <p className="flex-shrink-0 w1/3 text-left">Address</p>
                <div className="flex-grow flex items items-center justify-center">
                  <div className="flex gap-3">
                    <p>{userData?.address?.substring(0, 25)}</p>
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
                <p>{userData?.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Email:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{userData?.email}</p>
              </div>
            </div>
          </div>

          <div
            className={`${userData?.role === "doctor"
              ? "hidden"
              : "border-2 rounded-md w-[60] h-11 flex items-center shadow-lg"
              }`}
          >
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Appointment:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>
                  {userData?.appointmentStatus?.length === 0
                    ? "No appointment"
                    : "appointment active"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={` ${userData?.role === "doctor"
              ? "hidden"
              : "border-2 rounded-md w-[60] h-11 flex items-center shadow-lg"
              }`}
          >
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">History:</p>
              <div className="flex-grow flex items-center justify-center ">
                {userData?.history?.length === 0 ? (
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
                <p>{userData?.role}</p>
              </div>
            </div>
          </div>


        </div>
        <div className="flex justify-center items-center w-full py-3 px-3 gap-3">

          <div className="w-[30%] h-[5vh] border-2  rounded-md flex justify-center items-center border-black">
            <button className=" text-md ">forgot password</button>
          </div>

          <div className="w-[30%] h-[5vh] border-2 border-black  rounded-md flex justify-center items-center  ">
            <button className=" text-md ">History</button>
          </div>

          <div
            className="w-[30%] h-[5vh] border-2  rounded-md flex justify-center items-center border-red-400"
            onClick={handleLogout}
          >
            <button className=" text-lg ">logout</button>
          </div>

          <div className="w-[30%] h-[5vh] border-2  rounded-md flex justify-center items-center border-red-400">
            <button className=" text-md ">Delete Account</button>
          </div>


        </div>
      </div>

      {/* <div className=" border-2  w-[70%] desktop:w-[60%] h-auto shadow-2xl rounded-2xl flex flex-col justify-center px-3 ">
        <div className="w-full h-[13vh] px-2 ">
          <div className="w-[50%]  h-[13vh] flex justify-center items-center">
            <div className=" h-[10vh] flex justify-start items-center w-full gap-5">
              <div className="flex justify-start items-center rounded-full overflow-hidden w-28 h-28 border-2  ">
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={userData?.data?.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full "
                  />
                </div>

              </div>
              <div>
                <p className="text-4xl font-[500]">{userData?.data?.name}</p>
              </div>
            </div>

          </div>

        </div>

        <div className="flex justify-center items-center w-full py-4">
          <span className=" flex justify-center items-center border-2 w-full"></span>
        </div>

        <div className="w-full py-2 px-2 h-[13vh] ">

          <div className="flex flex-col gap-5">
            <p className="text-3xl font[500]">
              ChangeName
            </p>
            <div className=" mx-6 w-[20%] h-14 border-2 rounded-lg flex justify-center items-center text-lg font[300]">
              changename
            </div>
          </div>

        </div>

        <div className="flex justify-center items-center w-full py-4">
          <span className=" flex justify-center items-center border-2 w-full"></span>
        </div>

        <div className="w-full py-2 px-2 h-[13vh] ">

          <div className="flex flex-col gap-5">
            <p className="text-3xl font[500]">
              Change Email
            </p>
            <div className=" mx-6 w-[20%] h-14 border-2 rounded-lg flex justify-center items-center text-lg font[300]">
              change
            </div>
          </div>

        </div>

        <div className="flex justify-center items-center w-full py-4">
          <span className=" flex justify-center items-center border-2 w-full"></span>
        </div>

        <div className="w-full py-2 px-2 h-[13vh] ">

          <div className="flex flex-col gap-5">
            <p className="text-3xl font[500]">
              Change Password
            </p>
            <div className=" mx-6 w-[20%] h-14 border-2 rounded-lg flex justify-center items-center text-lg font[300]">
              change
            </div>
          </div>

        </div>

        <div className="flex justify-center items-center w-full py-4">
          <span className=" flex justify-center items-center border-2 w-full"></span>
        </div>

        <div className="w-full flex">

        </div>




      </div > */}

    </div>
  );
};

export default Patient;
