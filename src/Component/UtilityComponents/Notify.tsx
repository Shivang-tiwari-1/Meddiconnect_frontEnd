import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  set_Live_Message,
  set_notification,
} from "../../Redux/slices/socketRedux";

const Notify = () => {
  const { livemessage, notification } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (livemessage !== null) {
      const time_out = setTimeout(() => {
        dispatch(set_Live_Message(""));
        dispatch(set_notification(false));
      }, 2000);

      return () => clearInterval(time_out);
    }
  }, [livemessage, dispatch]);

  return (
    <>
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "150px",
            left: "20px",
            padding: "10px",
            color: "white",
            opacity: 0.8,
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            backgroundColor: "white",
          }}
          className={`border-2 flex justify-center items-center outline-none w-[40%] w-max-auto laptop:w-[15%] h-[10vh] rounded-xl`}
        >
          <p className={` text-black text-md font-bold`}>{livemessage}</p>
        </div>
      )}
    </>
  );
};

export default Notify;
