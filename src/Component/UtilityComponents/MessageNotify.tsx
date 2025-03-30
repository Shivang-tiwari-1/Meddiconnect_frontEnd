import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/Store/Store';
import { set_Live_Message, set_message, set_messagenotification, set_notification } from '../../Redux/slices/socketRedux';
import { IoArrowBackCircle } from 'react-icons/io5';

const MessageNotify = () => {
    const { display_message, messagenotification } = useAppSelector((state) => state.socket);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const time_out = setTimeout(() => {
            dispatch(set_message(""));
            dispatch(set_messagenotification(false));
        }, 4000);
    }, [display_message, dispatch])
    return (
        <>
            {messagenotification && (
                <div
                    style={{
                        position: "fixed",
                        top: "150px",
                        left: "20px",
                        padding: "10px",
                        color: "white",
                        opacity: 0.8,
                        borderRadius: "15px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        backgroundColor: "white",
                    }}
                    className={`border-2 flex justify-center items-center outline-none w-[40%] w-max-auto laptop:w-[15%] h-[10vh] rounded-xl`}
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <p className={` text-black text-md font-bold`}>{display_message}</p>
                    </div>
                    <div className="h-full flex justify-center items-center text-stone-950" >
                        <button onClick={() => dispatch(set_notification(false))}>
                            <IoArrowBackCircle size={30} />
                        </button>
                    </div>
                </div>


            )}
        </>
    )
}

export default MessageNotify
