import { configureStore } from "@reduxjs/toolkit";
import StateChangeSliceReducer from "../slices/StateChange.slice";
import signup_loginReducer from "../slices/signup_login.";
import PatientStateReducer from "../slices/Patient.Redux";
import DoctorStateReducer from "../slices/Doctor.Redux";
import NotificationReducer from "../slices/Notification.Redux";
import MessageSliceReducer from "../slices/Message.Redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import socketSliceReducer from "../slices/socketRedux";
import { socket } from "../../Constants";
import { socketMiddleware } from "../Middleware/SocketMiddleware";
import { PublishChannels } from "../Middleware/redisPublishe/publishChannels";
const Store = configureStore({
  reducer: {
    stateChange: StateChangeSliceReducer,
    states: signup_loginReducer,
    patient: PatientStateReducer,
    doctor: DoctorStateReducer,
    notification: NotificationReducer,
    socket: socketSliceReducer,
    MessageSlice: MessageSliceReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(socket)),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(PublishChannels(socket))
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default Store;
