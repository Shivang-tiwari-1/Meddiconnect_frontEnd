import { data_fetch } from "../../../../backend/src/Repository/userRepository";
import { socket } from "../Constants";
import { setRecords, setRecords2, SetText } from "../Redux/slices/Message.Redux";
import { addMessage } from "../Redux/slices/socketRedux";

export const sendDataSocket = async (dispatch: any, socket: any, userData: any) => {
  return new Promise((resolve, reject) => {
    if (socket.connected) {
      socket.emit("connected", userData, socket?.id, (response) => {
        if (response?.status === 'ok') {
          resolve(true)
        } else {
          reject(response?.error || "Backend failed to connect");
        }
      });
    } else {
      reject("Socket not connected");
    }
  });
};
export const receivedmessage = async (socket: any, dispatch: any) => {
  if (socket) {
    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });
  }
};
export const liveNotification = async (socket: any, dispatch: any) => {
  if (socket?.connected) {
    socket.on("liveMessage", (message) => {
      console.log(message);
    });
  }
};
export const sendMessage = async (
  socket: any,
  dispatch: any,
  receiver: Object,
  sender: Object,
  message: string,
  role: any,
  audioBase64data: any
) => {

  return new Promise((resolve, reject) => {
    if (socket?.connected) {
      if ((receiver as any)?.
        receiver && (sender as any)?.sender) {
        const socketid = socket.id;

        socket.emit("sending_message", receiver, sender, socketid, message, (response) => {
          if (response?.status === 'ok') {
            resolve(true);
            dispatch(SetText(message));
            dispatch(setRecords2({ audioBase64data: audioBase64data, text: message, role: "me", user_Role: role }));
          } else {
            reject(response?.error || "Backend failed to connect");
          }
        });
      } else {
        reject("Socket not connected");
      }
    }
  })

};
export const subscribe_events = async (
  socket: any,
  data: any,
  trigger_event: string,

) => {
  return new Promise((resolve, reject) => {
    if (socket?.connected && data && trigger_event) {

      socket.emit("subscribe_events", data, trigger_event, (response) => {
        if (response?.status === 'ok') {
          resolve(true);
        } else {
          reject(response?.error || "Backend failed to connect");

        }
      })
    } else {
      reject("Socket not connected");
    }
  })


};
export const single_doctor_active = async (id) => {
  socket.emit("single_doctor_active", id);
};
export const updateProgressBar = async (data: object) => {
  console.log("hi")
  return new Promise((resolve, reject) => {
    if (!data) {
      reject('id not present')
    } else if (typeof data !== "object") {
      reject('data is not an object')
    } else {
      socket.emit("updateProgressBar", data, (response) => {
        if (response.ok === "ok") {
          resolve(true);
        } else {
          reject(response?.error || "Backend failed to connect");
        }
      })
    }
  })
};
export const joinroom = async (socket: any, roomname: object) => {

  return new Promise((resolve, reject) => {
    if (socket.connected) {
      socket.emit("join_room", roomname, (response) => {
        if (response?.status === 'ok') {
          resolve(true)
        } else {
          reject(response?.error || "Backend failed to connect");

        }
      });
    } else {
      reject("Socket not connected");
    }
  })
};
export const redis_call = async () => {
};
export const response_to_mess = async (socket: any, sender: string, recipent: string, role: string) => {
  if (!socket) {
    console.error("something worng woth the socket")
  }
  socket.emit("fetch_from_redis", sender, recipent, role)
};
export const reconnect_to_socket = async (socket: any, data) => {
  if (!data) {
    console.warn("data not available");
  } else {
    socket.emit("reconnect_to_socket", data);
  }
};
export const disconnected_payload = async (socket: any, data) => {
  socket.emit("manual-disconnect", data)
}
export const doctorInformation = async (socket: any, data: object) => {
  return new Promise((resolve, reject) => {
    if (socket.connected) {
      socket.emit("ratings", data, (response) => {
        if (response?.status === 'ok') {
          resolve(true)
        }
      });
    } else {
      reject("Socket not connected");
    }
  })

}





