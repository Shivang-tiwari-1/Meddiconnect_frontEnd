import { addMessage } from "../Redux/slices/socketRedux";

export const sendDataSocket = (dispatch: any, socket: any, userData: any) => {
  if (socket) {
    if (socket.connected) {
      socket.emit("connected", userData, socket?.id);
    }
  }
};

export const receivedmessage = (socket: any, dispatch: any) => {
  if (socket) {
    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });
  }
};

export const liveNotification = (socket: any, dispatch: any) => {
  if (socket?.connected) {
    socket.on("liveMessage", (message) => {
      console.log(message);
    });
  }
};
