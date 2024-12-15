import { socket } from "../Constants";
import { set_Live_Message } from "../Redux/slices/socketRedux";

const listners = (listner: any, dispatch: any) => {
  if (socket.connected) {
    if (listner === "liveMessage") {
      socket.on("liveMessage", (message) => {
        if (typeof message !== "string") {
          const message_toString = String(message);
          dispatch(set_Live_Message(message_toString));
        } else {
          console.log("object");
          dispatch(set_Live_Message(message));
        }
      });
    }
  }
};

export default listners;
