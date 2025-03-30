import React, { useRef, useEffect, useState } from "react";
import { useAppDispatch } from "../../../Redux/Store/Store";
import { setscroll } from "../../../Redux/slices/Doctor.Redux";

interface incomingData {
  isDark?: boolean;
  patientData: Record<string, unknown>[];
  container: object;
  scrollLeft: any;
  childWidth: any;
  scroll: number;
  scrollx: number;
  IsInFocus: any;
  index: any;
}

const Patients: React.FC<incomingData> = ({
  isDark,
  patientData = [],
  scroll,
  index,
}) => {
  //******************Hooks************************/
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  //******************Hooks************************/

  //****************HANDLEFUNCTION****************/

  const scrollthrough = (indexValue) => {
    const container = containerRef.current;
    if (container) {
      const childWidth = container.offsetWidth / 2;
      container.scrollTo({
        left: indexValue * childWidth,
        behavior: "smooth",
      });
    }
  };
  //****************HANDLEFUNCTION****************/
  const lengthChaeck = patientData?.length > 1;

  return (
    <div
      className={`flex justify-center items-center h-[70vh]  ${isDark ? "bg-black" : "bg-white"
        } ${patientData?.length === 0 ? "hidden" : ""}`}
    >
      <div className=" rounded-md w-full mx-2 h-[60vh] flex flex-col  ">
        <div className="flex justify-center items-center ">
          <div className="flex justify-center items-center w-[80%]">
            <p className="font-[500] text-3xl my-3">{`${patientData?.length} Patients so far`}</p>
          </div>
        </div>

        <div className="flex justify-center items-center h-[40vh] ">
          {/***first elemnt start***/}
          <div
            className={`h-[40vh] tablet:w-[80%] desktop:w-[70%] flex  gap-5 p-5 rounded-lg ${patientData.length === 1 ? "justify-center " : ""
              } ${patientData.length > 2
                ? "overflow-x-auto custom-scrollbar scroll-smooth"
                : ""
              }`}
            ref={containerRef}
            onScroll={() => {
              const container = containerRef.current;
              if (!container) return;
              const scrollLeft = container.scrollLeft;
              const viewportHeight = window.innerHeight;
              const childWidth = Math.floor(viewportHeight * 0.4);
              const indexValue = Math.round(scrollLeft / childWidth);
              dispatch(
                setscroll({
                  scrollLeft,
                  viewportHeight,
                  childWidth,
                  indexValue,
                })
              );
            }}
          >
            {patientData.map(
              (patient: Record<string, unknown>, index: number) => {
                const elementPosition = index * 300;
                const IsInFocus = Math.abs(scroll - elementPosition) < 150;

                return (
                  <div
                    className={`flex flex-col justify-center items-center gap-6 transition-transform duration-300 ease-out  w-full ${patientData.length > 2
                      ? IsInFocus
                        ? "scale-100 opacity-100 blur-none"
                        : "scale-90 opacity-60 blur-sm"
                      : ""
                      }`}
                    key={String(patient._id)}
                    style={{
                      transform:
                        patientData.length > 2
                          ? IsInFocus
                            ? "scale(1.1)"
                            : "scale(0.9)"
                          : "",
                      opacity:
                        patientData.length > 2 ? (IsInFocus ? 1 : 0.6) : "",
                    }}
                  >
                    <div
                      className={`flex justify-center items-center desktop:h-[20vh] desktop:w-[46vh] rounded-3xl px-2 border-2  ${patientData?.length > 2
                        ? " h-[25vh] w-[46vh]"
                        : "h-[25vh] w-full"
                        }`}
                    >
                      {patient.profileImage ? (
                        <img
                          src={`${patient.profileImage}`}
                          alt="patient"
                          className=" desktop:w-[30%]  desktop:h-[14vh] border-2 tablet:h-[13vh] tablet:w-[38%] object-cover rounded-full"
                        />
                      ) : (
                        <div>
                          <p className="flex justify-center items-center">
                            No image
                          </p>
                        </div>
                      )}
                      <div className="flex justify-center flex-col items-center w-full h-[24.5vh] gap-5">
                        <p className="font-[500] text-sm">
                          Name: {(patient as any).name}
                        </p>
                        <p className="font-[500] text-sm">
                          Phone: {(patient as any).phone}
                        </p>
                        <p className="font-[500] text-sm">
                          Number:{" "}
                          {
                            (patient as any).appointmentStatus[0]?.patient[0]
                              .patientnumber
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          {/***first elemnt start***/}
        </div>
        {/***secondelemetn-start***/}
        <div
          className={`flex  flex-row justify-center items-center gap-1 w-full h-5 cursor-pointer
            ${lengthChaeck ? "hidden" : ""}`}
        >
          {patientData.map((item, indexed) => (
            <button
              key={indexed}
              onClick={() => scrollthrough(indexed)}
              className={`w-auto  ${indexed === index ? "scale-[200%] " : ""}`}
            >
              <div
                className={`border-2 rounded-full w-full ${isDark ? "border-white" : "border-black"
                  }`}
              ></div>
            </button>
          ))}
        </div>
        {/***secondelemetn-end***/}
      </div>
    </div>
  );
};

export default Patients;
