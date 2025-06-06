import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosPrivate, axiosPrivatefile } from "../../Api/Axios.Api";
import {
  toggleAlertCheck,
  toggleStatusCheck,
} from "./signup_login.";
import { RootState } from "../Store/Store";
import { toogleShow2, toogleShow3 } from "./Patient.Redux";
import moment from "moment";
import { convertTo12HourFormat } from "../../Services/service";

//-----------------------------------interfaces----------------------------------------//
export interface medicationObjects {
  medication?: String | any;
  frequency?: string | any;
  duration?: string | any;
  remark?: string | any;
};
export interface CollectedDay {
  HowManyPatients: number | null;
  day: string | null;
  start: string | null;
  end: string | null;
  showInput?: boolean;
  showTimeStart?: boolean;
  showTimeEnd?: boolean;
  index?: number;
};
export interface doctorPayload {
  HowManyPatients?: number | null;
  day?: string | null;
  start?: string | null;
  end?: string | null;
};
interface data {
  data?: doctorPayload[];
};
export interface prescription {
  prescription?: ArrayBuffer;
  id?: string;
};
export interface docDocument {
  MedicalRegistrationCertificate?: File;
  MBBSDegree?: File;
  StateMedicalCouncilRegistration?: File;
};
interface stateManagement {
  doctordata?: Record<string, unknown>;
  loading: boolean;
  medications: medicationObjects[];
  patientData?: Record<string, unknown>[];
  currentStep: number;
  totalSteps: number;
  expertise: string[];
  select?: string[];
  collectDay?:
  CollectedDay[],
  drop?: boolean;
  proggresWidth: number | null;
  scroll: number;
  container: Record<string, unknown>;
  scrollLeft: any;
  childWidth: any;
  seralizedData: string;
  index: number;
  scrollx: number;
  viewportHeight: any;
  elementPosition: number | null;
  IsInFocus: any;
  specializationExists: boolean;
  qualificationExists: boolean;
  availabilityExists: boolean;
  is_Active?: boolean
  active_doctors?: object[];
  current_day_schedul?: object[];
  last_active?: string | null;
  rating?: object[];
  yourRatings?: Number;
  averageRatings?: Number;
};
interface Doctor {
  userId: string;
  lastActive: string;
  online: boolean;
};
//-----------------------------------interfaces----------------------------------------//

