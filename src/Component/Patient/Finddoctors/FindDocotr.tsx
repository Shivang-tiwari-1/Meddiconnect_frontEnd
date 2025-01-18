// UserDate.jsx
import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/Store";
import { toogleGridChange } from "../../../Redux/slices/StateChange.slice";
import { BsGrid } from "react-icons/bs";
import { TfiViewList } from "react-icons/tfi";
import { CiUndo } from "react-icons/ci";
import {
  BookAppointMent,
  fetchAllDoctors,
  set_disable,
  setOpenDoctorId,
  sideBarContent,
  toogleShow,
  toogleShow2,
  toogleShow4,
} from "../../../Redux/slices/Patient.Redux";
import Doctors from "./Doctors";
import { globalResizeFunction } from "../../../Utility/resizer.Utils";
import {
  set_hashed_id,
  setHoverField,
} from "../../../Redux/slices/signup_login.";

const FindDoctor = () => {
  const dispatch = useAppDispatch();
  const [selectedState, setSelectedState] = useState<string[]>([]);

  //--------------------------------------------App-selectors---------------------------------//

  const {
    tabletBool,
    mobileBool,
    hoveredField,
    timings,
    hashedData,
    docisActive,
    doctorData,
    patientData,
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
  const { isDark } = useAppSelector((state) => state.stateChange);
  const { gridView } = useAppSelector((state) => state.stateChange);
  const { doctors } = useAppSelector((state) => state.patient);

  //--------------------------------------------functions---------------------------------//
  const handleToggleShow = (doctorId: string | null) => {
    if (openUserId === doctorId) {
      dispatch(setOpenDoctorId(null));
    } else {
      const fetch_doc = doctors?.find((index) => {
        return index?._id === doctorId;
      });

      if (fetch_doc?.availability.length > 0) {
        console.log(doctorId);
        dispatch(setOpenDoctorId(doctorId));
      }
    }
  };

  const handleToggleShow4 = () => {
    dispatch(toogleShow4());
  };

  useEffect(() => {
    dispatch(fetchAllDoctors()).then((action) => {});
  }, [dispatch]);

  const clearFilter = () => {
    setSelectedState([]);
  };

  const handleSelectState = (currentState: string) => {
    setSelectedState((prevState: string[]) => [...prevState, currentState]);
  };

  const handleDeselct = (currentState: string) => {
    setSelectedState((prevCriteria: string[]) =>
      prevCriteria.filter((item) => item !== currentState)
    );
  };

  const handleMouseOver = (fieldName: string) => {
    dispatch(setHoverField(fieldName));
  };

  const handleMouseOut = () => {
    dispatch(setHoverField(""));
  };

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

  const isDisabled = (id: any) => {
    dispatch(set_disable(id));
  };

  const handleToggleShow2 = () => {
    dispatch(toogleShow2());
  };

  return (
    <div className={`flex  ${isDark ? "dark" : ""} h-[85vh]`}>
      <div className="dark:bg-bgColorDarkBlack  bg:text-textWhite">
        <FilterBar
          selectedStates={selectedState}
          onSelectState={handleSelectState}
          onDeselectstate={handleDeselct}
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
              {selectedState.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-primaryRed px-4 rounded-xl text-textWhite"
                >
                  {item}
                  <div
                    className="cursor-pointer bg-bl"
                    onClick={() => handleDeselct(item)}
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
                onClick={() => clearFilter()}
              >
                Clear Filter <CiUndo />
              </div>
            </div>
          </div>
          {/* mapping the Doctors*/}
          {!gridView ? (
            <div
              className={`grid-cols-2 desktop:grid-cols-2 grid gap-4 py-4 px-4  `}
            >
              {doctors?.map((doctor) => (
                <Doctors
                  key={doctor?._id}
                  isActive={doctor?.isActive}
                  name={doctor?.name}
                  availability={doctor?.availability}
                  profileImage={doctor?.profileImage}
                  address={doctor?.address}
                  history={doctor?.history}
                  role={doctor?.role}
                  specializedIn={doctor?.specialization}
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
          ) : (
            <div
              className={`grid-row desktop:grid-cols-3 mobile:grid-rows-1 grid gap-4 py-4 px-4  `}
            >
              {doctors?.map((doctor) => (
                <Doctors
                  key={doctor?._id}
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
