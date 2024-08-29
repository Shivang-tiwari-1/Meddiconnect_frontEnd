import React from "react";
import Doctors from "../Component/Patient/Finddoctors/Doctors";

interface PatientData {
  address?: string;
  toggleShow?: () => void;
  Appointmenthistory?: string[];
}

const PageModel = (props: PatientData) => {
  const { address, toggleShow, Appointmenthistory = [] } = props;
  console.log("appoinyment-?", Appointmenthistory);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="max-w-md w-full">
        {Appointmenthistory.length === 0 ? (
          <div className="bg-white p-8 rounded-md shadow-lg ">
            <p>{address}</p>
            <button onClick={toggleShow} className="mt-4">
              Close
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-[70%] h-[60vh] desktop:w-[55%] desktop:grid desktop:grid-row-4">
            {Appointmenthistory.map((Appointmenthistory) => (
              <Doctors
                key={Appointmenthistory?._id}
                name={Appointmenthistory?.name}
                availability={Appointmenthistory?.availability}
                profileImage={Appointmenthistory?.profileImage}
                role={Appointmenthistory?.role}
              />
            ))}
            <button onClick={toggleShow} className="mt-4">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageModel;
