import { createSlice, PayloadAction, Tuple } from "@reduxjs/toolkit";
import moment from "moment";

interface data {
  data: Record<string, any>
}
type IndiaDataType = {
  [state: string]: {
    [city: string]: string[];
  };
};

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
  audioChunks?: [];
  menu?: boolean;
  toMobileChatRoom?: boolean;
  page?: Number | null;
  india_data?: IndiaDataType;
  currentState?: object;
  indianStates?: string[];
  currentCitydata?: object;
  makeQuery: object;
  rating?: Number;
  today?: boolean;
  re_render_check?: boolean
};

const initialState: change = {
  today: false,
  isMobile: false,
  gridView: false,
  isTablet: false,
  isDark: false,
  nav_icon_update: false,
  selectedState: [],
  idtomatch: '',
  day: '',
  recipent_role: null,
  menu: false,
  toMobileChatRoom: false,
  page: 1,
  india_data: {
    Maharashtra: {
      Mumbai: [
        "Colaba", "Fort", "Marine Lines", "Churchgate", "Malabar Hill", "Girgaon",
        "Byculla", "Dadar", "Worli", "Andheri West", "Andheri East", "Bandra West",
        "Bandra East", "Juhu", "Khar", "Santacruz West", "Santacruz East", "Vile Parle",
        "Goregaon", "Malad", "Kandivali West", "Kandivali East", "Borivali West", "Borivali East",
        "Dahisar", "Kurla", "Ghatkopar", "Vikhroli", "Bhandup", "Mulund", "Kanjurmarg",
        "Powai", "Chembur", "Govandi", "Mankhurd", "Wadala", "Mira-Bhayander"
      ],
      Pune: [
        "Kothrud", "Wakad", "Hinjewadi", "Baner", "Koregaon Park", "Shivajinagar",
        "Pimple Saudagar", "Viman Nagar", "Hadapsar", "Magarpatta City", "Aundh",
        "Deccan Gymkhana", "Yerwada", "Bhosari", "Pimpri-Chinchwad", "Sangamwadi",
        "Karvenagar", "Sadashiv Peth", "Tathawade", "Rahatani", "Wagholi", "Chandni Chowk",
        "Moshi", "Bavdhan", "Shivane", "Pashan", "Bhugaon", "Mundhwa", "Fursungi",
        "Loni Kalbhor", "Kharadi"
      ],
      vasaiVirar: [
        "Vasai East", "Vasai West", "Virar East", "Virar West",
        "Nalasopara East", "Nalasopara West", "Naigaon East", "Naigaon West",
        "Agashi", "Arnala", "Bolinj", "Chandansar", "Chinchoti", "Gass",
        "Juchandra", "Kaman", "Kopar", "Nirmal", "Pelhar", "Rajodi",
        "Sativali", "Shirgaon", "Umrale", "Waliv", "Adne", "Ambode",
        "Bapane", "Bhaliwali", "Bhatane", "Bhatpada", "Bhinar", "Bhuigaon (Bk.)",
        "Bhuigaon (Kh.)", "Bilalpada", "Chikhaldongre", "Chobare", "Dahisar",
        "Deodal", "Depivali", "Dhaniv", "Dolivpada", "Gas Kopari", "Giriz",
        "Gokhiware", "Hedavade", "Kalamb", "Kalambhon", "Kaner", "Karanjon",
        "Karmale", "Kasarali", "Kashid Kopar", "Kaular (Bk.)", "Kaular (Kh.)",
        "Khairpada", "Khaniwade", "Khardi", "Khochivade", "Kiravali", "Kolhapur",
        "Kolhi", "Koshimbe", "Majivali", "Malaji Pada", "Mandvi", "Mardes",
        "Medhe", "Mori", "Mukkam", "Mulgaon", "Nagale", "Nale", "Navale", "Navasai",
        "Pali", "Panju", "Parol", "Patilgaon", "Poman", "Rajavali", "Rangaon",
        "Saiwan", "Sakawar", "Saloli", "Sarjamori", "Sasunavghar", "Satpale",
        "Shilottar", "Shirsad", "Shirvali", "Shivansai", "Tarkhad", "Tembhi",
        "Tilher", "Tivari", "Tokare", "Umele", "Usgaon", "Vadavali", "Vadghar",
        "Vatar", "Wagholi", "Palghar"
      ],
      Nashik: [
        "Indira Nagar", "Makhmalabad", "Gangapur", "Trimbak", "Adgaon", "College Road",
        "Panchavati", "Bhonsala Military School", "Lasalgaon", "Pathardi", "Wadi Sinnar",
        "Govind Nagar", "Saptashrungi", "Sharanpur", "Chandwad", "Manur", "Nandgaon"
      ],
      Aurangabad: [
        "CIDCO", "Garkheda", "Jalna Road", "Kranti Chowk", "Bibi Ka Maqbara", "Paithan Road",
        "MG Road", "Ranjangaon", "Sillod", "Adgaon", "Bhadkal", "Harsul", "Sanjay Gandhi Nagar"
      ],
      Nagpur: [
        "Civil Lines", "Sitabuldi", "Ramdaspeth", "Amanaka", "Borgaon", "Mahal", "Wadi",
        "Gittikhadan", "Jaripatka", "Ashok Nagar", "Bhandara Road", "Panchpaoli", "Nandanvan",
        "Kamptee", "Manish Nagar", "Godhni", "Khamla", "Trimurti Nagar", "Laxminagar"
      ],
      Thane: [
        "Vartak Nagar", "Ghodbunder Road", "Mulund West", "Dombivli", "Kalyan", "Bhiwandi",
        "Badlapur", "Wagle Estate", "Mumbra", "Naupada", "Kasarvadavali", "Shahapur",
        "Turbhe", "Vashi", "Panvel"
      ],
      Solapur: [
        "Mangalwar Peth", "Akkalkot", "Baranjala", "Solapur City", "Sadar Bazar",
        "Borgaon", "Pratibha Nagar", "Vikramshila", "Alapur", "Karad", "Pandharpur"
      ],
      Kolhapur: [
        "Shivaji Udyam Nagar", "Rajaram Path", "Sadar Bazar", "Bhavani Mandap", "Mahalaxmi",
        "Ichalkaranji", "Bajiprabhu Nagar", "Narsobawadi", "Kagal", "Gokul Shirgaon"
      ],
      Nanded: [
        "Old Nanded", "Nanded City", "Sadar Bazar", "Jambhli Naka", "Dhulia", "Indira Nagar",
        "Bharat Nagar", "Shivaji Chowk"
      ],
      Ratnagiri: [
        "Ganapati Pule", "Ratnagiri City", "Mandangad", "Chiplun", "Khed", "Rajapur",
        "Guhagar", "Dervan"
      ],
      Jalna: [
        "Malkapur", "Vishnupuri", "Jalna City", "Shivajinagar", "Gandhinagar", "Babhulgaon"
      ],
      Akola: [
        "Borgaon", "Ram Nagar", "Shivaji Nagar", "Gajanan Nagar", "Malkapur", "Jatharpeth"
      ],
      Parbhani: [
        "Babhulgaon", "Borgaon", "Gandhinagar", "Vidyanagar", "Mahavir Nagar", "Indira Nagar"
      ],
      Dhule: [
        "Panchal Nagar", "Malkapur", "Chopda", "Deopur", "Bhivpur", "Ranjanpada"
      ],
      Latur: [
        "Old Latur", "Vishnu Nagar", "Satyanarayan Nagar", "Sarvoday Nagar", "Kendre Nagar"
      ],
      Sindhudurg: [
        "Malvan", "Sindhudurg Nagar", "Dhareshwar", "Vengurla", "Kudal", "Sawantwadi"
      ],
      Jalgaon: [
        "Malkapur", "Ranjanpada", "Chopda", "Phule Nagar", "Pachora", "Vasant Nagar"
      ],
      Beed: [
        "Malkapur", "Shivajinagar", "Azad Nagar", "Prakash Nagar", "Vishnu Nagar"
      ],
      Satara: [
        "Peth Naka", "Kumbhargaon", "Karad", "Satara City", "Sadar Bazar", "Malkapur"
      ]
    }
  },
  currentState: {
  },
  currentCitydata: {},
  makeQuery: {
    sideBarContent: true,
    bookAppointment: true,
    fetch_chatting_doc: true
  },
  rating: 0,
  re_render_check: true
};

