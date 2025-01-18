import { createSlice } from "@reduxjs/toolkit";
import { useLoaderData } from "react-router-dom";
interface Record {
  role: string;
  text: string;
}
interface messages {
  message: string;
  text: string;
  doctor_Text_records: Record[];
  patient_Text_records: Record[];
}
const initialState: messages = {
  message: "",
  text: "",
  doctor_Text_records: [{
    role: '',
    text: ''
  }],
  patient_Text_records: [{
    role: "",
    text: ""
  }]
};

const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    Setmessage: (state, action) => {
      state.message = action.payload;
    },
    SetText: (state, action) => {
      state.text = action.payload;
    },
    setRecords: (state, action) => {
      const { text, role, user_Role } = action.payload;

      if (user_Role === "doctor") {
        if (state.doctor_Text_records.length > 0) {
          const updaterecords = state.doctor_Text_records.map((prev) => {
            return {
              ...prev,
              role: role,
              text: text
            }
          })
          state.doctor_Text_records = updaterecords
        } else {
          state.doctor_Text_records.push({
            role: role,
            text: text
          })
        }
      } else {
        if (state.patient_Text_records.length > 0) {
          const updaterecords = state.patient_Text_records.map((prev) => {
            return {
              ...prev,
              role: role,
              text: text
            }
          })
          state.patient_Text_records = updaterecords
        } else {
          state.patient_Text_records.push({
            role: role,
            text: text
          })
        }
      }
      console.log("doctor->", JSON.parse(JSON.stringify(state.doctor_Text_records)))
      console.log("patient->", JSON.parse(JSON.stringify(state.patient_Text_records)))

    }
  },
});

export const { Setmessage, SetText, setRecords } = MessageSlice.actions;

export default MessageSlice.reducer;
