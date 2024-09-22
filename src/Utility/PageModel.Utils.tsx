import React from "react";

interface PatientData {
  address?: string;
  handleToggleShow3?: () => void;
}

const PageModel = (props: PatientData) => {
  const { address, handleToggleShow3 } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-md shadow-lg ">
          <p>{address}</p>
          <button onClick={handleToggleShow3} className="mt-4">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageModel;
