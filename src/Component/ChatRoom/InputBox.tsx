import React, { useState } from "react";
import io from "socket.io-client";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdSettingsVoice } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useAppDispatch } from "../../Redux/Store/Store";
import { Setmessage } from "../../Redux/slices/Message.Redux";

// const socket = io('http://localhost:5000');
interface incomingData {
  message?: string;
  sendChat?: (e: any) => void;
}
const InputBox = (props: incomingData) => {
  const { message, sendChat } = props;
  const dispatch = useAppDispatch();
  const [chat, Setchat] = useState([]);

  return (
    <form
      onSubmit={sendChat}
      className=" h-[6vh] w-full  flex items-center px-4 justify-evenly"
    >
      <div className="w-[10%] flex justify-center items-center cursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out">
        <IoIosAdd size={30} />
      </div>

      <div className="w-[80%] h-[4vh]">
        <input
          type="text"
          id="input"
          className="w-full h-full rounded-full outline-none border-none placeholder-gray-500 text-black"
          name="input"
          placeholder="Type message here"
          value={message}
          onChange={(e) => dispatch(Setmessage(e.target.value))}
          required
        />
      </div>
      <div className="flex justify-evenly w-[15%]">
        <div className="cursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out">
          <MdSettingsVoice size={25} />
        </div>
        <button

          className="cursor-pointer hover:scale-150 transition-transform duration-300 ease-in-out"
        >
          <RiSendPlane2Fill size={25} />
        </button>
      </div>
    </form>
  );
};

export default InputBox;
