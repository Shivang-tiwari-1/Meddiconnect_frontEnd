import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { io } from "socket.io-client";

interface data {
  data: Record<string, any>

}
interface change {
  isMobile?: boolean;
  gridView?: boolean;
  isTablet?: boolean;
  isDark?: boolean;
  nav_icon_update?: boolean;
  selectedState?: string[];
  filterdoctors?: string[];
  idtomatch?: string | null;
  day?: string;
  recipent_role?: string | null;
  mediaRecorder?: any;
  audioChunks?: []
}
const initialState: change = {
  isMobile: false,
  gridView: false,
  isTablet: false,
  isDark: false,
  nav_icon_update: false,
  selectedState: [],
  idtomatch: '',
  day: '',
  recipent_role: null
};

const StateChange = createSlice({
  name: "Change",
  initialState,
  reducers: {
    toggleMobileMode: (state) => {
      state.isMobile = !state.isMobile;
    },
    toogleGridChange: (state) => {
      state.gridView = !state.gridView;
    },
    toggleTabletMode: (state) => {
      state.isTablet = !state.isTablet;
    },
    toogleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
    setCurrentSteps: (state) => {
    },
    real_time_nav_update: (state) => {
      state.nav_icon_update = true;
    },
    setSelectedState: (state, action) => {
      const { currentState, doctors } = action.payload
      state.selectedState = [...(state?.selectedState || []), currentState];
      const filterd = doctors.filter((doctor) => {
        return state.selectedState?.some((item) => {
          return doctor?.address?.includes(item) || doctor?.name?.includes(item) || doctor?.specialization?.find(item => item === item)
        })
      })
      state.filterdoctors = filterd
    },
    removeSelectedState: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      const drop = state.selectedState?.filter((item) => {
        return item !== action.payload;
      })
      state.selectedState = drop;
      console.log(JSON.parse(JSON.stringify(state.selectedState)))
    },
    clearFilter: (state) => {
      state.selectedState = []
    },
    captureString: (state, action) => {
      const { dataArray, id } = action.payload;
      const see_if_id_exist = dataArray.find(data => (data.id !== undefined ? data.id : data._id) === id);
      console.log(see_if_id_exist)
      state.idtomatch = see_if_id_exist?.id !== undefined ? see_if_id_exist.id : see_if_id_exist?._id;
      state.recipent_role = see_if_id_exist.role;

    },
    get_day: (state) => {
      const date = moment(new Date());
      state.day = date.format("dddd")
    }
  },
});

export const {
  toggleMobileMode,
  toogleGridChange,
  toggleTabletMode,
  toogleDarkMode,
  real_time_nav_update,
  setSelectedState,
  removeSelectedState,
  clearFilter,
  captureString,
  get_day
} = StateChange.actions;
export default StateChange.reducer;
