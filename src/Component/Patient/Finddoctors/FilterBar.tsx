// FilterBar.jsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/Store";
import { removeSelectedState, setSelectedState } from "../../../Redux/slices/StateChange.slice";
import e from "cors";
import { setSearchQuery } from "../../../Redux/slices/Patient.Redux";
import { IoArrowBackCircle } from "react-icons/io5";

const data = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grapes"];

interface IData {
  setShowFilter?: (a) => void
}

const FilterBar: React.FC<IData> = React.memo((props) => {
  const dispatch = useAppDispatch()
  const { setShowFilter } = props;
  const text1 = "locality"
  const text2 = "speacilist"
  const doctors = useAppSelector((state) => state?.patient?.doctors);
  const searchQuery = useAppSelector((state) => state?.patient)?.searchQuery;
  const specializedIn = useAppSelector((state) => state?.patient?.specializedIn);
  const selectedStates = useAppSelector(state => state.stateChange.selectedState)
  const addresss = useAppSelector((state) => state.patient.address);
  const isDark = useAppSelector((state) => state.stateChange.isDark);

  const handleCheckboxChange = (currentState: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      dispatch(setSelectedState({ currentState, doctors }));
    } else {
      dispatch(removeSelectedState(currentState));
    }
  };
  const handleSearchChange = (e) => {
    const { value, name } = e.target;
    console.log(value)
    dispatch(
      setSearchQuery({ field: name as keyof typeof searchQuery, value })
    );
  };
  const filterAddess = addresss?.filter((data) => {
    return data.toLowerCase().includes((searchQuery as any).name.toLowerCase() || '');
  });
  const filterspeacilistSearch = specializedIn?.filter((data) => {
    console.log(data)
    return Object.values(data).includes((searchQuery as any).speacilistSearch.toLowerCase() || '');
  });
  
  return (
    <div className="fixed inset-0 flex items-center justify-evenly bg-opacity-80 z-50  bg-black w-full">
      <div className={`w-[90%] h-[70vh] rounded-md overflow-x-scroll custom-scrollbar ${isDark ? "bg-bgColorDarkBlack  text-white " : "bg-white"}`}>

        <div className="  font-[600] text-[18px] border-b py-4 flex justify-evenly items-center w-full pt-4 px-4">
          <div className="flex items-center w-[50%]">
            Filter By
          </div>

          <div className="flex items-center w-[50%] justify-end">
            <button onClick={() => setShowFilter?.(false)}>
              <IoArrowBackCircle size={35} />
            </button>
          </div>
        </div>

        <div className="pt-4 px-4">
          <div className="font-[600] text-[14px] flex items-center w-full">
            <div className="w-[50%]">
              {text1}
            </div>
            <div className="w-[50%] flex justify-end">
              <div className="">
                <input
                  type="text"
                  placeholder="search"
                  className="border border-primaryGrey rounded-[10px] h-[2rem] w-full placeholder-gray-500 outline-none shadow-lg"
                  id="name"
                  name="name"
                  value={searchQuery?.name}
                  onChange={(e) => handleSearchChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="py-2 border-b w-full grid desktop:grid-cols-5 mobile:grid-cols-3 gap-4 overflow-x-auto custom-scrollbar">
            {filterAddess?.length === 0 ? addresss?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleCheckboxChange(item)}
                  checked={selectedStates?.includes(item)}
                />
                <div className="flex  w-40 items-center">{item.length > 10 ? item.slice(0, 20) : item}</div>
              </div>
            )) : filterAddess?.map((item, index) => (
              <div key={index} className="flex gap-2 w-full">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleCheckboxChange(item)}
                  checked={selectedStates?.includes(item)}
                />
                <div className="flex  desktop:w-41 mobile:w-40 items-center">{item.length > 10 ? item.slice(0, 20) : item}</div>
              </div>
            ))}

          </div>
        </div>

        <div className="pt-4 px-4">
          <div className="font-[600] text-[14px] flex items-center w-full">
            <div className="w-[50%]">
              {text2}
            </div>
            <div className="w-[50%] flex justify-end">
              <div className="">
                <input
                  type="text"
                  placeholder="search"
                  className="border border-primaryGrey rounded-[10px] h-[2rem] w-full placeholder-gray-500 outline-none shadow-lg"
                  id="speacilistSearch"
                  name="speacilistSearch"
                  value={searchQuery?.speacilistSearch}
                  onChange={(e) => handleSearchChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="py-2 border-b w-full grid desktop:grid-cols-4 mobile:grid-cols-3 gap-4 overflow-x-auto custom-scrollbar">
            {filterspeacilistSearch?.length === 0
              ? specializedIn?.map((item: any, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => handleCheckboxChange(item.field.field)}
                    checked={selectedStates?.includes(item.field.field)}
                  />
                  <div className="flex w-4 items-center ">
                    {item.field.field.length > 10 ? item.field.field.slice(0, 20) : item.field.field ?? "unknown"}
                  </div>
                </div>
              ))
              : filterspeacilistSearch?.map((item: any, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => handleCheckboxChange(item.field.field)}
                    checked={selectedStates?.includes(item.field.field)}
                  />
                  <div className="flex w-40  items-center">
                    {item.field.field.length > 10 ? item.field.field.slice(0, 20) : item.field.field}
                  </div>
                </div>
              ))
            }

          </div>
        </div>

        {/* <div className="py-4">
          <div className="font-[600] text-[14px]">{text3}</div>
          <div className="py-2 border-b">
             {doctor?.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="cursor-pointer"
                onChange={handleCheckboxChange(item)}
                checked={selectedStates?.includes(item)}
              />
              <div>{item}</div>
            </div>
          ))} 
          </div>

        </div> */}

      </div>

    </div>
  );
});

export default FilterBar;
