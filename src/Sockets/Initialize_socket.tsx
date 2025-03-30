import { socket } from "../Constants";
import { setRecords, setRecords2, SetText } from "../Redux/slices/Message.Redux";
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
  role: any
) => {
  if (socket?.connected) {
    if ((receiver as any)?.
      receiver && (sender as any)?.sender) {
      const socketid = socket.id;
      socket.emit("sending_message", receiver, sender, socketid, message);
      dispatch(SetText(message));
      dispatch(setRecords2({ text: message, role: "me", user_Role: role }));
    } else {
      console.error("id isnot there", receiver, sender)
    }
  }
};
export const subscribe_events = (
  socket: any,
  id: string | null,
  trigger_event: string
) => {

  if (socket?.connected && id && trigger_event) {
    socket.emit("subscribe_events", id, trigger_event);
  } else {
    console.error("something missing ", id, trigger_event)
  }
};
export const single_doctor_active = (id) => {
  socket.emit("single_doctor_active", id);
};
export const updateProgressBar = (id: string) => {
  console.log("object in socket fucntion")
  if (!id) {
    throw new Error('id not present')
  } else if (typeof id !== "string") {
    throw new Error('id is not a string')
  }
  socket.emit("updateProgressBar", id)
}
export const joinroom = (socket: any, roomname: string) => {
  if (!roomname) {
    return console.error("roomname not available");
  }
  socket.emit("join_room", roomname);
}
export const redis_call = () => {
}
export const response_to_mess = (socket: any, sender: string, recipent: string, role: string) => {
  if (!socket) {
    console.error("something worng woth the socket")
  }
  socket.emit("fetch_from_redis", sender, recipent, role)
}





