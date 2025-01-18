import { setRecords, SetText } from "../Redux/slices/Message.Redux";
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

export const sendMessage = (
  socket: any,
  dispatch: any,
  receiver: Object,
  sender: Object,
  message: string,
  role: String
) => {
  if (socket?.connected) {
    const socketid = socket.id;
    socket.emit("sending_message", receiver, sender, socketid, message);
    dispatch(SetText(message));
    dispatch(setRecords({ text: message, role: "me", user_Role: role }))
  }
};


