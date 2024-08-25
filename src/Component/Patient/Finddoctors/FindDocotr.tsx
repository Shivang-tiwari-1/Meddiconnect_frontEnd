// UserDate.jsx
import React, { useState } from 'react'
import FilterBar from './FilterBar'
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/Store';
import { useActionData } from 'react-router-dom';
import { toogleGridChange } from '../../../Redux/slices/StateChange.slice';
import { BsGrid } from "react-icons/bs";
import { TfiViewList } from "react-icons/tfi";
import { CiUndo } from "react-icons/ci";

const FindDoctor = () => {
  const [selectedState, setSelectedState] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const { gridView } = useAppSelector((state) => state.stateChange);
  const numOfProperties: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];


  const clearFilter = () => {
    setSelectedState([]);
  }

  const handleSelectState = (currentState: string) => {
    setSelectedState((prevState: string[]) => [...prevState, currentState]);
  }

  const handleDeselct = (currentState: string) => {
    setSelectedState((prevCriteria: string[]) => prevCriteria.filter((item) => item !== currentState))
  }

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
      "Meadowbrook"
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
      "Ophthalmologist"],
    nearby: [
      "Dr. Sarah Johnson",
      "Dr. Michael Williams",
      "Dr. Emily Brown",
      "Dr. David Smith"],
    text1: 'locality',
    text2: 'speacilist',
    text3: 'nearby'
  }
  return (
    <div className='flex'>
      <div className='"dark:bg-bgColorDarkBlack  bg:text-textWhite'>
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
        />
      </div>
      <div className='w-[85vw] bg-[#dadada] dark:bg-bgColorDarkBlack '>
        <div className='px-4'>

          <div className='flex justify-between items-center'>

            <div className=' flex flex-col font-[600] text-[18px] dark:text-textWhite py-4'>
              1,235(Doctors available)
            </div>

            <div className='flex gap-4'>
              {selectedState.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-4 bg-primaryRed px-4 rounded-xl text-textWhite">
                  {item}

                  <div className='cursor-pointer bg-bl' onClick={() => handleDeselct(item)}>
                    <IoClose />
                  </div>
                </div>
              ))

              }

            </div>

            <div className='flex gap-4 bg-textWhite ps-4 rounded-lg'>
              {
                gridView ?
                  <div aria-label="Grid View" className='
                  cursor-pointer px-2 py-2 hover:sacle-150
                  transition-transform duration-300 disable-selection'
                    onClick={() => dispatch(toogleGridChange())}>
                    <BsGrid size={20} />
                  </div> :
                  <div aria-label="List View" className="cursor-pointer px-2 py-2 hover:scale-150 transition-transform duration-300 disable-selection" onClick={() => dispatch(toogleGridChange())}><TfiViewList size={20} /></div>

              }
              <div className="flex items-center gap-1 cursor-pointer px-2 py-2 hover:scale-105 transition-transform duration-300" onClick={() => clearFilter()}>
                Clear Filter <CiUndo />
              </div>
            </div>

          </div>

          <div className={`${gridView ? 'grid-cols-6' : 'grid-cols-12'} grid  gap-4 py-4 px-4 `}>
            {numOfProperties.map((key, items) => (
              <div key={items} className='col-span-3'>

              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default FindDoctor;
