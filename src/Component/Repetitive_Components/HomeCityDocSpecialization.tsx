import React from 'react'
import { useAppSelector } from '../../Redux/Store/Store';

const HomeCityDocSpecialization = () => {
    const specializedIn = useAppSelector((state) => state?.patient.specializedIn);
    const  patientData  = useAppSelector((state) => state.states.patientData);
    const  city  = useAppSelector((state) => state?.patient.city);


    return (
        <div className="w-full min-h-[30vh] mobile:h-[50vh] h-auto flex flex-col py-4 border-b-2 shadow-lg rounded-md">
            <div className="text-center w-full h-auto px-3">
                <p className="h-auto font-[400] text-2xl">
                    {patientData?.accessToken ? city ? ` Top Doctor Specialist in ${city}` : "Top Doctor Specialist " : "Top Doctor Specialist "}
                </p>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="max-w-[900px] w-full px-3 py-3 grid gap-3 grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))]">
                    {specializedIn?.map((data: any, index) => (
                        <div
                            key={data?.field.field}
                            className="px-4 h-[6vh] desktop:w-[15vh] mobile:h-[8.5vh] bg-[#02a6d8] rounded-full flex items-center justify-center"
                        >
                            <div className="flex flex-col items-center text-white text-[16px] mobile:text-[14px] font-[400] leading-tight">
                                <p>{(data as any).field.field}</p>
                                <p>{`{${(data as any)?.count}}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default React.memo(HomeCityDocSpecialization)
