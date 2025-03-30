// UserDate.jsx
import React, { useCallback, useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/Store";
import { clearFilter, removeSelectedState, toogleGridChange } from "../../../Redux/slices/StateChange.slice";
import { BsGrid } from "react-icons/bs";
import { TfiViewList } from "react-icons/tfi";
import { CiUndo } from "react-icons/ci";
import {
  BookAppointMent,
  fetchAllDoctors,
  set_disable,
  setOpenDoctorId,
  toogleShow2,
  toogleShow4,
} from "../../../Redux/slices/Patient.Redux";
import Doctors from "./Doctors";
import { globalResizeFunction } from "../../../Utility/resizer.Utils";
import {
  setHoverField,
} from "../../../Redux/slices/signup_login.";

const FindDoctor = () => {
  const dispatch = useAppDispatch();
  const { selectedState } = useAppSelector(state => state.stateChange)

  const {
    tabletBool,
    mobileBool,
    hoveredField,
    timings,
    doctorData
  } = useAppSelector((state) => state.states);
  const {
    show,
    show4,
    show2,
    openUserId,
    doctor,
    specializedIn,
    address,
    numbersOfDoctors,
    disable,
  } = useAppSelector((state) => state.patient);
  const { isDark, filterdoctors = [] } = useAppSelector((state) => state.stateChange);
  const { gridView } = useAppSelector((state) => state.stateChange);
  const { doctors } = useAppSelector((state) => state.patient)
  const { active_doctors } = useAppSelector(state => state.doctor)

  useEffect(() => {
    dispatch(fetchAllDoctors())
  }, [dispatch]);
  const handleToggleShow = useCallback((doctorId: string | null) => {
    if (openUserId === doctorId) {
      dispatch(setOpenDoctorId(null));
    } else {
      const fetch_doc = doctors?.find((index) => index?._id === doctorId);
      if (fetch_doc?.availability.length > 0) {
        dispatch(setOpenDoctorId(doctorId));
      }
    }
  }, [openUserId, doctors, dispatch]);
  const handleToggleShow4 = useCallback(() => {
    dispatch(toogleShow4());
  }, [show4]);
  const handleMouseOver = useCallback((fieldName: string) => {
    dispatch(setHoverField(fieldName));
  }, [hoveredField]);
  const handleMouseOut = useCallback(() => {
    dispatch(setHoverField(""));
  }, [hoveredField]);
  const data = {
    locality: [
      "Downtown",
      "Greenwood",
      "Lakeside",
      "Hilltop",
      "Riverside",
      "Maplewood",
      "West End",
      "Sunnyvale",
      "Parkview",
      "Meadowbrook",
    ],
    speacilist: [
      "Cardiologist",
      "Dermatologist",
      "Neurologist",
      "Pediatrician",
      "Orthopedic Surgeon",
      "Oncologist",
      "Endocrinologist",
      "Gastroenterologist",
      "Psychiatrist",
      "Ophthalmologist",
    ],
    nearby: [
      "Dr. Sarah Johnson",
      "Dr. Michael Williams",
      "Dr. Emily Brown",
      "Dr. David Smith",
    ],
    text1: "locality",
    text2: "speacilist",
    text3: "nearby",
  };
  const isDisabled = useCallback((id: any) => {
    dispatch(set_disable(id));
  }, [disable]);
  const handleToggleShow2 = useCallback(() => {
    dispatch(toogleShow2());
  }, [show2]);

console.log(active_doctors)


  return (
    <div className={`flex  ${isDark ? "dark" : ""} h-[85vh]`}>
      <div className="dark:bg-bgColorDarkBlack  bg:text-textWhite">
        <FilterBar
          selectedStates={selectedState}
          text1={data?.text1}
          text2={data?.text2}
          text3={data?.text3}
          show={show}
          mobileBool={mobileBool}
          isDark={isDark}
          doctor={doctor}
          specializedIn={specializedIn}
          addresss={address}
        />
      </div>

      <div className="w-[85%] bg-[#dadada] dark:bg-bgColorDarkBlack  dark:text-textWhite ">
        <div className="px-4">
          {/**Selected filterside bar content grid change and clear filter**/}
          <div className="flex justify-between items-center">
            <div className=" flex flex-col font-[600] text-[18px] py-4">
              {numbersOfDoctors}(Doctors available)
            </div>

            <div className="flex gap-4 ">
              {selectedState?.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-primaryRed px-4 rounded-xl text-textWhite"
                >
                  {item}
                  <div
                    className="cursor-pointer bg-bl"
                    onClick={() => dispatch(removeSelectedState(item))}
                  >
                    <IoClose />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 bg-textWhite ps-4 rounded-lg dark:bg-primaryBlack">
              {gridView ? (
                <div
                  aria-label="Grid View"
                  className="
                  cursor-pointer px-2 py-2 hover:sacle-150
                  transition-transform duration-300 disable-selection"
                  onClick={() => dispatch(toogleGridChange())}
                >
                  <BsGrid size={20} />
                </div>
              ) : (
                <div
                  aria-label="List View"
                  className="cursor-pointer px-2 py-2 hover:scale-150 transition-transform duration-300 disable-selection"
                  onClick={() => dispatch(toogleGridChange())}
                >
                  <TfiViewList size={20} />
                </div>
              )}
              <div
                className="flex items-center gap-1 cursor-pointer px-2 py-2 hover:scale-105 transition-transform duration-300"
                onClick={() => dispatch(clearFilter())}
              >
                Clear Filter <CiUndo />
              </div>
            </div>
          </div>
          {/* mapping the Doctors*/}
          {!gridView ? (
            <div className="grid-cols-2 desktop:grid-cols-2 grid gap-4 py-4 px-4">
              {selectedState?.length === 0
                ? doctors?.map((doctor) => (
                  <Doctors
                    key={doctor?._id}
                    isActive={active_doctors?.some((data) => (data as any).userId === (doctor as any)._id.toString() && (data as any).online)}
                    name={doctor?.name}
                    availability={doctor?.availability}
                    profileImage={doctor?.profileImage}
                    address={doctor?.address}
                    history={doctor?.history}
                    role={doctor?.role}
                    specializedIn={doctor?.specialization}
                    Max={doctor?.Max}
                    docisActive={doctorData?.userData?.data?.isActive}
                    id={doctor?._id}
                    show={show}
                    tabletBool={tabletBool}
                    handleToggleShow={handleToggleShow}
                    mobileBool={mobileBool}
                    isDark={isDark}
                    openUserId={openUserId}
                    show4={show4}
                    BookAppointment={BookAppointMent}
                    globalResizeFunction={globalResizeFunction}
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
                ))
                : filterdoctors?.map((doctor) => (
                  <Doctors
                    key={doctor?._id}
                    isActive={active_doctors?.some((data) => (data as any).userId === (doctor as any)._id.toString() && (data as any).online)}
                    name={doctor?.name}
                    availability={doctor?.availability}
                    profileImage={doctor?.profileImage}
                    address={doctor?.address}
                    history={doctor?.history}
                    role={doctor?.role}
                    specializedIn={doctor?.specialization}
                    Max={doctor?.Max}
                    docisActive={doctorData?.userData?.data?.isActive}
                    id={doctor?._id}
                    show={show}
                    tabletBool={tabletBool}
                    handleToggleShow={handleToggleShow}
                    mobileBool={mobileBool}
                    isDark={isDark}
                    openUserId={openUserId}
                    show4={show4}
                    BookAppointment={BookAppointMent}
                    globalResizeFunction={globalResizeFunction}
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
                ))
              }
            </div>

          ) : (
            <div
              className={`grid-row desktop:grid-cols-3 mobile:grid-rows-1 grid gap-4 py-4 px-4  `}
            >
              {doctors?.map((doctor) => (
                <Doctors
                  key={doctor?._id}
                  isActive={active_doctors?.some((data) => (data as any).userId === (doctor as any)._id.toString() && (data as any).online)}
                  name={doctor?.name}
                  availability={doctor?.availability}
                  profileImage={doctor?.profileImage}
                  address={doctor?.address}
                  history={doctor?.history}
                  role={doctor?.role}
                  show={show}
                  tabletBool={tabletBool}
                  handleToggleShow={handleToggleShow}
                  mobileBool={mobileBool}
                  isDark={isDark}
                  id={doctor?._id}
                  openUserId={openUserId}
                  show4={show4}
                  Max={doctor?.Max}
                  BookAppointment={BookAppointMent}
                  globalResizeFunction={globalResizeFunction}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                  hoveredField={hoveredField}
                  disable={disable}
                  isDisabled={isDisabled}
                  handleToggleShow4={handleToggleShow4}
                  handleToggleShow2={handleToggleShow2}
                  show2={show2}
                  timings={timings}
                  docisActive={doctorData?.userData?.data?.isActive}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;
