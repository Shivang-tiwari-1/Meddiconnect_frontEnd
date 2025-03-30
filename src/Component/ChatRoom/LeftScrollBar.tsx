import React from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { setSearchQuery } from "../../Redux/slices/Patient.Redux";
import { captureString } from "../../Redux/slices/StateChange.slice";
import { is_active, last_Active } from "../../Redux/slices/Doctor.Redux";
import { response_to_mess } from "../../Sockets/Initialize_socket";

interface incomingData {
  socket?: any,
  show?: boolean;
  name?: string;
  profileImage?: string;
  handleToggleShow?: (id: string) => void;
  openDoctorId?: string | null;
  key?: string;
  doctors?: [] | null;
  isDark?: boolean;
  senderData?: object
}

const LeftScrollBar = ({
  handleToggleShow,
  doctors,
  isDark,
  socket,
  senderData
}: incomingData) => {
  //****************************APP_SELECTORS*******************************/
  const { searchQuery } = useAppSelector((state) => state?.patient);
  const { patient_chat_client_side, chatting_doctors, doctor_chat_client_side, chatting_patients } = useAppSelector(state => state.MessageSlice);
  const { doctorData } = useAppSelector((state) => state.states);
  const { idtomatch, recipent_role } = useAppSelector(state => state.stateChange);

  //*******************************DIPATCH************************************/
  const dispatch = useAppDispatch();
  // dispatch(set_filterResults(doctors));
  //******************************FUNCTIONS************************************/
  const handleinput = (e: any) => {
    const { value, name } = e.target;
    dispatch(
      setSearchQuery({ field: name as keyof typeof searchQuery, value })
    );
  };

  const multipleFunctions = (data, id) => {
    dispatch(is_active(id));
    dispatch(last_Active(id));
    handleToggleShow?.(id);
    dispatch(captureString({ dataArray: data, id: id }));
    response_to_mess(socket, (senderData as any)?.data?._id, String(id), (senderData as any)?.data?.role)
    // dispatch(patient_chat(id));
  }
  //******************************DATATYPESMETHODS*******************************/
  const filterResults = doctors?.filter((doctor) =>
    (doctor as any)?.name.toLowerCase().includes(searchQuery?.name?.toLowerCase() || 0)
  );
  //*********************************LOGS****************************************/
  //**********************************HTML-CSS**************************************/
  return (
    <div
      className={`flex flex-col items-center border-2 shadow-lg rounded-md w-[100%] h-full p-4 space-y-4 `}
    >
      <div
        className={`w-full ${!isDark ? "border-b-2 border-gray-300 outline-none shadow-lg" : ""
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
          {filterResults?.length === 0 ? (
            chatting_doctors?.length === 0 || chatting_doctors?.length <= patient_chat_client_side?.length ? (
              patient_chat_client_side?.map((data) => (
                <button
                  key={(data as any)?.id}
                  className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === (data as any)?.id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                    }`}
                  onClick={() => multipleFunctions(patient_chat_client_side, (data as any)?.id)}
                >
                  <div className="flex gap-2 w-full items-center">
                    <div className="px-2 flex items-center gap-2">
                      <div className="w-[60px] h-[50px]">
                        <img src={(data as any)?.profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="text-sm font-light">{(data as any)?.name}</div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              chatting_doctors?.map((data) => (
                <button
                  key={(data as any)?.id}
                  className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === (data as any)?.id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                    }`}
                  onClick={() => multipleFunctions(chatting_doctors, (data as any)?.id)}
                >
                  <div className="flex gap-2 w-full items-center">
                    <div className="px-2 flex items-center gap-2">
                      <div className="w-[60px] h-[50px]">
                        <img src={(data as any)?.profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="text-sm font-light">{(data as any)?.name}</div>
                    </div>
                  </div>
                </button>
              ))
            )
          ) : (
            filterResults?.map((data) => (
              <button
                key={(data as any)?._id}
                className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === (data as any)?.id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                  }`}
                onClick={() => multipleFunctions(filterResults, (data as any)?.id)}
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
          {filterResults?.length === 0 ? (
            chatting_patients?.length === 0 || chatting_patients?.length <= doctor_chat_client_side?.length ? (
              doctor_chat_client_side?.map((data) => (
                <button
                  key={(data as any)?.id}
                  className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === (data as any)?.id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                    }`}
                  onClick={() => multipleFunctions(doctor_chat_client_side, (data as any)?._id)}
                >
                  <div className="flex gap-2 w-full items-center">
                    <div className="px-2 flex items-center gap-2">
                      <div className="w-[60px] h-[50px]">
                        <img src={(data as any)?.profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="text-sm font-light">{(data as any)?.name}</div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              chatting_patients?.map((data) => (
                <button
                  key={(data as any)?._id}
                  className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === (data as any)?.id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                    }`}
                  onClick={() => multipleFunctions(chatting_patients, (data as any)?._id)}
                >
                  <div className="flex gap-2 w-full items-center">
                    <div className="px-2 flex items-center gap-2">
                      <div className="w-[60px] h-[50px]">
                        <img src={(data as any)?.profileImage} alt="Profile" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="text-sm font-light">{(data as any)?.name}</div>
                    </div>
                  </div>
                </button>
              ))
            )
          ) : (
            filterResults?.map((data) => (
              <button
                key={(data as any)?._id}
                className={`flex w-full space-y-2 h-[6vh] p-2 border-[0.5px] items-center rounded-md ${idtomatch === (data as any)?.id && !isDark ? "bg-gray-200 bg-gradient-to-r shadow-lg scale-105" : ""
                  }`}
                onClick={() => multipleFunctions(filterResults, (data as any)?._id)}
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
        </>}

    </div >
  );
};

export default LeftScrollBar;
