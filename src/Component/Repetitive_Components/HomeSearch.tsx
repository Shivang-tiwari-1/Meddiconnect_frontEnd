import React from 'react'
import DoctorSearch from './DoctorSearch'
import { useAppDispatch, useAppSelector } from '../../Redux/Store/Store';
import { setSearchQuery, toogleShow, toogleShow5 } from '../../Redux/slices/Patient.Redux';

const HomeSearch = () => {
    console.log("re-render-hoemserach")
    const dispatch = useAppDispatch();
    const show5 = useAppSelector((state) => state.patient.show5);
    const city = useAppSelector((state) => state.patient.city);
    const searchQuery = useAppSelector((state) => state?.patient.searchQuery);
    const isDark = useAppSelector((state) => state.stateChange.isDark);

    const handleSearchChange = (e) => {
        const { value, name } = e.target;

        dispatch(
            setSearchQuery({ field: name as keyof typeof searchQuery, value })
        );
    };

    const poInput = () => {
        dispatch(toogleShow5());
    };
    return (
        <div className="w-full relative">
            <input type="text"
                name="doctorSearch"
                id="doctorSearch"
                onClick={poInput}
                placeholder="Search for doctor"
                className="border border-primaryGrey rounded-lg h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                value={searchQuery?.doctorSearch}
                onChange={(e) => handleSearchChange(e)}
            />

            {city !== null &&
                <div className={`w-full border-2 h-[20vh] absolute shadow-md mt-1 rounded-lg p-2 z-10 overflow-y-scroll custom-scrollbar space-y-2 
                ${!show5 ? "hidden" : ""} 
                ${isDark ? "bg-bgColorDarkBlack bg-opacity-100 text-white" : "bg-white bg-opacity-100"}`}>
                    <DoctorSearch />
                </div>
            }

        </div>
    )
}

export default React.memo(HomeSearch)
