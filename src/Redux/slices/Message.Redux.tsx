import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleAlertCheck, toggleStatusCheck } from "./signup_login.";
import { axiosPrivate } from "../../Api/Axios.Api";
import moment from "moment";

interface Record {
  role: string;
  text?: string;
  time?: string;
  read?: boolean;
  date?: string;
  day?: string;
  timeStamp?: Number;
  audioBlob?: Blob | null
};

interface messages {
  data: any | null;
  text: string;
  doctor_Text_records: Record[];
  patient_Text_records: Record[];
  loading: boolean;
  chatting_doctors: object[];
  chatting_patients: object[];
  doctor_chat: object[];
  patient_chat: object[];
  doctor_chat_client_side: object[]
  patient_chat_client_side: object[]
  showMessageIcon?: boolean;
};

const initialState: messages = {
  data: null,
  text: "",
  doctor_Text_records: [],
  patient_Text_records: [],
  loading: false,
  chatting_doctors: [],
  chatting_patients: [],
  doctor_chat: [],
  patient_chat: [],
  doctor_chat_client_side: [],
  patient_chat_client_side: [],
  showMessageIcon: false
};

export const fetch_chatting_pat = createAsyncThunk(
  "message/fetch_chatting_pat",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/api/message/chatting_patinets_to_doc", {
        params: {
          redisKey: "fetch_chatting_pat",
        }
      });
      if (response) {

        return response?.data;
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const fetch_chatting_doc = createAsyncThunk(
  "message/fetch_chatting_doc",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await axiosPrivate.get("/api/message/chatting_doctor_to_pat", {
        params: {
          redisKey: "fetch_chatting_doc",
        }
      });
      if (response) {
        console.log(response)
        return response?.data;
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const doctor_chat = createAsyncThunk(
  "doctor/doctor_chat",
  async (patid, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`api/message/doctor_chat/${patid}`, {
        params: {
          redisKey: "doctor_chat",
        }
      });
      if (response) {
        return response?.data;

      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const patient_chat = createAsyncThunk<any, string>(
  "doctor/patient_chat",
  async (docid, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`api/message/patient_chat/${docid}`, {
        params: {
          redisKey: "patient_chat",
        }
      });
      if (response) {
        console.log(response?.data)

        return response?.data;
      }

    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const bulk_write = createAsyncThunk<
  any,
  Record[],
  {
    rejectValue: any;
  }
>(
  "doctor/bulk_write",
  async (data, { dispatch, rejectWithValue }) => {
    try {

      const response = await axiosPrivate.post(`api/message/database_write`, data);
      if (response) {
        return response?.data
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      }
      return rejectWithValue(error?.response?.data);
    }

  }
);


const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    Setmessage: (state, action) => {
      const { type, data, mimeType, url } = action.payload;
      if (!type && !data && !mimeType && !url) {
        state.data = action.payload;

      } else {
        const voice_data = {
          type: type,
          data: data,
          mimeType: mimeType,
          url: url
        }
        state.data = voice_data;
      }
      console.log(state.data)
    },
    unSetmessage: (state, action) => {
      state.data = null;
    },
    SetText: (state, action) => {
      state.text = action.payload;
    },
    setRecords: (state, action) => {
      const { text, role, user_Role, audioBase64data } = action.payload;

      if (user_Role === "doctor") {
        if (state.doctor_Text_records.length > 0) {
          if (!audioBase64data) {
            state.doctor_Text_records = [
              ...state.doctor_Text_records,
              { role: role, text: text }
            ];
          } else {
            state.doctor_Text_records = [
              ...state.doctor_Text_records,
              { role: role, audioBlob: audioBase64data }
            ];
          }

        } else {
          !audioBase64data ? state.doctor_Text_records = [{ role: role, text: text }] :
            state.doctor_Text_records = [{ role: role, audioBlob: audioBase64data }]
        }

      } else {
        if (state.patient_Text_records.length > 0) {
          !audioBase64data ?
            state.patient_Text_records = [
              ...state.patient_Text_records,
              { role: role, text: text }
            ] : state.patient_Text_records = [
              ...state.patient_Text_records,
              { role: role, audioBlob: audioBase64data }
            ]
        } else {
          !audioBase64data ? state.patient_Text_records = [{ role: role, text: text }] :
            state.patient_Text_records = [{ role: role, audioBlob: audioBase64data }]
        }
      }


    },
    setRecords2: (state, action) => {
      const { text, role, user_Role, audioBase64data } = action.payload;

      if (role === "me") {
        if (user_Role === "doctor") {
          if (state.doctor_Text_records.length > 0) {
            if (audioBase64data === null) {
              state.doctor_Text_records = [
                ...state.doctor_Text_records,
                { role: role, text: text, date: moment(new Date()).format("MM-DD-YYYY"), day: moment(new Date()).format("DDDD"), timeStamp: Number(new Date()) }
              ];
            } else if (text === null) {
              state.doctor_Text_records = [
                ...state.doctor_Text_records,
                { role: role, audioBlob: audioBase64data, date: moment(new Date()).format("MM-DD-YYYY"), day: moment(new Date()).format("DDDD"), timeStamp: Number(new Date()) }
              ];
            }
          } else {
            audioBase64data === null ? state.doctor_Text_records = [{ role: role, text: text }] :
              state.doctor_Text_records = [{ role: role, audioBlob: audioBase64data, date: moment(new Date()).format("MM-DD-YYYY"), day: moment(new Date()).format("DDDD"), timeStamp: Number(new Date()) }]
          }
        } else if (user_Role === 'patient') {
          if (state.patient_Text_records.length > 0) {
            console.log(audioBase64data)
            audioBase64data === null ?
              state.patient_Text_records = [
                ...state.patient_Text_records,
                { role: role, text: text, date: moment(new Date()).format("MM-DD-YYYY"), day: moment(new Date()).format("DDDD"), timeStamp: Number(new Date()) }
              ] : state.patient_Text_records = [
                ...state.patient_Text_records,
                { role: role, audioBlob: audioBase64data, date: moment(new Date()).format("MM-DD-YYYY"), day: moment(new Date()).format("DDDD"), timeStamp: Number(new Date()) }
              ]
          } else {
            audioBase64data === null ? state.patient_Text_records = [{ role: role, text: text }] :
              state.patient_Text_records = [{ role: role, audioBlob: audioBase64data, date: moment(new Date()).format("MM-DD-YYYY"), day: moment(new Date()).format("DDDD"), timeStamp: Number(new Date()) }]
          }
        }
      }

      console.log(JSON.parse(JSON.stringify(state.doctor_Text_records)))
      console.log(JSON.parse(JSON.stringify(state.patient_Text_records)))
    },
    setRecords3: (state, action) => {
      const { data, role } = action.payload;
      if (role === 'patient') {

        if (state.patient_Text_records?.length === 0) {
          const unprocessedData = data?.map((data: object) => (
            {
              role: (data as any)?.message?.role,
              text: (data as any)?.message.text,
              audioBlob: (data as any)?.audioBlob,
              day: (data as any)?.day,
              date: (data as any)?.date,
              read: (data as any)?.read,
              time: (data as any).time,
              timeStamp: (data as any).timeStamp
            }
          ))
          state.patient_Text_records = unprocessedData;

          console.log()
        } else {
          state.patient_Text_records = [
            ...state.patient_Text_records,
            ...data.map((data: object) => (
              {
                role: (data as any)?.message?.role,
                text: (data as any)?.message.text,
                audioBlob: (data as any)?.audioBlob,
                day: (data as any)?.day,
                date: (data as any)?.date,
                read: (data as any)?.read,
                time: (data as any).time,
                timeStamp: (data as any).timeStamp
              }
            ))
          ]
        }
      } else if (role === "doctor") {

        if (state.doctor_Text_records?.length === 0) {

          state.doctor_Text_records = data?.map((data: object) => (
            {
              role: (data as any)?.message?.role,
              text: (data as any)?.message.text,
              audioBlob: (data as any)?.audioBlob,
              day: (data as any)?.day,
              date: (data as any)?.date,
              read: (data as any)?.read,
              time: (data as any).time,
              timeStamp: (data as any).timeStamp
            }
          ))
        } else {
          state.doctor_Text_records = [
            ...state.doctor_Text_records,
            ...data.map((data: object) => (
              {
                role: (data as any)?.message?.role,
                text: (data as any)?.message.text || null,
                audioBlob: (data as any)?.audioBlob || null,
                day: (data as any)?.day,
                date: (data as any)?.date,
                read: (data as any)?.read,
                time: (data as any).time,
                timeStamp: (data as any).timeStamp
              }
            ))
          ]
        }
      }

    },
    clean_array: (state, action) => {
      if (action.payload === "patient") {
        state.patient_Text_records = []
      } else if (action.payload === "doctor") {
        state.doctor_Text_records = []
      } else {
        console.error("suspicious payload")
      }
    }
    ,
    setClientsidenavigation: (state, action) => {
      let { userdata, role } = action.payload;
      console.log(userdata, role)
      if (role === "doctor") {
        if (state.doctor_chat_client_side.some(user => (user as any)?.id === userdata.id && (user as any)?.profileImage === userdata.profileImage)) {
          state.chatting_patients.length > 0 ?
            state.doctor_chat_client_side = [
              ...state.chatting_patients, userdata
            ] : state.doctor_chat_client_side = [
              ...state.doctor_chat_client_side, userdata
            ]
        }

      } else {
        if (!state?.patient_chat_client_side?.some(user => (user as any)?.id === (userdata as any).id && (user as any)?.profileImage === userdata.profileImage)) {
          console.log(state.chatting_doctors)
          state.chatting_doctors !== null ?
            state.patient_chat_client_side = [
              ...state.chatting_doctors, userdata
            ] :
            state.patient_chat_client_side.length > 0 ?
              state.patient_chat_client_side = [
                ...(
                  state.chatting_doctors === null ?
                    [] :
                    state.chatting_doctors
                ),
                ...(
                  state.patient_chat_client_side.length > 0
                    ? state.patient_chat_client_side :
                    []
                ),
                userdata
              ] :
              state.patient_chat_client_side = [userdata]

        }

      }
    }
  },
  extraReducers: (builders) => {
    builders
      //fetch_chatting_pat
      .addCase(fetch_chatting_pat?.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch_chatting_pat?.fulfilled, (state, action) => {
        state.loading = false;
        let pushData = true;
        const data = action.payload.data;
        if (data.length > 0) {
          state.showMessageIcon = true;
        }
        for (let i = 0; i <= data.length - 1; i++) {
          if (state.chatting_patients.length === 0) {
            state.chatting_patients.push(data[i]);
          }
          for (let j = 0; j <= data?.length - 1; j++) {
            if ((data[i] as any)?._id === (state.chatting_patients[j] as any)?._id) {
              pushData = false
            } else {
              if (pushData) {
                state.chatting_patients.push(data[i]);
              }
            }
          }
        }
      })
      .addCase(fetch_chatting_pat?.rejected, (state) => {
        state.loading = false;
      })
      //fetch_chatting_doc
      .addCase(fetch_chatting_doc?.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch_chatting_doc?.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.chatting_doctors = action?.payload?.data;
      })
      .addCase(fetch_chatting_doc?.rejected, (state) => {
        state.loading = false;
      })
      //doctor_chat
      .addCase(doctor_chat?.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctor_chat?.fulfilled, (state, action) => {
        state.loading = false;
        const data = action?.payload?.data;
        if (state.doctor_Text_records?.length === 0) {

          state.doctor_Text_records = data?.map((data: object) => (
            {
              role: (data as any)?.role,
              text: (data as any)?.message
            }
          ))
        } else {
          state.doctor_Text_records = [
            ...state.doctor_Text_records,
            ...data.map((data: object) => (
              {
                role: (data as any)?.role,
                text: (data as any)?.message
              }
            ))
          ]
        }
      })
      .addCase(doctor_chat?.rejected, (state) => {
        state.loading = false;
      })
      //patient_chat
      .addCase(patient_chat?.pending, (state,) => {
        state.loading = true;
      })
      .addCase(patient_chat?.fulfilled, (state, action) => {
        state.loading = false;
        state.patient_chat = action?.payload?.data;
        const data = state.patient_chat;

        if (state.patient_Text_records?.length === 0) {
          state.patient_Text_records = data.map((data) => (
            {
              role: (data as any).role,
              text: (data as any).message
            }
          ))
        } else {
          state.patient_Text_records = [
            ...state.patient_Text_records,
            ...data.map((data) => (
              {
                role: (data as any).role,
                text: (data as any).message
              }
            ))
          ]
        }

        console.log(JSON.parse(JSON.stringify(state.patient_Text_records)))

      })
      .addCase(patient_chat?.rejected, (state) => {
        state.loading = false;
      })
  }
});

export const { unSetmessage, Setmessage, SetText, setRecords, setRecords2, setRecords3, setClientsidenavigation, clean_array } = MessageSlice.actions;

export default MessageSlice.reducer;
