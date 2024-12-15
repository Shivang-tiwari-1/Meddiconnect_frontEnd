import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  addMedication,
  deleteReducer,
  setMedication,
} from "../../Redux/slices/Doctor.Redux";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

// 'mobile': '375px',
// 'tablet': '601px',
// 'laptop': '1024px',
// 'desktop': '1280px',
const Prescripemedicine = () => {
  const formRef = useRef<HTMLDivElement | null>(null);
  //***************************AppSELECTORS******************************** */

  const { isDark } = useAppSelector((state) => state.stateChange);
  const { medications } = useAppSelector((state) => state.doctor);

  //***************************dispatch******************************** */

  const dispatch = useAppDispatch();

  //***************************functions******************************** */

  const generatePdf = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Name:", 14, 20);
    pdf.text("Sex:", 40, 20);
    pdf.text("Number:", 140, 20);
    pdf.text("Date:", 180, 20);

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 255);
    pdf.text("DIAGNOSIS:", 14, 35);
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 255);
    pdf.text("PRESCRIPTION", pdf.internal.pageSize.width / 2, 50, {
      align: "center",
    });

    pdf.autoTable({
      startY: 55,
      head: [["Medications", "Frequency", "Duration"]],
      body: medications?.flatMap((medication) => [
        [medication?.medication, medication?.frequency, medication?.duration],
        [
          {
            content: `Remarks: ${medication?.remark}`,
            colSpan: 3,
            styles: { textColor: [100, 100, 100] },
          },
        ],
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: { fontSize: 10 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 14 },
    });
    
    const pdfBlob = pdf.output("blob");

    pdf.save("prescription.pdf");
  };

  return (
    <div
      className={`flex justify-center items-center w-full h-[85vh] mobile:flex-col tablet:h-[90vh] mobile:h-[100vh] desktop:h-[85vh] ${
        isDark ? "bg-lightBlack text-white" : "bg-white text-black"
      } `}
    >
      <div
        className="flex flex-col border-2 h-[80vh] tablet:w-[80%] laptop:w-[80%] mobile:w-full desktop:w-[70%] rounded-lg"
        ref={formRef}
      >
        {/* First Section: Patient Details */}
        <div className="flex justify-around w-full px-3 py-3 h-[10vh] border-b">
          <div className="w-full flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <input
                type="text"
                placeholder="name"
                id="name"
                name="name"
                className={`text-sm rounded-md border-2 `}
              />

              <select
                className={`text-sm rounded-md border-2 ${
                  isDark ? "text-black" : ""
                }`}
              >
                <option value="">sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="tel"
                placeholder="number"
                name="number"
                id="number"
                className="text-sm rounded-md border-2"
              />
            </div>
            <div className="py-2 flex flex-col">
              <p className="text-blue-400 ">
                DIAGNOSIS:{" "}
                <input
                  type="text"
                  placeholder="Diagnosis"
                  className="rounded-md w-[77%] border-2"
                ></input>
              </p>
            </div>
          </div>

          <div className="flex gap-2 h-[4vh] ">
            <input
              className={`rounded-md w-[50%] border-2 ${
                isDark ? "text-black" : ""
              }`}
              placeholder="Date"
              type="date"
              id="date"
              name="date"
            ></input>
            <input
              type="time"
              placeholder="time"
              id="time"
              name="time"
              className={`border-2 rounded-md ${isDark ? "text-black" : ""}`}
            ></input>
          </div>
        </div>

        {/* Second Section: Prescription */}
        <div className="flex justify-center items-center h-[3vh]">
          <p className="text-lg font-bold text-blue-400">PRESCRIPTION</p>
        </div>
        {/* Second Section: Prescription */}

        {/* third Section */}
        <div className=" flex flex-col ">
          <div className="flex flex-row justify-around items-center">
            <p className="text-lg font-bold">Medications</p>
            <p className="text-lg font-bold">frequency</p>
            <p className="text-lg font-bold">Duration</p>
          </div>
          <div className="flex flex-col items-center py-4 border-2 h-[50vh] w-[80%] mx-auto px-3 overflow-y-scroll custom-scrollbar rounded-md tablet:w-[90%]">
            {medications?.map((med, index) => (
              <div className={`flex flex-col w-full `}>
                <div
                  key={index}
                  className={`flex justify-around w-full gap-4 mb-4`}
                >
                  <input
                    type="text"
                    value={med.medication}
                    onChange={(e) =>
                      dispatch(
                        setMedication({
                          index: index,
                          field: "medication",
                          value: e.target.value,
                        })
                      )
                    }
                    className={` ${
                      isDark ? "text-black" : ""
                    } rounded-md border-2 w-full`}
                    placeholder="Medication"
                  />
                  <input
                    type="text"
                    value={med.frequency}
                    onChange={(e) =>
                      dispatch(
                        setMedication({
                          index: index,
                          field: "frequency",
                          value: e.target.value,
                        })
                      )
                    }
                    className={` ${
                      isDark ? "text-black" : ""
                    } rounded-md border-2 w-full`}
                    placeholder="Frequency"
                  />
                  <input
                    type="text"
                    value={med.duration}
                    onChange={(e) =>
                      dispatch(
                        setMedication({
                          index: index,
                          field: "duration",
                          value: e.target.value,
                        })
                      )
                    }
                    className={` ${
                      isDark ? "text-black" : ""
                    } rounded-md border-2 w-full`}
                    placeholder="Duration"
                  />
                </div>
                <div className="flex justify-start py-1 w-full gap-4">
                  <p>Remarks:</p>
                  <input
                    placeholder="Remarks"
                    type="text"
                    onChange={(e) =>
                      dispatch(
                        setMedication({
                          index: index,
                          field: "remark",
                          value: e.target.value,
                        })
                      )
                    }
                    className={`${
                      isDark ? "text-black" : ""
                    } rounded-md border-2 w-[70%]`}
                  />
                </div>
              </div>
            ))}
            {/* <div className="flex justify-start mt-4 w-full">
              <p>Remarks:</p>
            </div> */}

            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => dispatch(addMedication())}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Medication
              </button>
              <button
                type="button"
                onClick={() => dispatch(deleteReducer())}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                delete Medication
              </button>
            </div>
          </div>
        </div>

        {/* third Section */}
        <button
          type="button"
          onClick={generatePdf}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Prescripemedicine;
