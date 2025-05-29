import React, { useEffect, useRef } from 'react'
import { setPage } from '../../../Redux/slices/StateChange.slice';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/Store';
import { fetchAllDoctors } from '../../../Redux/slices/Patient.Redux';

const LoadMore = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.stateChange.page);
    const doctors = useAppSelector((state) => state.patient.doctors);
    const stopQuery = useAppSelector((state) => state.patient.stopQuery);
    const pageRef = useRef(page);
    const sentinel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!stopQuery) {
            dispatch(fetchAllDoctors());
        } else {
            console.log("query stopped");
        }
        pageRef.current = page;
    }, [page]);
    
    return (
        <div className={`flex justify-center px-3 py-3  h-[7vh] ${stopQuery || (doctors as any)?.length < 10 && "hidden"}`} ref={sentinel} onClick={() => dispatch(setPage((pageRef as any).current + 1))} >
            <div className="bg-gradient-to-r from-blue-200 to-blue-400  w-[10%] h-[6vh] rounded-lg flex justify-center ">
                <button>
                    <p className="text-[20px] font-[400] text-white">
                        Load more
                    </p>
                </button>
            </div>
        </div>
    )
}

export default React.memo(LoadMore)
