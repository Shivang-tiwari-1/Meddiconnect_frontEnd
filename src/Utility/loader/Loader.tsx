import React from "react";
import './Loader.css'; // Make sure to create this file or use inline styles
import { useAppSelector } from "../../Redux/Store/Store";

const Loader = () => {
  const isDark = useAppSelector((state) => state.stateChange.isDark);

  return (
    !isDark ? <div className={`loader-container `}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="loader">
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".8" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0.05"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".6" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".1"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".4" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".15"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".2" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".2"
          ></animate>
        </circle>
      </svg>
    </div> : <div className={`loader-container-2 `}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="loader">
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".8" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0.05"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".6" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".1"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".4" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".15"
          ></animate>
        </circle>
        <circle fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="2" opacity=".2" r="15" cx="35" cy="100">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".2"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
