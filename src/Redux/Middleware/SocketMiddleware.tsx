import { setRecords, SetText } from "../slices/Message.Redux";
import { set_Live_Message } from "../slices/socketRedux";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {

    socket.on("liveMessage", (message) => {
        if (typeof message !== "string") {
            const message_toString = String(message);
            store.dispatch(set_Live_Message(message_toString));
        } else {
            store.dispatch(set_Live_Message(message));
        }
    });

    // socket.on('listen_to_message', (data: any) => {
    //     console.log("text form sender:", data.text)
    //     // store.dispatch(SetText(data.text))
    //     // store.dispatch(setRecords({ text: data.text, role: data.role, user_Role: data.user_Role }))
    // });

    // socket.emit('listen_to_message', (data: any) => {
    //     console.log("text form sender:", data.text)
    //     store.dispatch(SetText(data.text))
    //     store.dispatch(setRecords({ text: data.text, role: data.role, user_Role: data.user_Role }))
    // });

    return next(action);
}