import { socket } from "../Constants";
import { setRecords, SetText } from "../Redux/slices/Message.Redux";
import { set_Live_Message } from "../Redux/slices/socketRedux";

const listners = (listner: any, dispatch: any) => {
  if (socket.connected) {
    if (listner === "liveMessage") {
      socket.on("liveMessage", (message) => {
        if (typeof message !== "string") {
          const message_toString = String(message);
          dispatch(set_Live_Message(message_toString));
        } else {
          dispatch(set_Live_Message(message));
        }
      });
    }

    if (listner === "listen_to_message") {
      socket.emit('listen_to_message', (data: any) => {
        console.log("from---->",data)
        dispatch(SetText(data.text))
        dispatch(setRecords({ text: data.text, role: data.role, user_Role: data.user_Role }))
      })
    }
  }
};


export default listners;
