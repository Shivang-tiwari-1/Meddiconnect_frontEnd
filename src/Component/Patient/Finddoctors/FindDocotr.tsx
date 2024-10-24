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
  setOpenDoctorId,
  toogleShow,
} from "../../../Redux/slices/Patient.Redux";
import Doctors from "./Doctors";
import { globalResizeFunction } from "../../../Utility/resizer.Utils";

const FindDoctor = () => {
  const [selectedState, setSelectedState] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  //--------------------------------------------App-selectors---------------------------------//

  const { tabletBool, mobileBool } = useAppSelector((state) => state.states);
  const { show, show2, show3, show4, openDoctorId } = useAppSelector(
    (state) => state.patient
  );
  const { isDark } = useAppSelector((state) => state.stateChange);
  const { gridView } = useAppSelector((state) => state.stateChange);
  const { doctors } = useAppSelector((state) => state.patient);

  //--------------------------------------------functions---------------------------------//
  const handleToggleShow = (doctorId: string | null) => {
    if (openDoctorId === doctorId) {
      dispatch(setOpenDoctorId(null));
    } else {
      dispatch(setOpenDoctorId(doctorId));
    }
  };
  globalResizeFunction();

  useEffect(() => {
    dispatch(fetchAllDoctors());
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
console.log(doctors)
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
  return (
    <div className={`flex  ${isDark ? "dark" : ""}`}>
      <div className="dark:bg-bgColorDarkBlack  bg:text-textWhite">
        <FilterBar
          locality={data?.locality}
          speacilist={data?.speacilist}
          nearby={data?.nearby}
          selectedStates={selectedState}
          onSelectState={handleSelectState}
          onDeselectstate={handleDeselct}
          text1={data?.text1}
          text2={data?.text2}
          text3={data?.text3}
          show={show}
          tabletBool={tabletBool}
          mobileBool={mobileBool}
          isDark={isDark}
        />
      </div>
      <div className="w-[85vw] bg-[#dadada] dark:bg-bgColorDarkBlack  dark:text-textWhite ">
        <div className="px-4">
          {/**Selected filterside bar content grid change and clear filter**/}
          <div className="flex justify-between items-center">
            <div className=" flex flex-col font-[600] text-[18px] py-4">
              1,235(Doctors available)
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
              {doctors.map((doctor) => (
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
                  openDoctorId={openDoctorId}
                  show4={show4}
                  Max={doctor?.Max}
                  BookAppointment={BookAppointMent}
                />
              ))}
            </div>
          ) : (
            <div
              className={`grid-cols desktop:grid-cols-3 mobile:grid-rows-1 grid gap-4 py-4 px-4  `}
            >
              {doctors.map((doctor) => (
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
                  openDoctorId={openDoctorId}
                  show4={show4}
                  Max={doctor?.Max}
                  BookAppointment={BookAppointMent}
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
