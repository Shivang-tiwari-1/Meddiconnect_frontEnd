import React, { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { setOpenDoctorById, setSearchQuery, toogleShow } from "../../Redux/slices/Patient.Redux";
import { captureString } from "../../Redux/slices/StateChange.slice";
import { is_active, last_Active } from "../../Redux/slices/Doctor.Redux";
import { response_to_mess } from "../../Sockets/Initialize_socket";
import { clean_array } from "../../Redux/slices/Message.Redux";
import { Link } from "react-router-dom";
import LeftScrollbar from "../Repetitive_Components/LeftScrollBar";
import SocketContext from "../../Context/Socket/SocketContext";


const LeftScrollBar = () => {
  const socket = useContext(SocketContext);
  const { searchQuery } = useAppSelector((state) => state?.patient);
  const { patient_chat_client_side, chatting_doctors, doctor_chat_client_side, chatting_patients } = useAppSelector(state => state.MessageSlice);
  const { doctorData } = useAppSelector((state) => state.states);
  const { idtomatch } = useAppSelector(state => state.stateChange);
  const { isDark } = useAppSelector((state) => state.stateChange);
  const { userData } = useAppSelector((state) => state.states);

  const dispatch = useAppDispatch();

  const handleinput = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      setSearchQuery({ field: name as keyof typeof searchQuery, value })
    );
  };

  const handleToggleShow = (doctorId: string | null) => {
    dispatch(setOpenDoctorById(doctorId));
    dispatch(toogleShow(true));
  };

  const multipleFunctions = (data, id) => {
    dispatch(is_active(id));
    dispatch(last_Active(id));
    handleToggleShow?.(id);
    dispatch(clean_array((userData as any)?.data?.role));
    dispatch(captureString({ dataArray: data, id: id }));
    response_to_mess(socket, (userData as any)?.data?._id, String(id), (userData as any)?.data?.role);
  }
  //******************************DATATYPESMETHODS*******************************/
  const filterResultspatient = patient_chat_client_side?.filter((doctor) =>
    (doctor as any)?.name.toLowerCase().includes(searchQuery?.name?.toLowerCase() || 0)
  );
  const filterResultsDoctor = doctor_chat_client_side?.filter((patient) =>
    (patient as any)?.name.toLowerCase().includes(searchQuery?.name?.toLowerCase() || 0)
  );
  console.log(patient_chat_client_side, chatting_doctors, doctor_chat_client_side, chatting_patients)

  //*********************************LOGS****************************************/
  //**********************************HTML-CSS**************************************/
  return (
    <div
      className={`flex flex-col items-center border-2 shadow-lg rounded-md w-[100%] h-full p-4 space-y-4 `}
    >
      <div
        className={`w-full mobile:w-[90%] ${!isDark ? "border-b-2 border-gray-300 outline-none shadow-lg" : ""
          }`}
      >
        <input
          className={`w-full h-[2.5rem] outline-none  ${isDark ? "bg-slate-700" : "bg-white"
            } placeholder-gray-500 px-4 rounded-full`}
          type="text"
          placeholder="name"
          id="name"
          name="name"
          value={searchQuery?.name}
          onChange={handleinput}
        />
      </div>

      {!doctorData?.accessToken ? (
        <>
          {filterResultspatient?.length === 0 ? (
            chatting_doctors === null  ? (
              patient_chat_client_side?.map((data) => (
                <LeftScrollbar
                  key={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                  id={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                  name={(data as any)?.name}
                  profileImage={(data as any)?.profileImage}
                  multipleFunctions={multipleFunctions}
                  idtomatch={idtomatch ?? ''}
                  client_side={patient_chat_client_side}
                />
              ))
            ) : (
              chatting_doctors?.map((data) => (
                <LeftScrollbar
                  key={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                  id={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                  name={(data as any)?.name}
                  profileImage={(data as any)?.profileImage}
                  multipleFunctions={multipleFunctions}
                  idtomatch={idtomatch ?? ""}
                  client_side={chatting_doctors}

                />
              ))
            )
          ) : (
            filterResultspatient?.map((data) => (
              <button
                key={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === (data as any)?.id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                  } mobile:h-[10vh] mobile:w-[90%]`}
                onClick={() => multipleFunctions(filterResultspatient, (data as any)?.id)}
              >
                <div className="flex gap-2 w-full">
                  <div className="px-2 w-[70px] h-[50px]">
                    <img src={(data as any)?.profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div className="text-sm font-light">{(data as any)?.name}</div>
                </div>
              </button>
            ))
          )}
        </>
      ) :
        <>
          {filterResultsDoctor?.length === 0 ? (
            chatting_patients?.length === 0 || chatting_patients?.length <= doctor_chat_client_side?.length ? (
              doctor_chat_client_side?.map((data: any) => (
                <LeftScrollbar
                  key={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                  id={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                  name={data?.name}
                  profileImage={data?.profileImage}
                  multipleFunctions={multipleFunctions}
                  idtomatch={idtomatch ?? ''}
                  client_side={doctor_chat_client_side}
                />
              ))
            ) : (
              chatting_patients?.map((data: any) => (
                <LeftScrollbar
                  key={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                  id={data?.id === undefined ? data?._id : data?.id}
                  name={data?.name}
                  profileImage={data?.profileImage}
                  multipleFunctions={multipleFunctions}
                  idtomatch={idtomatch ?? ''}
                  client_side={chatting_patients}
                />
              ))
            )
          ) : (
            filterResultsDoctor?.map((data: any) => (
              <button
                key={(data as any)?.id === undefined ? (data as any)?._id : (data as any)?.id}
                className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === data?.id && !isDark ? 'bg-gray-200 bg-gradient-to-r shadow-lg scale-105' : ''
                  } mobile:h-[10vh] mobile:w-[90%]`}
                onClick={() => multipleFunctions(filterResultsDoctor, data?._id)}
              >
                <div className="flex gap-2 w-full">
                  <div className="px-2 w-[70px] h-[50px]">
                    <img src={data?.profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div className="text-sm font-light">{data?.name}</div>
                </div>
              </button>
            ))
          )}
        </>
      }
    </div >
  );
};

export default LeftScrollBar;
