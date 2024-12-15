import React, { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useAppDispatch } from "../../Redux/Store/Store";
import { setDocDocuments } from "../../Redux/slices/Doctor.Redux";
import {
  toggleAlertCheck,
  toggleStatusCheck,
} from "../../Redux/slices/signup_login.";
import { useNavigate } from "react-router-dom";

interface stateChaneg {
  isDark?: boolean;
  show2?: boolean;
  handleToggleShow2?: () => void;
  hoveredField?: String;
  handleMouseOut?: () => void;
  handleMouseOver?: (fieldNam: string) => void;
}

const DocumentPageModel = (props: stateChaneg) => {
  const {
    show2,
    isDark,
    handleToggleShow2,
    handleMouseOut,
    handleMouseOver,
    hoveredField,
  } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [documents, setDocuments] = useState<File[]>([]);

  const catchdata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, files } = e.target;
    if (type === "file" && files && documents.length < 3) {
      setDocuments((prevDocuments) => [...prevDocuments, files[0]]);
    }
  };
  return (
    <form
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onSubmit={(e) => {
        if (documents.length < 3) {
          dispatch(toggleAlertCheck("all fields are required"));
          dispatch(toggleStatusCheck(400));
        }
        e.preventDefault();
        dispatch(
          setDocDocuments({
            MedicalRegistrationCertificate: documents[0],
            MBBSDegree: documents[1],
            StateMedicalCouncilRegistration: documents[2],
          })
        );
      }}
    >
      <div
        className={`w-[70%] laptop:w-[50%] h-[50vh] rounded-lg p-4 relative ${
          isDark ? "bg-bgColorDarkBlack" : "bg-white"
        } ${isDark ? "text-white" : ""}`}
      >
        <div className="flex flex-col py-6">
          <div className="flex items-center justify-center h-[5vh] animate-slideDown">
            <p className="font-[500] text-lg"> Submit your documents </p>
          </div>

          {/* Medical Registration Certificate */}
          <div
            className={`py-[2rem] ${
              isDark ? "text-white" : ""
            } flex justify-around items-center border-2 rounded-xl relative`}
            onMouseOver={() =>
              handleMouseOver?.("MedicalRegistrationCertificate")
            }
            onMouseOut={handleMouseOut}
          >
            {hoveredField === "MedicalRegistrationCertificate" && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50 font-[500] opacity-70">
                Enter your Medical Registration Certificate
                <span className="absolute -bottom-2 left-4 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-200"></span>
              </div>
            )}
            <label
              className="font-[500] w-[36%]"
              htmlFor="MedicalRegistrationCertificate"
            >
              Medical Registration Certificate
            </label>
            <input
              type="file"
              className="rounded-full border-2"
              name="MedicalRegistrationCertificate"
              accept=".pdf,.doc,.docx"
              onChange={catchdata}
              required
            />
          </div>

          {/* MBBS Degree */}
          <div
            className={`py-[2rem] ${
              isDark ? "text-white" : ""
            } flex justify-around items-center border-2 rounded-xl relative`}
            onMouseOver={() => handleMouseOver?.("MBBSDegree")}
            onMouseOut={handleMouseOut}
          >
            {hoveredField === "MBBSDegree" && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50 font-[500] opacity-70">
                Enter your MBBS Degree
                <span className="absolute -bottom-2 left-4 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-200"></span>
              </div>
            )}
            <label className="font-[500] w-[36%]" htmlFor="MBBSDegree">
              MBBS Degree
            </label>
            <input
              type="file"
              className="rounded-full border-2"
              name="MBBSDegree"
              accept=".pdf,.doc,.docx"
              onChange={catchdata}
              required
            />
          </div>

          {/* State Medical Council Registration */}
          <div
            className={`py-[2rem] ${
              isDark ? "text-white" : ""
            } flex justify-around items-center border-2 rounded-xl relative`}
            onMouseOver={() =>
              handleMouseOver?.("StateMedicalCouncilRegistration")
            }
            onMouseOut={handleMouseOut}
          >
            {hoveredField === "StateMedicalCouncilRegistration" && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50 font-[500] opacity-70">
                Enter your State Medical Council Registration Certificate
                <span className="absolute -bottom-2 left-4 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-200"></span>
              </div>
            )}
            <label
              className="font-[500] w-[36%]"
              htmlFor="StateMedicalCouncilRegistration"
            >
              State Medical Council Registration
            </label>
            <input
              type="file"
              className="rounded-full border-2"
              name="StateMedicalCouncilRegistration"
              accept=".pdf,.doc,.docx"
              onChange={catchdata}
              required
            />
          </div>
          <div className="w-full flex justify-center items-center h-9 my-3">
            <button
              className="border-2 w-[20%] h-8  bg-gradient-to-r from-blue-200 to-blue-400 rounded-full"
              type="submit"
            >
              <p className={`font-[500] flex justify-center items-center`}>
                submit
              </p>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <button onClick={handleToggleShow2}>
            {isDark ? (
              <IoArrowBackCircle size={35} color="white" />
            ) : (
              <IoArrowBackCircle size={35} color="black" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DocumentPageModel;
