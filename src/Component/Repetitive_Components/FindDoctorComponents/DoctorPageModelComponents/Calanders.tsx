import React, { useState } from 'react';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Store/Store';
import { clean_array, setClientsidenavigation } from '../../../../Redux/slices/Message.Redux';
import { is_active, last_Active } from '../../../../Redux/slices/Doctor.Redux';
import { setOpenDoctorById, setOpenDoctorId } from '../../../../Redux/slices/Patient.Redux';
import { captureString } from '../../../../Redux/slices/StateChange.slice';
import { response_to_mess } from '../../../../Sockets/Initialize_socket';
import { socket } from '../../../../Constants';
import { Link } from 'react-router-dom';
import { IoChatbubble } from 'react-icons/io5';

interface incomingdata {
    availability?: [];
    stateChange?: (value: any) => void;
    id?: string;
    profileImage?: any;
    name?: any;
    role?: any
}

const Calanders = (props) => {
    const {
        availability,
        id,
        profileImage,
        stateChange,
        name,
        role
    } = props
    const dispatch = useAppDispatch();

    const [click, SetClick] = useState(false);
    const isDark = useAppSelector((state) => state.stateChange.isDark);
    const userData = useAppSelector((state) => state.states.userData);
    const chatting_doctors = useAppSelector((state) => state.MessageSlice.chatting_doctors);
    const doctor_chat_client_side = useAppSelector((state) => state.MessageSlice.doctor_chat_client_side);
    const doctors = useAppSelector((state) => state.patient.doctors);




    const handleClick = () => {
        dispatch(clean_array("patient"));
        dispatch(is_active(id));
        dispatch(last_Active(id));
        dispatch(setOpenDoctorById(id));
        dispatch(setOpenDoctorId(null));
        dispatch(setClientsidenavigation({ userdata: { id, profileImage, name, role }, role: "patient" }));
        dispatch(captureString({ dataArray: chatting_doctors === null ? doctor_chat_client_side.length !== 0 ? doctor_chat_client_side : doctors : chatting_doctors, id: id }));
        response_to_mess(socket, (userData as any)?.data?._id, String(id), (userData as any)?.data?.role);
    };

    return (
        <div className="flex justify-center items-center h-0 gap-2 ">
            {!click ? (
                <>
                    <button
                        onClick={() => SetClick(true)}
                        className="relative transition-transform transform hover:scale-110"
                    >
                        <BsCalendar2DateFill size={30} />
                    </button>
                </>
            ) : (
                <div className="transition-all duration-500 ease-in-out flex justify-center items-center z-50">
                    <div
                        className={`absolute border-2 w-[30%] h-[23vh] rounded-3xl opacity-90 p-4 flex flex-col items-center justify-between ${isDark ? "bg-bgColorDarkBlack" : "bg-white "
                            }`}
                    >
                        {/* Availability Buttons */}
                        <div className="w-full">
                            {availability?.map((item, idx) => (
                                <button
                                    key={idx}
                                    value={item.day}
                                    className={`flex justify-center items-center w-full h-[2.7vh] my-[1.5px] transition-transform duration-300 ease-in-out transform hover:scale-105  rounded-2xl   font-semibold shadow-md hover:shadow-lg ${isDark
                                        ? "bg-bgColorDarkBlack"
                                        : "bg-white  hover:border-t-2 hover:border-b-2"
                                        }`}
                                    onClick={(e) => {
                                        const target = e.target as HTMLButtonElement;
                                        stateChange(target.value);
                                    }}
                                >
                                    {item.day}
                                </button>
                            ))}
                        </div>

                        {/* Centered Back Button */}
                        <button
                            className={`flex justify-center items-center mt-2 p-2 rounded-lg  font-semibold transition-colors duration-300 hover:scale-105 ease-in-out ${isDark ? "bg-bgColorDarkBlack" : "bg-white"
                                }`}
                            onClick={() => SetClick(false)}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
            {
                <div
                    className="flex justify-center items-center cursor-pointer"
                    onClick={handleClick}
                >
                    <Link to={`/FinalChatroom`}>
                        <IoChatbubble size={33} />
                    </Link>
                </div>
            }
        </div>
    )
}

export default Calanders
