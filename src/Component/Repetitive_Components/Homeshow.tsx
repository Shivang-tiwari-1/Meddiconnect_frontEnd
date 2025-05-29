import React from 'react'
import { useAppSelector } from '../../Redux/Store/Store';
import { FaUserDoctor } from 'react-icons/fa6';
import { GiMedicines } from 'react-icons/gi';

const Homeshow = () => {
    console.log("re-render-homeShow")
    const numbersOfDoctors = useAppSelector((state) => state.patient.numbersOfDoctors);
    const specializedIn = useAppSelector((state) => state.patient.specializedIn);
    const isDark = useAppSelector((state) => state.stateChange.isDark);

    return (
        <div className={`w-full min-h-[30vh] h-auto flex justify-center flex-col py-4  border-b-2 shadow-lg rounded-md  `}>

            <div className="flex flex-col justify-start items-center py-6 ">
                <div className="flex  justify-center items-center w-full min-h-[100px]">
                    <p className=" h-10 flex mobile:flex-col desktop:flex-row tablet:flex-row desktop:gap-3 tablet:gap-3 laptop:gap-3 laptop:flex-row justify-center items-center font-[400] text-5xl tablet:text-4xl">
                        Find the nearest
                        <span>health provider</span>
                    </p>
                </div>
                <div className="w-full flex justify-center items-center py-4">
                    <p className="font-[400] text-[18px]  text-primaryGrey">Search by</p>
                </div>
            </div>

            <div className=" flex gap-7 mobile:gap-4 justify-center items-center ">
                <div className="flex flex-col justify-center items-center">
                    <div className="h-16 w-16 rounded-full flex justify-center items-center  bg-[#02a6d8]  "> <p className={`${isDark ? "text-black" : "text-white"}`}><FaUserDoctor size={25} />
                    </p>
                    </div>
                    <p className="font-[400] text-[18px]  text-primaryGrey">
                        Doctors
                    </p>
                    <p className="font-[400] text-[18px]  text-primaryGrey">
                        {`{${numbersOfDoctors}}`}
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="bg-[#02a6d8] h-16 w-16 rounded-full flex justify-center items-center"> <p className={`${isDark ? "text-black" : "text-white"}`}><GiMedicines size={30} /></p>
                    </div>
                    <p className="font-[400] text-[18px] text-primaryGrey">
                        Treatments
                    </p>
                    <p className="font-[400] text-[18px]  text-primaryGrey">
                        {`{${specializedIn.length}}`}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default React.memo(Homeshow)
