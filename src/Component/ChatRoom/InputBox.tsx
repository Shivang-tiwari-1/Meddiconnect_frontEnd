import React, { useContext, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdSettingsVoice } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { Setmessage, setRecords2, unSetmessage } from "../../Redux/slices/Message.Redux";
import { useRef } from 'react';
import { set_voiceLoader, voice_Popup } from "../../Redux/slices/Patient.Redux";
import Recorder from "../../Utility/Recorder/Recorder";
import { blobToBase64 } from "../../Services/service";
import { sendMessage, subscribe_events } from "../../Sockets/Initialize_socket";
import { socket } from "../../Constants";



const InputBox: React.FC = React.memo((props) => {
  const data = useAppSelector((state) => state.MessageSlice.data);
  const { voiceLoader, voice_popup } = useAppSelector((state) => state.patient);
  const userData = useAppSelector((state) => state.states.userData)
  const [url, setUrl] = useState('')
  const [audio_Blob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const idtomatch = useAppSelector((state) => state.stateChange.idtomatch);
  const recipent_role = useAppSelector((state) => state.stateChange.recipent_role);
  const formData = new FormData();

  const dispatchRef = useRef(false);
  const dispatch = useAppDispatch();

  const sendChat = async (e: any) => {
    console.log(data)
    e.preventDefault();

    try {
      dispatch(unSetmessage(''));
      await sendMessage(
        socket,
        dispatch,
        { receiver: idtomatch?.toString(), role: "receiver" },
        { sender: (userData as any)?.data?._id, role: "sender" },
        data,
        (userData as any).data?.role,
        null
      );

      await subscribe_events(socket, { id: typeof idtomatch?.toString() !== "string" ? String(idtomatch?.toString()) : idtomatch?.toString(), role: recipent_role }, "ui_update_subs");
      dispatch(voice_Popup(false))
    } finally {
      dispatchRef.current = false;
    }
  };
  const sendAudio = async () => {
    dispatch(setRecords2({ audioBase64data: data, text: null, role: "me", user_Role: (userData as any).data?.role }));
    dispatch(voice_Popup(false))
  }
  const startRecordingHandler = async () => {
    dispatch(set_voiceLoader(true));

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event?.data?.size) {
        if (audioChunksRef.current.length > 0) {
          audioChunksRef.current.length = 0
        }
        audioChunksRef.current.push(event?.data)
      }
    }
    mediaRecorderRef.current.start();
  };

  const stopRecording = async () => {
    dispatch(set_voiceLoader(false));
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current!.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob);
      setUrl(audioUrl)
      dispatch(voice_Popup(true))
      dispatch(Setmessage({
        type: "audio",
        data: await blobToBase64(audioBlob),
        mimeType: "audio/webm",
        url: audioUrl,
      }));
    };
  };
  function sendVoiceRecord() {

  };
  return (
    <div className={`flex flex-col  justify-center ${!voice_popup ? "h-[6vh]" : "h-[12vh]"} w-full  `}>

      <div className={`flex justify-center px-4 ${!voice_popup && "hidden"}`} >
        <div className="flex items-center h-[6vh] border-2 w-[40%] rounded-2xl bg-slate-100 px-4 justify-between">
          <audio src={url} controls></audio>
          <span className="ml-4 cursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out" onClick={async (e) => {
            await sendAudio()
          }}> <RiSendPlane2Fill size={20} /></span>
        </div>
      </div>

      <form
        onSubmit={sendChat}
        className=" h-[6vh] w-full  flex items-center px-4 justify-evenly "
      >
        <div className="w-[10%] flex justify-center items-center cursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out">
          <IoIosAdd size={30} />
        </div>

        <div className="w-[80%] h-[4vh] bg-[#ffff]">
          <input
            type="text"
            id="input"
            className="w-full h-full rounded-full outline-none border-none placeholder-gray-400 text-black"
            name="input"
            placeholder="Type message here"
            value={typeof data === 'string' ? data : ''}
            onChange={(e) => dispatch(Setmessage(e.target.value))}
            required
          />
        </div>
        <div className="flex justify-evenly w-[15%]">
          <div className="cursor-pointer hover:scale-100 transition-transform duration-300 ease-in-out" onMouseDown={() => {
            startRecordingHandler()
          }} onMouseUp={() => {
            stopRecording()
          }}>
            {!voiceLoader ? <MdSettingsVoice size={30} /> : <Recorder />}
          </div>
          <button
            className="cursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out"
          >
            <RiSendPlane2Fill size={25} />
          </button>
        </div>
      </form>
    </div>
  );
});

export default InputBox;
