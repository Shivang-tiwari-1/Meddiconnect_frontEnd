import { createContext } from "react";
import { Socket } from "socket.io-client";

const defaultChannel =  null as unknown as Socket;
const ChannelContext = createContext<Socket>(defaultChannel);

export default ChannelContext;