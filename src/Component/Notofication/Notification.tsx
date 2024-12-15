import React from "react";
import { useAppSelector } from "../../Redux/Store/Store";

const Notification = () => {
  const { message } = useAppSelector((state) => state.socket);
  console.log(message);
  return (
    <div className="flex flex-col w-full h-[85vh] p-5 gap-4 ">
      {message?.map((item, index) => (
        <div
          key={index}
          className="laptop:w-[60%]  mx-auto tablet:w-full h-[8vh] border-2 bg-gray-200 rounded-[3rem] p-3 flex justify-center"
        >
          <div className="flex justify-center items-center font-[500] w-[70%]">
            <p>{item.message}</p>
          </div>
          <div className="w-[30%] flex justify-evenly items-center">
            <div className="font-[500]">
              <p className="">Day:{item?.day}</p>
            </div>
            <div className="font-[500]">
              <p>Date:{item?.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
