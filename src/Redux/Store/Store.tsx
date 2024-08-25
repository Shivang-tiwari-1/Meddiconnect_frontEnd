import { configureStore } from "@reduxjs/toolkit";
import StateChangeSliceReducer from "../slices/StateChange.slice";
import signup_loginReducer from "../slices/signup_login.";
import PatientStateReducer from '../slices/Patient.Redux';
import DoctorStateReducer from '../slices/Doctor.Redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const Store = configureStore({
    reducer: {
        stateChange: StateChangeSliceReducer,
        states: signup_loginReducer,
        patient: PatientStateReducer,
        doctor: DoctorStateReducer

    }
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default Store;
