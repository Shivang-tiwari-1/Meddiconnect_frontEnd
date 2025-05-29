import React from 'react'
import { useAppSelector } from '../../Redux/Store/Store';
import { Link } from 'react-router-dom';


interface IncomingData {
    key?: string;
    id: string;
    name: string;
    profileImage: any;
    multipleFunctions: (patient_chat_client_side, data) => void;
    idtomatch: string;
    client_side: any;
}
const LeftScrollbar = ({ id, multipleFunctions, idtomatch, client_side, name, profileImage }: IncomingData) => {

    const isDark = useAppSelector(state => state.stateChange.isDark);
    const isMobile = useAppSelector(state => state.stateChange.isMobile);

    return (
        <>

            {
                !isMobile ? (
                    <button
                        key={id}
                        className={`flex w-full space-y-2 h-[6vh] mobile:h-[10vh] mobile:w-[90%] p-2 border-[0.5px] items-center rounded-md ${idtomatch === id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                            }`}
                        onClick={() => multipleFunctions(client_side, id)}
                        disabled={idtomatch === id}
                    >

                        <div className="flex gap-2 w-full items-center">
                            <div className="px-2 flex items-center gap-2">
                                <div className="w-[60px] h-[50px]">
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                                </div>
                                <div className="text-sm font-light">{name}</div>
                            </div>
                        </div>
                    </button>
                ) : (
                    <button
                        key={id}
                        className={`flex w-full space-y-2 h-[6vh] mobile:h-[10vh] mobile:w-[90%] p-2 border-[0.5px] items-center rounded-md ${idtomatch === id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                            }`}
                        onClick={() => multipleFunctions(client_side, id)}
                        disabled={idtomatch === id}
                    >
                        <Link to={"/MobileChatRoom"}>  <div className="flex gap-2 w-full items-center">
                            <div className="px-2 flex items-center gap-2">
                                <div className="w-[60px] h-[50px]">
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                                </div>
                                <div className="text-sm font-light">{name}</div>
                            </div>
                        </div>
                        </Link>
                    </button>
                )
            }



        </>
    )
}

export default LeftScrollbar
