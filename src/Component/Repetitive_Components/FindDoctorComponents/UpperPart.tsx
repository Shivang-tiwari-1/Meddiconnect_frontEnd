import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/Store';
import { CiFilter, CiUndo } from 'react-icons/ci';
import FilterBar from '../../Patient/Finddoctors/FilterBar';
import { clearFilter, toogleGridChange } from '../../../Redux/slices/StateChange.slice';
import { BsGrid } from 'react-icons/bs';
import { TfiViewList } from 'react-icons/tfi';

const UpperPart = () => {
    const dispatch = useAppDispatch();
    const numbersOfDoctors = useAppSelector((state) => state.patient.numbersOfDoctors);
    const doctors = useAppSelector((state) => state.patient.doctors);
    const selectedStates = useAppSelector(state => state.stateChange.selectedState)
    const [showFilter, setShowFilter] = useState(false);
    const gridView = useAppSelector((state) => state.stateChange.gridView);

    return (
        <div className="flex justify-between w-full items-center">

            <div className=" flex flex-col font-[600] text-[18px] py-4 ">
                {numbersOfDoctors}(Doctors available)
            </div>

            <div className="flex gap-4 bg-textWhite ps-4 rounded-lg dark:bg-bgColorDarkBlack  mobile:hidden">
                {!showFilter ?
                    (
                        <div className={`flex items-center ${(doctors as any).length < 5 && "hidden"}`} onClick={() => setShowFilter(true)}>
                            <CiFilter size={30} />
                        </div>
                    ) :
                    (
                        <FilterBar setShowFilter={setShowFilter} />
                    )
                }

                {gridView ? (
                    <div
                        aria-label="Grid View"
                        className={`cursor-pointer px-2 py-2 hover:sacle-150 transition-transform duration-300 disable-selection ${(doctors as any).length < 10 && "hidden"}`}
                        onClick={() => dispatch(toogleGridChange())}
                    >
                        <BsGrid size={20} />
                    </div>
                ) : (
                    <div
                        aria-label="List View"
                        className={`
                            cursor-pointer px-2 py-2 hover:sacle-150
                            transition-transform duration-300 disable-selection ${(doctors as any).length < 10 && "hidden"}`}
                        onClick={() => dispatch(toogleGridChange())}
                    >
                        <TfiViewList size={20} />
                    </div>
                )}
                
                <div
                    className={`flex items-center gap-1 cursor-pointer px-2 py-2 hover:scale-105 transition-transform duration-300 ${selectedStates?.length === 0 && "hidden"}`}
                    onClick={() => dispatch(clearFilter())}
                >
                    Clear Filter <CiUndo />
                </div>
            </div>

            {/*FOR-MOBILE*/}
            <div className="cursor-pointer px-2 py-2 
          transition-transform duration-300 disable-selection laptop:hidden desktop:hidden tablet:hidden">
                {!showFilter ? <div className="flex items-center" onClick={() => setShowFilter(true)}>
                    <CiFilter size={30} />
                </div> : <FilterBar setShowFilter={setShowFilter} />}
            </div>

        </div>
    )
}

export default React.memo(UpperPart)
