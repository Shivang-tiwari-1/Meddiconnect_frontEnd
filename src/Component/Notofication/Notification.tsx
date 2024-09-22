import React from "react";
import { useAppSelector } from "../../Redux/Store/Store";

const Notification = () => {
  return (
    <div className="flex  w-full h-[65vh] p-5">
      <div className="border-2 bg-gray-200 w-full h-[8vh] rounded-[3rem] flex p-3">
        <div className="flex  items-center">
          <p>Notification</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
