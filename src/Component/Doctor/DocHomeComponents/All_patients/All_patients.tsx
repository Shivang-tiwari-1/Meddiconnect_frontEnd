import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Store/Store";
import { getDetailOfthePatient } from "../../../../Redux/slices/Doctor.Redux";
import PatientMap from "./PatientMap";
import {
  set_disable,
  setOpenDoctorId,
  toogleShow2,
  toogleShow4,
} from "../../../../Redux/slices/Patient.Redux";
import { setHoverField } from "../../../../Redux/slices/signup_login.";

const All_patients = () => {
  const dispatch = useAppDispatch();

  //...........................states......................//
  const { isDark, gridView } = useAppSelector((state) => state.stateChange);
  const { patientData } = useAppSelector((state) => state.doctor);
  const { show, show4, show2, openUserId, disable, days } = useAppSelector(
    (state) => state.patient
  );
  const { tabletBool, mobileBool, hoveredField, timings } = useAppSelector(
    (state) => state.states
  );
  //...........................states......................//
  const handleToggleShow = (userId: string | null) => {
    if (openUserId === userId) {
      dispatch(setOpenDoctorId(null));
    } else {
      dispatch(setOpenDoctorId(userId));
    }
  };
  const handleMouseOver = (fieldName: string) => {
    dispatch(setHoverField(fieldName));
  };

  const handleMouseOut = () => {
    dispatch(setHoverField(""));
  };

  const isDisabled = (id: any) => {
    dispatch(set_disable(id));
  };

  const handleToggleShow4 = () => {
    dispatch(toogleShow4());
  };

  const handleToggleShow2 = () => {
    dispatch(toogleShow2());
  };
  
  const capture_string = (key, item, index) => {
    dispatch(set_bookappointme({ key, item, index }));
    if (key === "day") {
      const current__Day =
        availability?.filter((index) => {
          return index?.day === item;
        }) || [];
      console.log(current__Day);
      dispatch(set_timings(current__Day[0]));
    }
  };

  return (
    <div
      className={`flex flex-row items-center h-[85vh] w-full ${
        isDark ? "bg-lightBlack text-white" : "bg-white"
      } p-3`}
    >
      {/* <div
        className={`flex justify-start tablet:w-[30%] desktop:w-[20%] h-[80vh] p-3 border-2 rounded-xl `}
      >
        <div className="flex  justify-start items-start flex-col ">
          <div className="text-3xl font-[500]">
            <p>Date:</p>
          </div>
          <div className="text-3xl font-[500]">
            <p>crowd:</p>
          </div>
          <div className="text-3xl font-[500]">
            <p>checked:</p>
          </div>
          <div className="text-3xl font-[500]">
            <p>missed:</p>
          </div>
        </div>
      </div> */}

      <div className="h-[80vh] tablet:w-full desktop:w-full flex flex-col">
        <div className="flex justify-evenly items-center p-1">
          {days.map((item, index) => (
            <button key={index} className="" onClick={capture_string}>
              <p className="text-lg font-medium">{item}</p>
            </button>
          ))}
        </div>
        {!gridView ? (
          <div
            className={`grid-cols-2 desktop:grid-cols-2 grid gap-4 py-4 px-4  `}
          >
            {" "}
            {patientData?.map((patient) => (
              <PatientMap
                key={String(patient?._id)}
                isActive={patient?.isActive}
                name={patient?.name}
                profileImage={patient?.profileImage}
                address={patient?.address}
                history={patient?.history}
                role={patient?.role}
                show={show}
                handleToggleShow={handleToggleShow}
                isDark={isDark}
                id={patient?._id}
                openUserId={openUserId}
                show4={show4}
                Max={patient?.Max}
                handleMouseOver={handleMouseOver}
                handleMouseOut={handleMouseOut}
                hoveredField={hoveredField}
                disable={disable}
                isDisabled={isDisabled}
                handleToggleShow4={handleToggleShow4}
                handleToggleShow2={handleToggleShow2}
                show2={show2}
                timings={timings}
              />
            ))}
          </div>
        ) : (
          <div
            className={`grid-row desktop:grid-cols-3 mobile:grid-rows-1 grid gap-4 py-4 px-4  `}
          >
            {patientData?.map((patient) => (
              <PatientMap
                key={String(patient?._id)}
                isActive={patient?.isActive}
                name={patient?.name}
                profileImage={patient?.profileImage}
                address={patient?.address}
                history={patient?.history}
                role={patient?.role}
                show={show}
                handleToggleShow={handleToggleShow}
                isDark={isDark}
                id={patient?._id}
                openUserId={openUserId}
                show4={show4}
                Max={patient?.Max}
                handleMouseOver={handleMouseOver}
                handleMouseOut={handleMouseOut}
                hoveredField={hoveredField}
                disable={disable}
                isDisabled={isDisabled}
                handleToggleShow4={handleToggleShow4}
                handleToggleShow2={handleToggleShow2}
                show2={show2}
                timings={timings}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default All_patients;
