import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { socket } from "../../Constants";
import { joinroom, sendDataSocket, subscribe_events } from "../../Sockets/Initialize_socket";

import { sideBarContent } from "../../Redux/slices/Patient.Redux";
import { fetch_chatting_doc } from "../../Redux/slices/Message.Redux";
import { get_day } from "../../Redux/slices/StateChange.slice";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaClinicMedical } from "react-icons/fa";
import { LiaHospitalSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";

const Home = () => {
  const { patientData } = useAppSelector((state) => state.states);
  const { userData } = useAppSelector((state) => state.states);
  const { isDark } = useAppSelector((state) => state.stateChange);

  const dispatch = useAppDispatch();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const address = await reverseGeocode(lat, lng);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  async function reverseGeocode(lat, lng) {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${"c9fe87d9e2d44cbcb1f4537850c7971b"}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].formatted;
    } else {
      return "Location not found.";
    }
  }

  async function permissions() {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  }

  permissions();
  useEffect(() => {
    if (socket.connected && patientData?.accessToken) {
      sendDataSocket(dispatch, socket, (userData as any)?.data);
      subscribe_events(socket, (patientData as any)?.userData?.data?._id?.toString(), "subscribe_message_channel");
      console.log("there you going trying to join the room ")
      joinroom(socket, "patient_information")
      subscribe_events(socket, (patientData as any)?.userData?.data?._id
        ?.toString(), "subscribe_patient_channel");
      dispatch(get_day())
    } else {
      console.error("socket problem")
    }
  }, [socket?.connected]);

  useEffect(() => {
    if (patientData?.accessToken) {
      dispatch(fetch_chatting_doc());
      dispatch(sideBarContent());
    }
  }, []);



  return (
    <div
      className={`flex flex-col justify-center items-center w-full  min-h-screen h-auto ${isDark ? "dark" : ""
        } ${isDark ? "bg-bgColorDarkBlack" : "bg-[#F0F0F5]"} ${isDark ? "text-black" : "text-white"
        }`}
    >
      <div className={`flex flex-col   min-h-[100vh] h-auto  items-center w-[80%] ${isDark ? "bg-bgColorDarkBlack text-white" : "bg-[#FFFFFF] text-black "} `}>
        <div className={`flex w-[70%] gap-4 py-5  ${isDark && "text-black"
          }`}>
          <div className="relative w-full">
            <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <select
              name="location"
              className="border border-gray-300 rounded-lg h-[2.5rem] w-full pl-10 pr-5 bg-white appearance-none outline-none shadow-md"
            >
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </select>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              ▼
            </span>
          </div>

          <input type="text"
            name="email"
            id="email"
            placeholder="Search special doctor,clinic, hospital"
            className="border border-primaryGrey rounded-lg h-[2.5rem] w-full pr-10 outline-none shadow-lg"
          />
        </div>

        <div className={`w-full min-h-[30vh] h-auto flex justify-center flex-col py-4  border-b-2 shadow-lg rounded-md  `}>

          <div className="flex flex-col justify-start items-center py-6 ">
            <div className="flex  justify-center items-center w-full min-h-[100px]">
              <p className=" h-10 flex justify-center items-center font-[400] text-5xl tablet:text-4xl">
                Find the nearest health provider
              </p>
            </div>
            <div className="w-full flex justify-center items-center">
              <p className="font-[400] text-[18px]  text-primaryGrey">Search by</p>
            </div>
          </div>

          <div className=" flex gap-7 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="h-16 w-16 rounded-full flex justify-center items-center  bg-[#02a6d8]  "> <p className="text-white "><FaUserDoctor size={25} />
              </p>
              </div>
              <p className="font-[400] text-[18px]  text-primaryGrey">
                Doctors
              </p>
              <p className="font-[400] text-[18px]  text-primaryGrey">
                {`{3000}`}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="bg-[#02a6d8] h-16 w-16 rounded-full flex justify-center items-center"> <p className="text-white"><FaClinicMedical size={28} /></p>
              </div>
              <p className="font-[400] text-[18px]  text-primaryGrey">
                Clinics
              </p>
              <p className="font-[400] text-[18px]  text-primaryGrey">
                {`{3000}`}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="bg-[#02a6d8] h-16 w-16 rounded-full flex justify-center items-center"> <p className="text-white"><LiaHospitalSolid size={30} />
              </p>
              </div>
              <p className="font-[400] text-[18px]  text-primaryGrey">
                Hospitals
              </p>
              <p className="font-[400] text-[18px]  text-primaryGrey">
                {`{3000}`}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="bg-[#02a6d8] h-16 w-16 rounded-full flex justify-center items-center"> <p className="text-white"><GiMedicines size={30} /></p>
              </div>
              <p className="font-[400] text-[18px] text-primaryGrey">
                Treatments
              </p>
              <p className="font-[400] text-[18px]  text-primaryGrey">
                {`{3000}`}
              </p>
            </div>

          </div>
        </div>

        <div className="w-full min-h-[30vh] h-auto flex  flex-col py-4 border-b-2 shadow-lg rounded-md ">
          <div className="flex flex-col h-full">
            <div className="flex justify-start items-center w-full h-auto px-3">
              <p className="h-auto font-[400] text-2xl">
                Top Doctor Specialist in Mumbai
              </p>
            </div>
            <div className="w-full h-full px-3 py-3 gap-4 grid grid-cols-7">
              <div className="border-2 h-10 w-20 rounded-full flex justify-center items-center">d</div>
              <div className="border-2 h-10 w-20 rounded-full flex justify-center items-center">d</div>
            </div>
          </div>
        </div>


        <div className="w-full min-h-[30vh] h-auto  flex  flex-col py-4  border-b-2 shadow-lg rounded-md">
          <div className="flex flex-col  items-center py-2  h-full">
            <div className="flex justify-start items-center w-full h-auto px-3">
              <p className="h-auto font-[400] text-2xl">
                Top Localities in Mumbai
              </p>
            </div>
            <div className="w-full h-full px-3 py-3 gap-4 grid grid-cols-7">
              <div className="border-2 h-10 w-20 rounded-full flex justify-center items-center">d</div>
              <div className="border-2 h-10 w-20 rounded-full flex justify-center items-center">d</div>
            </div>
          </div>
        </div>


        <div className="w-full   min-h-[30vh] h-auto  flex  flex-col py-4 border-b-2 shadow-lg rounded-md">
          <div className="flex flex-col  py-2  h-full">
            <div className="flex justify-start items-center w-full h-auto px-3">
              <p className="h-auto font-[400] text-2xl">
                Feedback
              </p>
            </div>
            <div className="w-full h-full px-3 py-3 gap-4 flex flex-col">
              <div className="border-2 h-32 w-full rounded-l-full flex ">
                <div className="w-[18.5%] h-[12.6vh]  rounded-full flex   justify-start items-start">
                </div>
                <div className="w-[80%] flex justify-center items-center ml-2">
                  <p className="font-[500]">Dr Hardik Seth is very co-operative and friendly Doctor. One of my relatives Mr Arvind Gupta’s treatment is going on for psychiatric problem. We r very much satisfied with his treatment and Consultation. My relative is improving a lot. Thanks Doctor.  - Santosh Gupta</p>
                </div>
              </div>

              <div className="border-2 h-32 w-full rounded-l-full flex ">
                <div className="w-[18.5%] h-[12.6vh]  rounded-full flex   justify-start items-start">
                </div>
                <div className="w-[80%] flex justify-center items-center ml-2">
                  <p className="font-[500]">Dr Hardik Seth is very co-operative and friendly Doctor. One of my relatives Mr Arvind Gupta’s treatment is going on for psychiatric problem. We r very much satisfied with his treatment and Consultation. My relative is improving a lot. Thanks Doctor.  - Santosh Gupta</p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>


      <div className="w-full bg-gradient-to-r from-blue-200 to-blue-400  text-white py-10 px-20">
        <div className="grid grid-cols-5 gap-10">

          {/* Column 1 */}
          <div>
            <h2 className="font-bold text-lg mb-3">Yatros</h2>
            <ul className="space-y-1">
              <li className=" cursor-pointer"><Link to={"#"}>About</Link> </li>
              <li className=" cursor-pointer"><Link to={'#'}>Blog</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>Careers</Link>  </li>
              <li className=" cursor-pointer"><Link to={"#"}>Press</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>Contact Us</Link></li>
            </ul>
          </div>


          <div>
            <h2 className="font-bold text-lg mb-3">For Patients</h2>
            <ul className="space-y-1">
              <li className=" cursor-pointer"><Link to={"#"}>Search for doctors</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>Search for clinics</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}> Search for hospitals</Link></li>
              <li className=" cursor-pointer"><Link to={"#"}>Search for diagnostics</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>  Read health articles</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="font-bold text-lg mb-3">For Doctors</h2>
            <ul className="space-y-1">
              <li className="hover:text-blue-400 cursor-pointer"><Link to={"#"}> Practo Consult</Link></li>
              <li className="hover:text-blue-400 cursor-pointer"><Link to={"#"}>Practo Health Feed</Link> </li>
              <li className="hover:text-blue-400 cursor-pointer"><Link to={"#"}>Practo Profile</Link> </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h2 className="font-bold text-lg mb-3">More</h2>
            <ul className="space-y-1">
              <li className=" cursor-pointer"><Link to={"#"}>Help</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>Developers</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>Privacy Policy</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>Terms & Conditions </Link> </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h2 className="font-bold text-lg mb-3">Social</h2>
            <ul className="space-y-1">
              <li className=" cursor-pointer"><Link to={"#"}>Facebook</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>Twitter</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>LinkedIn</Link> </li>
              <li className=" cursor-pointer"><Link to={"#"}>GitHub</Link> </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;
