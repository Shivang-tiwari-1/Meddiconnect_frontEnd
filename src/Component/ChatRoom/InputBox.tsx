import React, { useState } from 'react'
import io from 'socket.io-client'

// const socket = io('http://localhost:5000');

const InputBox = () => {
    const [message, Setmessage] = useState('');
    const [chat, Setchat] = useState([]);

        // const sendChat = (e) => {
        //     e.preventDefault();
        //     socket.emit('chat', { message });
        //     Setmessage("");
        // }
    return (
        <div className="shadow-lg border-2 rounded-full outline-none h-[6vh] w-[100%]  flex items-center px-4">
            {/* <form onSubmit={sendChat}>
                <input
                    type="text"
                    id="input"
                    className="w-full h-full rounded-full outline-none border-none placeholder-gray-500 text-black"
                    name="input"
                    placeholder="Type message here"
                    value={message}
                    onChange={e => Setmessage(e.target.value)}
                    required
                />
            </form> */}
            <button type='submit'>submit</button>

        </div>

    )
}

export default InputBox
