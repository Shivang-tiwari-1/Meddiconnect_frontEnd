import React from "react";
import Doctors from "../../Component/Patient/Finddoctors/Doctors";
import { IoArrowBackCircle } from "react-icons/io5";
import "./scrol.css";
interface UserData {
  toggleShow?: () => void;
  history?: string[];
  show?: boolean;
  handleToggleShow2?: () => void;
  handleToggleShow3?: () => void;
  show2?: boolean;
  show3?: boolean;
  show4?: boolean;
  handleToggleShow4?: () => void;
}

const PageModel2 = (props: UserData) => {
  const {
    toggleShow,
    history,
    show,
    handleToggleShow2,
    show2,
    handleToggleShow3,
    show3,
    show4,
    handleToggleShow4,
  } = props;

  console.log("pageModel");
  console.log(show3 ? "it is true" : "it is false");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[70%] h-[50vh] rounded-lg p-4 relative overflow-y-scroll custom-scrollbar">
        <div className="grid grid-cols-1 gap-4">
          {history?.map((item) => (
            <Doctors
              key={item?._id}
              name={item?.name}
              availability={item?.availability}
              profileImage={item?.profileImage}
              address={item?.address}
              history={item?.history}
              role={item?.role}
              show={show}
              handleToggleShow={toggleShow}
              handleToggleShow3={handleToggleShow3}
              show2={show2}
              show3={show3}
              show4={show4}
              handleToggleShow4={handleToggleShow4}
            />
          ))}
        </div>
        <div className="absolute bottom-4 right-4">
          <button onClick={handleToggleShow2}>
            <IoArrowBackCircle size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageModel2;
