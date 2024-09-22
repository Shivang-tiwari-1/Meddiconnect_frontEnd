import React from "react";
interface bookingState {
  show3?: boolean;
  handleToggleShow3?: () => void;
}
const BookeAppointManually = () => {
  console.log("boolkkkkk");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-center items-center border-2 rounded-lg w-[70%] h-[50vh] desktop:w-[40%] desktop:h-[60vh] bg-white">
          <div className="">
            <input type="text" />
          </div>
        </div>
      </div>

      <div>

      </div>
    </div>
  );
};

export default BookeAppointManually;
