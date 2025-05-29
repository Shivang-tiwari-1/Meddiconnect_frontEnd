
import React, { useEffect } from "react";
import SocketContext from "./SocketContext";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { setRecords, setRecords3, SetText } from "../../Redux/slices/Message.Redux";
import { socket } from "../../Constants/";
import { set_Live_Message, set_message } from "../../Redux/slices/socketRedux";
import { real_time_nav_update } from "../../Redux/slices/StateChange.slice";
import { activeDoctors, last_Active } from "../../Redux/slices/Doctor.Redux";
import { progressBar } from "../../Redux/slices/signup_login.";
import moment from "moment";

const SocketState = ({ children }) => {
    const dispatch = useAppDispatch();
    const { currentStep } = useAppSelector((state) => state.states);
    useEffect(() => {
        const handleListenToMessage = (data: any) => {
            dispatch(SetText(data.text));
            dispatch(setRecords({ text: data.text, role: data.role, user_Role: data.user_Role }));
            dispatch(set_message(data.text))
        };
        const handleNotifyMessage = (message: any) => {
            if (typeof message !== "string") {
                const message_toString = String(message);
                dispatch(set_Live_Message(message_toString));
            } else {
                dispatch(set_Live_Message(message));
            }
        };
        const nav_ui_update = () => {
            dispatch(real_time_nav_update())
        };
        const is_active_update = (data) => {
        };
        const single_doctor_active = (data) => {
        };
        const progressBarUpdate = () => {
            if (currentStep < 4) {
                dispatch(progressBar(1));
            }
        };
        const patientInformation = (data) => {
            const parsedData = JSON.parse(data.Data);
            if (data.objective === "online_Status") {
                console.log("parsed", parsedData)
                dispatch(activeDoctors(parsedData));
            } else if (data.objective === "offline_status") {
                dispatch(last_Active(parsedData))
            } else if (data.objective === "redis_messages") {

                const parseMessage = parsedData.map((data) => {
                    console.log(data.timestamp)
                    return {
                        message: JSON.parse(data.message),
                        timeStamp: data?.timestamp,
                        day: moment(data.timestamp).format("dddd").toString().toLowerCase(),
                        date: moment(data.timestamp).format("MM-DD-YYYY").toString(),
                        time: moment(data.timestamp).format("hh:mm:ss").toString()
                    }
                })
                dispatch(setRecords3({ data: parseMessage, role: data.role }))

            }
        };

        socket.on("nav_chat_icon_update", nav_ui_update);
        socket.on("listen_to_message", handleListenToMessage);
        socket.on("liveMessage", handleNotifyMessage);
        socket.on("is_active_update", is_active_update);
        socket.on("single_doc_active", single_doctor_active)
        socket.on("progressBarUpdate", progressBarUpdate);
        socket.on("patient_Information", patientInformation);
        return () => {

            socket.off("listen_to_message", handleListenToMessage);

        };
    }, [socket]);




    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketState;
