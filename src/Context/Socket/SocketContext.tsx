import React, { createContext } from "react";
import { socket } from "../../Constants";
import { Socket } from "socket.io-client";

const defaultSocket = null as unknown as Socket
const SocketContext = createContext<Socket>(defaultSocket);

export default SocketContext;