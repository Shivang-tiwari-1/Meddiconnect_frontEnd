import InputBox from './InputBox';
import LeftScrollBar from './LeftScrollBar';
import Profile from './Profile'
import React, { useState } from "react";

const FinalChatroom = () => {
   
    return (
        <div className="h-screen w-full flex">
            <div className="flex-1 flex flex-col">
                <div className="h-full w-full">
                </div>
            </div>
            <div className='flex-none w-[20%] h-full p-0'>
                < LeftScrollBar />
            </div>
            <div className="w-[80%] flex flex-col justify-between ml-auto pr-4">
                <div className="w-full flex justify-end">
                    <Profile />
                </div>
                <div className="w-full flex justify-end">
                    <InputBox />
                </div>
            </div>
        </div>
    )
}

export default FinalChatroom
