import React, { createContext, useContext, useEffect } from "react";
import { socket } from "../../Constants";
import { useAppSelector } from "../../Redux/Store/Store";
import ChannelContext from "./ChannelContext.tsx";



const ChannelState = ({ children }) => {
    const { patientData, doctorData } = useAppSelector((state) => state.states)
    useEffect(() => {
        console.log("in channel state")
        socket.emit("publish_events");
    }, []);


    return (
        <ChannelContext.Provider value={socket}>
            {children}
        </ChannelContext.Provider>
    );
};

export default ChannelState;