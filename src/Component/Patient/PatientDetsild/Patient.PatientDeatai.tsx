import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/Store';
import globalUseEffect from '../../../Utility/GlobalUseeffect';
import { getUserData } from '../../../Redux/slices/Patient.Redux';

const Patient = () => {

    const { patientData } = useAppSelector((state) => state.patient);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(getUserData())
    }, [getUserData]);


    return (
        <div className='flex justify-center items-center w-full h-[85vh]'>
            <div className=' border-2  w-[70%] desktop:w-[40%] h-[80vh] shadow-2xl rounded-2xl flex justify-center pl-3 '>

                <div className='flex justify-center  flex-col font-[300px] gap-4 w-[60%]'>

                    <div className='border-2 rounded-md w-[60] h-11 flex items-center'>
                        <div className='flex gap-4'>
                            <p className=''>
                                name
                            </p>
                            <div className='border-l-2 '>
                                <p >
                                    {patientData?.name}
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className='border-2 rounded-md w-[60] h-11 flex items-center'>
                        address
                    </div>

                    <div className='border-2 rounded-md w-[60] h-11 flex items-center'>
                        phone
                    </div>

                    <div className='border-2 rounded-md w-[60] h-11 flex items-center'>
                        mail
                    </div>

                    <div className='border-2 rounded-md w-[60] h-11 flex items-center'>
                        current appointment
                    </div>

                    <div className='border-2 rounded-md w-[60] h-11 flex items-center'>
                        history
                    </div>

                    <div className='border-2 rounded-md w-[60] h-11 flex items-center'>
                        change
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Patient;
