import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  login,
  setCredentials,
  setHoverField,
  toggleShowPassword,
  tooglePatientCheck,
} from "../../Redux/slices/signup_login.";
import Button from "../UtilityComponents/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //*********************states*********************** */
  const navigate = useNavigate();
  // const [credentials, setCredentials] = useState({
  //   email: "",
  //   password: "",
  //   role: "",
  // });

  //**************************APPSELECTOR****************/
  const { showPassword, mobile, credentials, hoveredField } = useAppSelector(
    (state) => state.states
  );

  //*************************DISPATCH********************/
  const dispatch = useAppDispatch();

  //***************************HANDLEFUNCTION**************/
  const handle_Input_Change = (e: any) => {
    const { value, name } = e.target;

    dispatch(
      setCredentials({ field: name as keyof typeof credentials, value })
    );
    console.log(credentials);
  };

  // const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setCredentials({ ...credentials, [name]: value });
  //   dispatch(tooglePatientCheck(value));
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      login({
        email: credentials?.email,
        password: credentials?.password,
        role: credentials?.role,
      })
    ).then((action) => {
      if (action.type === "user/login/fulfilled") {
        navigate("/home", { replace: true });
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

  return (
    <div className="  flex w-[100%]  h-[85vh] justify-center items-center  bg-textWhite dark:bg-lightBlack ">
      {!mobile ? (
        <div className="flex flex-col justify-center items-center mt-[2rem]  dark:border-textWhite pb-[9rem] desktop:w-[40%] tablet:w-[90%]">
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
                  <div className="font-[500] cursor-pointer dark:text-textWhite pt-8">
                    create your{" "}
                    <a href="#" className="text-primaryBlue">
                      account
                    </a>
                  </div>
                </div>

                <div className="flex justify-center mt-3">
                  <Button text="Login" style="w-[50%]" />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-[2rem]  dark:border-textWhite pb-[9rem] desktop:w-[40%] tablet:w-[90%] w-full">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex w-[80%] flex-col justify-center items-center h-[60vh]">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row pb-5 gap-[1rem]">
                  <label>
                    Role:
                    <select
                      name="role"
                      value={credentials?.role}
                      onChange={handle_Input_Change}
                      className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg"
                    >
                      <option value="">Select Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="patient">Patient</option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-col pb-5 ">
                  <div className="relative">
                    <input
                      type="text"
                      name="email"
                      value={credentials?.email}
                      id="email"
                      placeholder="Enter your Mail"
                      className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                      onChange={handle_Input_Change}
                    />
                  </div>
                </div>

                <div className="flex flex-col pb-5">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={credentials?.password}
                      id="password"
                      placeholder="Enter your Password"
                      className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                      onChange={handle_Input_Change}
                    />
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
                  <div className="font-[500] cursor-pointer dark:text-textWhite pt-8">
                    create your{" "}
                    <a href="#" className="text-primaryBlue">
                      account
                    </a>
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <Button text="Login" style="w-[50%]" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
