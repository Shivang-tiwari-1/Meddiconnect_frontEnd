import { useAppSelector } from '../../Redux/Store/Store';
import { processdata_label } from '../../Services/service';


const ChatArea = () => {
    const doctorData = useAppSelector((state) => state.states.doctorData);
    const doctor_Text_records = useAppSelector((state) => state.MessageSlice.doctor_Text_records);
    const patient_Text_records = useAppSelector((state) => state.MessageSlice.patient_Text_records);


    return (
        <>
            {!doctorData?.accessToken ? (
                <div className="flex flex-col w-[90%] h-[60vh] overflow-y-scroll custom-scrollbar space-y-2">
                    {Object.entries(processdata_label(patient_Text_records)).map(([label, messages], groupIndex) => (
                        <div key={groupIndex}>
                            <div className="text-center text-gray-400 text-lg my-2">{label}</div>

                            {(messages as any).map((msg: any, index: any) => (
                                <div
                                    key={index}
                                    className={`${msg.role === "me" ? "ml-auto w-[30%]" : "self-start bg-slate-800"
                                        } text-white px-4 py-2 rounded-lg max-w-[70%]`}
                                >
                                    {!msg.audioBlob ? (
                                        <div className="w-full flex justify-end items-center ">
                                            <p className=" min-w-[20%] max-w-auto bg-blue-500 flex justify-center h-[4vh] items-center rounded-lg px-3">
                                                {msg.text}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="h-[6vh] border-2 rounded-2xl bg-slate-100">
                                            <audio src={msg.audioBlob?.url} controls />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            ) : (
                <div className={`flex flex-col space-y-2 w-[90%] h-[60vh] overflow-y-scroll custom-scrollbar `}>
                    {doctor_Text_records.map((msg, index) => (
                        <div
                            key={index}
                            className={`${msg.role === "sender" ? " self-start bg-gray-300" : "self-end bg-blue-500 "
                                } text-white px-4 py-2 rounded-lg max-w-[70%]`}
                        >
                            {msg.text}

                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ChatArea
