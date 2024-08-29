import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/Store";
import globalUseEffect from "../../../Utility/GlobalUseeffect";
import {
  getUserData,
  history,
  toogleShow,
} from "../../../Redux/slices/Patient.Redux";
import PageModel from "../../../Utility/PageModel.Utils";

const Patient = () => {
  const { patientData, show, Appointmenthistory } = useAppSelector(
    (state) => state.patient
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleToggleShow = () => {
    dispatch(toogleShow());
  };
  const handleHistory = () => {
    dispatch(history());
    dispatch(toogleShow());
  };

  return (
    <div className="flex justify-center items-center w-full h-[85vh]">
      <div className=" border-2  w-[70%] desktop:w-[40%] h-[80vh] shadow-2xl rounded-2xl flex justify-center pl-3 ">
        <div className="flex justify-center  flex-col font-[300px] gap-4 w-[60%]">
          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Name:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{patientData?.name}</p>
              </div>
            </div>
          </div>

          {show ? (
            <PageModel
              address={patientData?.address}
              toggleShow={handleToggleShow}
            />
          ) : (
            <div className="border-2 rounded-md w-[60] h-11 flex items-center">
              <div className="flex w-full pl-4">
                <p className="flex-shrink-0 w1/3 text-left">Address</p>
                <div className="flex-grow flex items items-center justify-center">
                  <div className="flex gap-3">
                    <p>{patientData?.address?.substring(0, 25)}</p>
                    <button onClick={handleToggleShow}>show...</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Phone:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{patientData?.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Email:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{patientData?.email}</p>
              </div>
            </div>
          </div>

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Appointment:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>
                  {patientData?.appointmentStatus?.length === 0
                    ? "No appointment"
                    : "appointment active"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">History:</p>
              <div className="flex-grow flex items-center justify-center ">
                {patientData?.history?.length === 0 ? (
                  <div>
                    <p>No history</p>
                  </div>
                ) : !show ? (
                  <button onClick={handleHistory}>...show history</button>
                ) : (
                  <PageModel
                    history={patientData?.history}
                    Appointmenthistory={Appointmenthistory}
                    toggleShow={handleToggleShow}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="border-2 rounded-md w-[60] h-11 flex items-center shadow-lg">
            <div className="flex w-full pl-4">
              <p className="flex-shrink-0 w-1/3 text-left">Role:</p>
              <div className="flex-grow flex items-center justify-center ">
                <p>{patientData?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
