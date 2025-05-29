import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { useAppDispatch, useAppSelector } from '../../Redux/Store/Store';
import { doctor_by_state } from '../../Redux/slices/Patient.Redux';
import { Tuple } from '@reduxjs/toolkit';

const HomeSellect = () => {
    const currentCitydata = useAppSelector((state) => state.stateChange.currentCitydata);
    const currentState = useAppSelector((state) => state.stateChange.currentState);
    console.log("re-render-Homeselct")
    const dispatch = useAppDispatch();
    return (
        <div className="relative w-full flex justify-evenly items-center">
            <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <select
                name="location"
                className="border border-gray-300 rounded-lg h-[2.5rem] w-full pl-10 pr-5 bg-white appearance-none outline-none shadow-md"
                onChange={(e) => dispatch(doctor_by_state({ State: (currentState as any)?.State, value: e.target.value }))}
            >
                <option value={(currentCitydata as any)[0]} disabled selected>{(currentCitydata as any)[0]}</option>
                {(currentCitydata as Tuple).length > 0 ? (currentCitydata as any)[1].map((location) => (
                    <option key={location} value={location.toLowerCase()} >
                        {location}
                    </option>
                )) : []}
            </select>`
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                ▼
            </span>
        </div>

    )
}

export default React.memo(HomeSellect)
