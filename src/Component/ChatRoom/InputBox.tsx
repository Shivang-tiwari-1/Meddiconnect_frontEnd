import React, { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdSettingsVoice } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { Setmessage, unSetmessage } from "../../Redux/slices/Message.Redux";
import { sendMessage, subscribe_events } from "../../Sockets/Initialize_socket";
import { useRef } from 'react';
import { set_voiceLoader, voice_Popup } from "../../Redux/slices/Patient.Redux";
import Recorder from "../../Utility/Recorder/Recorder";
import { FaPause, FaPlay } from "react-icons/fa6";
import RecordPlaying from "../../Utility/Recorder/RecordPlaying";

interface incomingData {
  receiverid?: string;
  senderid?: string
  socket?: any
  role?: string
}


const InputBox: React.FC<incomingData> = React.memo((props) => {
  const { receiverid, senderid, socket, role } = props;
  const { message } = useAppSelector((state) => state.MessageSlice);
  const { voiceLoader, voice_popup } = useAppSelector((state) => state.patient);
  const [url, setUrl] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const dispatchRef = useRef(false);
  const dispatch = useAppDispatch();

  const sendChat = async (e: any) => {
    e.preventDefault();
    if (dispatchRef.current) return;
    dispatchRef.current = true;
    try {
      dispatch(unSetmessage(''));
      sendMessage(
        socket,
        dispatch,
        { receiver: receiverid, role: "receiver" },
        { sender: senderid, role: "sender" },
        message,
        role
      );
      subscribe_events(socket, typeof receiverid !== "string" ? String(receiverid) : receiverid, "ui_update_subs");

    } finally {
      dispatchRef.current = false;
    }
  };
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
  function stopRecording() {
    dispatch(set_voiceLoader(false));
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current!.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setUrl(audioUrl)
      dispatch(voice_Popup(true))
    };
  };
  function sendVoiceRecord() {
    dispatch(voice_Popup(false))

  }

  return (
    <div className={`flex flex-col  justify-center ${!voice_popup ? "h-[6vh]" : "h-[12vh]"} w-full  `}>

      <div className={`flex justify-center px-4 ${!voice_popup && "hidden"}`} >
        <div className="flex items-center h-[6vh] border-2 w-[40%] rounded-2xl bg-slate-100 px-4 justify-between">
          <audio src={url} controls></audio>
          <span className="ml-4 ursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out" onClick={sendVoiceRecord}> <RiSendPlane2Fill size={20} /></span> 
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
            value={message}
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
