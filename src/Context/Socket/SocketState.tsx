
import React, { createContext, useContext, useEffect } from "react";
import SocketContext from "./SocketContext";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { setRecords, SetText } from "../../Redux/slices/Message.Redux";
import { socket } from "../../Constants/";

import { useRef } from "react";
import { set_Live_Message, set_message } from "../../Redux/slices/socketRedux";
import { real_time_nav_update } from "../../Redux/slices/StateChange.slice";
import { activeDoctors, is_active, last_Active, set_isActive } from "../../Redux/slices/Doctor.Redux";
import { progressBar } from "../../Redux/slices/signup_login.";

const SocketState = ({ children }) => {
    const dispatch = useAppDispatch();
    const { currentStep } = useAppSelector((state) => state.states);
    const { patientData } = useAppSelector((state) => state.states);
    useEffect(() => {
        const handleListenToMessage = (data: any) => {
            console.log(data)
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
            console.log(data);
        };
        const progressBarUpdate = () => {
            console.log("here")
            if (currentStep < 4) {
                dispatch(progressBar(1));
            }
        };

        const patientInformation = (data) => {
            const parsedData = JSON.parse(data.Data);
            console.log(data.objective === "online_Status")
            if (data.objective === "online_Status") {
                dispatch(activeDoctors(parsedData));
            } else if (data.objective === "offline_status") {
                dispatch(last_Active(parsedData))
                console.log("offline", parsedData)
            } else if (data.objective === "redis_messages") {
                console.log(parsedData);
            }
        }
 
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