const StateChange = createSlice({
  name: "Change",
  initialState,
  reducers: {
    toggleMobileMode: (state, action) => {
      console.log(action.payload)
      if (action.payload <= 429) {
        state.isMobile = true;
      } else {
        state.isMobile = false;
      }
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
      state.filterdoctors = filterd;
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
      state.idtomatch = see_if_id_exist?.id !== undefined ? see_if_id_exist.id : see_if_id_exist?._id;
      console.log(dataArray, id, see_if_id_exist)
      state.recipent_role = see_if_id_exist.role;
    },
    get_day: (state) => {
      const date = moment(new Date());
      state.day = date.format("dddd")
    },
    menu_change: (state, action) => {
      console.log(action.payload)
      state.menu = action.payload
    },
    toggleMobileChatRoom: (state, action) => {
      state.toMobileChatRoom = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setState: (state, action) => {
      state.currentState = action.payload;
      const satteData = Object.entries((state as any)?.india_data).find(([key, value]) => {
        return key?.toString().toLowerCase() === (state as any).currentState?.State?.toString().toLowerCase();
      });

      if (satteData) {
        const [stateName, localities] = satteData;
        const matchingDoc = Object.entries((localities as any)).find(([locality, docs]) => {
          return (docs as any).some((doc: any) => doc === (state as any).currentState.town) || (docs as any).some((doc: any) => doc === (state as any).currentState.state_district
          )
        });
        state.currentCitydata = matchingDoc
      }
    },
    setQuery: (state, action) => {
      const { field, value } = action.payload;
      state.makeQuery[field] = value
    },
    setRating: (state, action) => {
      const { index } = action.payload;
      state.rating = index + 1;
    },
    T_oday: (state, action) => {
      state.today = action.payload;
    },
    re_render__check: (state, action) => {
      state.re_render_check = action.payload
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
  get_day,
  menu_change,
  toggleMobileChatRoom,
  setPage,
  setState,
  setQuery,
  setRating,
  T_oday,
  re_render__check
} = StateChange.actions;
export default StateChange.reducer;
