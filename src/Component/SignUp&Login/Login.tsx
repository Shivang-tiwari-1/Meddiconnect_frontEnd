import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  login,
  set_hashed_id,
  setCredentials,
  setHoverField,
  toggleShowPassword,
  tooglePatientCheck,
} from "../../Redux/slices/signup_login.";
import Button from "../UtilityComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import { hashData } from "../../Hashing/hashing";

const Login = () => {
  const navigate = useNavigate();

  //**************************APPSELECTOR****************/
  const {
    showPassword,
    mobile,
    credentials,
    hoveredField,
    role,
    userData,
    hashedData,
    doc_accessToken,
    pat_accessToken,
  } = useAppSelector((state) => state.states);
  const { isDark } = useAppSelector((state) => state.stateChange);
  //*************************DISPATCH********************/
  const dispatch = useAppDispatch();

  //***************************HANDLEFUNCTION**************/
  const handle_Input_Change = (e: any) => {
    const { value, name } = e.target;

    dispatch(
      setCredentials({ field: name as keyof typeof credentials, value })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      login({
        email: credentials?.email,
        password: credentials?.password,
        role: credentials?.role,
      })
    ).then((action) => {
      if (action.type === "user/login/fulfilled") {
        setTimeout(() => {
          if (credentials?.role === "doctor") {
            navigate("/DocHome", { replace: true });
          } else if (credentials?.role === "patient") {
            navigate(`/home`, { replace: true });
          }
        }, 100);
      }
    });

    dispatch(
      setCredentials({
        field: "email",
        value: "",
      })
    );
    dispatch(
      setCredentials({
        field: "password",
        value: "",
      })
    );
    dispatch(
      setCredentials({
        field: "role",
        value: "",
      })
    );
  };

  const handleMouseOver = (fieldName: string) => {
    dispatch(setHoverField(fieldName));
  };

  const handleMouseOut = () => {
    dispatch(setHoverField(""));
  };

  useEffect(() => {
    if (userData?.data?.role === "patient") {
      const fetchData = async () => {
        const hashing = await hashData(userData?.data?._id.toString());
        dispatch(set_hashed_id(hashing));
      };
      fetchData();
    }
  }, [dispatch]);

  return (
    <div
      className={` ${
        isDark ? "bg-lightBlack " : ""
      } flex w-[100%]  h-[85vh] justify-center items-center   `}
    >
      <div className="flex flex-col justify-center items-center mt-[2rem]  pb-[9rem] desktop:w-[40%] tablet:w-[90%]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex w-[80%] flex-col justify-center items-center h-[60vh] border-2 rounded-2xl shadow-2xl">
            <form className="w-[60%]" onSubmit={handleSubmit}>
              <div className="flex flex-row pb-5 gap-[1rem] relative">
                <div>
                  <select
                    name="role"
                    value={credentials?.role}
                    onMouseOver={() => handleMouseOver("role")}
                    onMouseOut={handleMouseOut}
                    onChange={handle_Input_Change}
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg"
                  >
                    <option value="">Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
                {hoveredField === "role" && (
                  <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                    Select your role
                  </div>
                )}
              </div>

              <div className="flex flex-col pb-5 relative">
                <input
                  type="text"
                  name="email"
                  value={credentials?.email}
                  id="email"
                  placeholder="Enter your Mail"
                  className="border border-primaryGrey rounded-lg h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                  onMouseOver={() => handleMouseOver("email")}
                  onMouseOut={handleMouseOut}
                  onChange={handle_Input_Change}
                />
                {hoveredField === "email" && (
                  <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                    Enter your email
                  </div>
                )}
              </div>

              <div className="flex flex-col pb-5">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials?.password}
                    id="password"
                    onMouseOver={() => handleMouseOver("password")}
                    onMouseOut={handleMouseOut}
                    placeholder="Enter your Password"
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                    onChange={handle_Input_Change}
                  />
                  {hoveredField === "password" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50 ">
                      Enter your password
                    </div>
                  )}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="focus:outline-none"
                      onClick={() => dispatch(toggleShowPassword())}
                    >
                      {credentials?.password.length === 0
                        ? " "
                        : showPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="font-[500] cursor-pointer">
                  <a href="#" className="text-primaryBlue">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="flex justify-center items-center flex-col">
                <div
                  className={`font-[500] cursor-pointer pt-8 ${
                    isDark ? "text-white" : ""
                  }`}
                >
                  create your{" "}
                  <Link to="#" className="text-primaryBlue">
                    account
                  </Link>
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <Button text="Login" style="w-[50%]" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
