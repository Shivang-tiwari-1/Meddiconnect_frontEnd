// UserDate.jsx
import React from "react";
import { useAppSelector } from "../../../Redux/Store/Store";
import UpperPart from "../../Repetitive_Components/FindDoctorComponents/UpperPart";
import Mapdoctor from "../../Repetitive_Components/FindDoctorComponents/Mapdoctor";
import LoadMore from "../../Repetitive_Components/FindDoctorComponents/LoadMore";

const FindDoctor = () => {
  const isDark = useAppSelector((state) => state.stateChange.isDark);

  return (
    <div className={`flex  ${isDark ? "dark" : ""} h-[100vh] `}>
      <div className=" bg-[#dadada] dark:bg-bgColorDarkBlack  dark:text-textWhite  mobile:w-full desktop:w-full laptop:w-full tablet:w-full  overflow-y-auto" >
        <div className="px-4 ">
          <UpperPart />
          <Mapdoctor />
          <LoadMore />
        </div>

      </div  >
    </div >
  );
};

export default FindDoctor;