//-----------------------------------API-----------------------------------------------//
export const getDoctorData = createAsyncThunk(
  "doctor/getDoctorData",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { doc_accessToken, pat_accessToken, role } = (
        getState() as RootState
      ).states;
      const access_Token =
        role === "patient" ? pat_accessToken : doc_accessToken;

      const response = await axiosPrivate.get(
        `api/doctor/getDoctordata`,

        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );
      console.log(response);
      return response?.data;
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
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getDetailOfthePatient = createAsyncThunk(
  "doctor/getDetailOfthePatient",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`api/doctor/getAllUser`);
      return response?.data;
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
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const setCriteria = createAsyncThunk(
  "doctor/setCriteria",
  async (data: doctorPayload[], { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(`api/doctor/setcriteria`, {
        data,
      });
      if (response) {
        dispatch(toggleAlertCheck("Criteria has been set"));
        dispatch(toggleStatusCheck(200));
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
export const manualUpdate = createAsyncThunk(
  "doctor/updatemanually",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("api/doctor/updatemanually");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const sendprescription = createAsyncThunk(
  "doctor/sendprescription",
  async ({ prescription, id }: prescription, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `api/doctor/prescription/${id}`,
        {
          prescription: prescription,
        }
      );
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
export const spealisesIn = createAsyncThunk(
  "doctor/spealisesIn",
  async (data, { dispatch, getState, rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axiosPrivate.post("api/doctor/spealisesIn", {
        specialization: data,
      });


      console.log(response)
      if (response) {
        let { show4 } = (getState() as RootState).patient;
        if (show4) {
          dispatch(toogleShow3());
        }

        dispatch(toggleAlertCheck("submitted"));
        dispatch(toggleStatusCheck(200));
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
export const setDocDocuments = createAsyncThunk(
  "doctor/collectdocuments",
  async (
    {
      MedicalRegistrationCertificate,
      MBBSDegree,
      StateMedicalCouncilRegistration,
    }: docDocument,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const resposne = await axiosPrivatefile.post(
        "api/doctor/collectdocuments",
        {
          MedicalRegistrationCertificate,
          MBBSDegree,
          StateMedicalCouncilRegistration,
        }
      );
      const { show2 } = (getState() as RootState).patient;
      if (resposne) {
        if (show2) {
          dispatch(toogleShow2());
        }

        dispatch(toggleAlertCheck("documents submitted"));
        dispatch(toggleStatusCheck(200));
        return resposne?.data;
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
//-----------------------------------API-----------------------------------------------//

const initialState: stateManagement = {
  doctordata: {},
  loading: false,
  medications: [{ medication: "", frequency: "", duration: "", remark: "" }],
  patientData: [],
  expertise: [
    "Allergy",
    " Immunology",
    "Anesthesiology",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "Geriatrics",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Medical Genetics",
    "Nephrology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology (ENT)",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Sports Medicine",
    "Surgery",
    "Urology",
    "Vascular Medicine",
  ],
  select: [],
  collectDay: [
    {
      HowManyPatients: null,
      day: null,
      start: null,
      end: null,
      showInput: false,
      showTimeStart: false,
      showTimeEnd: false,
    },
    {
      HowManyPatients: null,
      day: null,
      start: null,
      end: null,
      showInput: false,
      showTimeStart: false,
      showTimeEnd: false,
    },
    {
      HowManyPatients: null,
      day: null,
      start: null,
      end: null,
      showInput: false,
      showTimeStart: false,
      showTimeEnd: false,
    },
    {
      HowManyPatients: null,
      day: null,
      start: null,
      end: null,
      showInput: false,
      showTimeStart: false,
      showTimeEnd: false,
    },
    {
      HowManyPatients: null,
      day: null,
      start: null,
      end: null,
      showInput: false,
      showTimeStart: false,
      showTimeEnd: false,
    },
    {
      HowManyPatients: null,
      day: null,
      start: null,
      end: null,
      showInput: false,
      showTimeStart: false,
      showTimeEnd: false,
    },
    {
      HowManyPatients: null,
      day: null,
      start: null,
      end: null,
      showInput: false,
      showTimeStart: false,
      showTimeEnd: false,
    },
  ],
  drop: false,
  proggresWidth: null,
  currentStep: 1,
  totalSteps: 4,
  scroll: 0,
  container: {},
  scrollLeft: "",
  childWidth: "",
  seralizedData: "",
  index: 0,
  scrollx: 0,
  viewportHeight: "",
  elementPosition: null,
  IsInFocus: null,
  specializationExists: false,
  qualificationExists: false,
  availabilityExists: false,
  active_doctors: [],
  current_day_schedul: [{}],
  last_active: null,
  yourRatings: 0,
  rating: []
};

const DoctorState = createSlice({
  name: "DoctorState",
  initialState,
  reducers: {
    setDrop: (state) => {
      state.drop = true;
    },
    setMedication: (state: any, action) => {
      const { index, field, value } = action.payload;
      const updatedMedications = state?.medications.map((med, i) => {
        return i === index ? { ...med, [field]: value } : med;
      });
      state.medications = updatedMedications;
    },
    deleteReducer: (state: any) => {
      state.medications.pop();
    },
    addMedication: (state: any) => {
      state.medications.push({
        medication: "",
        frequency: "",
        duration: "",
        remark: "",
      });
    },
    setCredentials: (state: any) => {
      state?.currentStep + 1;
    },
    setExperTires: (state, action) => {
      state.expertise = action.payload;
    },
    captureString: (state, action) => {
      const { item } = action.payload;
      const pushIndex: number[] = [];
      const newExpertise = [...state.expertise];
      if (!state.select) {
        return;
      } else {
        if (state.expertise.includes(item) && !state.select.includes(item)) {
          state.select = [...state.select, item];
        }

        for (let i = 0; i < state.expertise.length; i++) {
          if (state.select.length > 0) {
            for (let j = 0; j < state.select.length; j++) {
              if (state.select[j] === state.expertise[i]) {
                pushIndex.push(i);
              }
            }
          }
        }
        for (let k = 0; k < pushIndex.length; k++) {
          const tempIndex = pushIndex[k];
          const temp = newExpertise[tempIndex];
          newExpertise[tempIndex] = newExpertise[k];
          newExpertise[k] = temp;
        }

        state.expertise = newExpertise;
      }
    },
    deSelect: (state, action) => {
      if (state?.select?.includes(action?.payload)) {
        const updatedSelect = state?.select.filter(
          (i) => i !== action?.payload
        );
        state.select = updatedSelect;
      }
    },
    setCollectedDay: (state, action) => {
      const { HowManyPatients, day, start, end, index } = action.payload;
      const checkIndex = state?.collectDay?.[index] !== undefined;
      if (!state.collectDay) {
        return;
      } else {
        if (checkIndex && index >= 0) {
          const updatedCollectDay = state.collectDay.map((entry, i) => {
            if (i === index) {
              return {
                ...entry,
                HowManyPatients:
                  HowManyPatients !== undefined
                    ? HowManyPatients
                    : entry.HowManyPatients,
                day: day !== undefined ? day : entry.day,
                start: start || entry.start,
                end: end || entry.end,
                showInput: true,
                showTimeStart: true,
                showTimeEnd: true,
                index: index,
              };
            }
            return entry;
          });
          state.collectDay = updatedCollectDay;
        } else {
          const filter = state.collectDay.some((item) => item?.day === day);
          if (!filter) {
            state.collectDay.push({
              HowManyPatients: HowManyPatients || null,
              day: day || null,
              start: start,
              end: end,
              showInput: true,
              showTimeStart: true,
              showTimeEnd: true,
              index: index,
            });
          }
        }
      }
    },
    filterCollectionDay: (state, action) => {
      if (action.payload) {
        const filteredArray = action.payload.map(
          ({ showInput, showTimeStart, showTimeEnd, ...rest }) => rest
        );
        state.collectDay = filteredArray;
      }
    },
    progressBar: (state, action) => {
      if ((state.currentStep, state.totalSteps)) {
        state.currentStep += action.payload;
        state.proggresWidth =
          ((state.currentStep - 1) / (state.totalSteps - 1)) * 100;
      }
    },
    setscroll: (state, action) => {
      const { scrollLeft, viewportHeight, childWidth, indexValue } =
        action.payload;
      state.scrollLeft = scrollLeft;
      state.viewportHeight = viewportHeight;
      state.childWidth = childWidth;
      state.index = indexValue;
      state.scroll = scrollLeft;
      state.elementPosition = state.index * 300;
      state.IsInFocus = Math.abs(state.scroll - state.elementPosition) < 150;
    },
    set_isActive: (state) => {
      state.is_Active = true;
    },
    activeDoctors: (state, action) => {

      state.active_doctors = action.payload[0];
      state.rating = action.payload[1];

    },
    is_active: (state, action) => {
      if (state.active_doctors) {
        const userExists = state.active_doctors.some((doctor: any) => {
          return doctor.userId === action.payload && doctor.online
        })
        state.is_Active = userExists;
      }
    },
    last_Active: (state, action) => {
      if (!state?.active_doctors) return
      const userExists = state?.active_doctors.find((doctor: any) => {
        return doctor.userId === action.payload
      })
      if (userExists !== undefined) {
        const today_date = moment(new Date()).format("MM-DD-YYYY")
        const date = moment(new Date((userExists as any).lastActive)).format("MM-DD-YYYY");
        const dat2 = moment(new Date((userExists as any).lastActive)).format("HH:MM:SS");
        const time = convertTo12HourFormat(dat2)
        today_date === date ? state.last_active = time : state.last_active = `${date} ${time}`

      } else {
        state.last_active = null;

      }

    },
    setqualificationExists: (state, action) => {
      state.qualificationExists = action.payload;
    },
    setavailabilityExists: (state, action) => {
      state.availabilityExists = action.payload;
    },
    setspecializationExists: (state, action) => {
      state.specializationExists = action.payload;
    },
    set_rating: (state: any, action) => {
      const { id } = action.payload;
      let your_rating;
      if (state.rating !== null) {
        your_rating = state.rating.find((data) => {
          return data.id === id
        });
      }

      state.yourRatings = your_rating;
    }
  },

  extraReducers: (builders) => {
    builders
      .addCase(getDoctorData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctorData.fulfilled, (state, action) => {
        state.loading = false;
        state.doctordata = action.payload;
      })
      .addCase(getDoctorData.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailOfthePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patientData = action.payload?.data;
      })
      .addCase(getDetailOfthePatient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailOfthePatient.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(manualUpdate.fulfilled, (state, action) => { })
      .addCase(manualUpdate.pending, (state, action) => { })
      .addCase(manualUpdate.rejected, (state, action) => { })
      .addCase(spealisesIn.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(spealisesIn.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(spealisesIn.fulfilled, (state, action) => {
        state.specializationExists = true;
        state.loading = false;
      })
      .addCase(setDocDocuments.fulfilled, (state, action) => {
        state.qualificationExists = true;
        state.loading = false;
      })
      .addCase(setDocDocuments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(setDocDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCriteria.fulfilled, (state, action) => {
        state.availabilityExists = true;
        state.loading = false;
      })
      .addCase(setCriteria.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setCriteria.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export const {
  setMedication,
  deleteReducer,
  addMedication,
  setExperTires,
  deSelect,
  captureString,
  setCollectedDay,
  setDrop,
  filterCollectionDay,
  setscroll,
  set_isActive,
  activeDoctors,
  is_active,
  last_Active,
  setqualificationExists,
  setavailabilityExists,
  setspecializationExists,
  set_rating
} = DoctorState.actions;

export default DoctorState.reducer;
