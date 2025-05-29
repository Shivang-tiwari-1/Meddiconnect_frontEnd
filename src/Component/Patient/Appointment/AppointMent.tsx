import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../Redux/Store/Store';
import { convertTo12HourFormat } from '../../../Services/service';
import { MdOutlineError } from 'react-icons/md';

const AppointMent = () => {
    const isDark = useAppSelector((state) => state.stateChange.isDark);
    const userData = useAppSelector((state) => state.states.userData);
    console.log((userData as any))
    return (
        <div className={`w-full ${(userData as any).data.appointmentStatus.length === 0 ? "h-[84vh]" : "h-auto"} ${isDark ? "bg-bgColorDarkBlack text-white" : " bg-textWhite"} `}>
            {(userData as any).data.appointmentStatus.length !== 0 ? <div className="px-6 py-3">
                <div className="grid grid-cols-3 place-items-center gap-4 w-full">
                    {(userData as any).data.appointmentStatus.map((data: any, index) => (
                        <div className={`border-2  h-[20vh] w-full rounded-lg flex ${!isDark && "bg-[#ffffff]"}`} key={data?._id}>

                            <div className='flex flex-col items-start justify-center h-[20vh] w-[50%] px-2 py-2 gap-4'>
                                <div>
                                    <p className='font-[500] text-lg'>Day: {data?.patient?.[0]?.day || 'unavailable'}</p>
                                </div>
                                <div>
                                    <p className='font-[500] text-lg'>Date: {data?.patient?.[0]?.date || 'unavailable'}</p>
                                </div>
                                <div>
                                    <p className='font-[500] text-lg'>Time: {convertTo12HourFormat(data?.patient?.[0]?.time.replace(/ GMT[+-]\d{4}/, "")) || "unavailable"}</p>
                                </div>
                                <div>
                                    <p className='font-[500] text-lg'>Patient: {data?.patient?.[0]?.patientnumber || "unavailable"}</p>
                                </div>

                            </div>

                            <div className='w-[50%] flex justify-center flex-col items-center'>
                                <div className='flex justify-center px-3 h-[15vh] items-center flex-col '>
                                    <Link to="/account">
                                        <div className="flex justify-center items-center rounded-full overflow-hidden w-32 h-32 ">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <img
                                                    src={data.profileImage}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='w-full px-2'>
                                    <div className='border-2 border-green-500 rounded-lg h-[4vh] flex justify-center items-center'>
                                        <p className='font-[500] text-lg'>Prescription</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div> : (<div className="w-full flex flex-col justify-center items-center ml-auto pr-4 h-[80vh]">
                <MdOutlineError size={60} color="#02a6d8" />

                <h2 className="text-xl font-semibold">No Appointments   </h2>
                <p className='text-lg'>Select a doctor to begin your treatment</p>
            </div>)}
        </div>
    );
};


export default AppointMent
