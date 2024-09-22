import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHoverField,
  toggleShowPassword,
  toogleCongirmPassword,
  tooglePatientCheck,
  toogleTermAcdepted,
} from "../../Redux/slices/signup_login.";
import { signup } from "../../Redux/slices/signup_login.";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import Button from "../UtilityComponents/Button";
import { globalResizeFunction } from "../../Utility/resizer.Utils";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
    address: "",
    role: "",
    phone: "",
  });

  const { showPassword, termsAccepted, confirmPassword, mobile, hoveredField } =
    useAppSelector((state) => state.states);
  const dispatch = useAppDispatch();

  globalResizeFunction();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, files } = e.target;
    if (type === "file" && files) {
      setCredentials({ ...credentials, [name]: files[0] });
    } else setCredentials({ ...credentials, [name]: value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCredentials({ ...credentials, role: value });
    dispatch(tooglePatientCheck(value));
  };

  const handleCheckboxChange = () => {
    dispatch(toogleTermAcdepted());
  };

  const handleConfirmPasswordState = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(toogleCongirmPassword(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== credentials.password) {
      alert("Confirm password does not match");
      return;
    }
    if (!termsAccepted) {
      alert("You must accept the terms and conditions");
      return;
    }
    const formData = new FormData();
    Object.keys(credentials).forEach((key) => {
      if (credentials[key] !== null) {
        formData.append(key, credentials[key]);
      }
    });
    dispatch(signup(formData));
    setCredentials({
      name: "",
      email: "",
      password: "",
      profileImage: null,
      address: "",
      role: "",
      phone: "",
    });
  };

  const handleMouseOver = (fieldName: string) => {
    console.log(`Mouse over: ${fieldName}`);
    dispatch(setHoverField(fieldName));
  };

  const handleMouseOut = () => {
    dispatch(setHoverField(""));
  };

  return (
    <div
      className={`flex w-[100%] h-[${
        mobile ? "100vh" : "85vh"
      }] justify-center items-center bg-textWhite dark:bg-lightBlack`}
    >
      <div className="flex flex-col justify-center items-center mt-[2rem] dark:border-textWhite pb-[9rem] desktop:w-[40%] tablet:w-[90%]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex w-[80%] flex-col justify-center items-center h-[60vh] border-2 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row pb-5 gap-[1rem] ">
                <div className="w-1/2 relative ">
                  <select
                    name="role"
                    value={credentials.role}
                    onChange={handleRoleChange}
                    onMouseOver={() => handleMouseOver("role")}
                    onMouseOut={handleMouseOut}
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg"
                  >
                    <option value="">Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                  {hoveredField === "role" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Select your role
                    </div>
                  )}
                </div>

                <div className="w-1/2 relative">
                  <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    onMouseOver={() => handleMouseOver("profileImage")}
                    onMouseOut={handleMouseOut}
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg"
                    onChange={handleInputChange}
                  />
                  {hoveredField === "profileImage" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Upload your image
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row pb-5 gap-[1rem] ">
                <div className="w-1/2 relative">
                  <input
                    type="text"
                    placeholder="Name"
                    value={credentials.name}
                    name="name"
                    id="name"
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg"
                    onChange={handleInputChange}
                    onMouseOver={() => handleMouseOver("Name")}
                    onMouseOut={handleMouseOut}
                  />
                  {hoveredField === "Name" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Enter your Name
                    </div>
                  )}
                </div>
                <div className="w-1/2 relative">
                  <input
                    type="text"
                    placeholder="Email"
                    value={credentials.email}
                    name="email"
                    id="email"
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg"
                    onChange={handleInputChange}
                    onMouseOver={() => handleMouseOver("Email")}
                    onMouseOut={handleMouseOut}
                  />
                  {hoveredField === "Email" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Enter your Email
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col pb-5 relative">
                <input
                  type="text"
                  name="address"
                  value={credentials.address}
                  id="address"
                  placeholder="Address"
                  className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                  onChange={handleInputChange}
                  onMouseOver={() => handleMouseOver("Address")}
                  onMouseOut={handleMouseOut}
                />
                {hoveredField === "Address" && (
                  <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                    Enter your Address
                  </div>
                )}
              </div>

              <div className="flex flex-col pb-5 relative">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    id="password"
                    placeholder="Password"
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                    onChange={handleInputChange}
                    onMouseOver={() => handleMouseOver("Password")}
                    onMouseOut={handleMouseOut}
                  />
                  {hoveredField === "Password" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Enter your Password
                    </div>
                  )}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="focus:outline-none"
                      onClick={() => dispatch(toggleShowPassword())}
                    >
                      {credentials.password.length === 0
                        ? " "
                        : showPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </span>
                </div>
              </div>

              <div className="flex flex-col pb-5 relative">
                <input
                  type="tel"
                  name="phone"
                  value={credentials.phone}
                  id="phone"
                  placeholder="Phone"
                  className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                  onChange={handleInputChange}
                  onMouseOver={() => handleMouseOver("Phone")}
                  onMouseOut={handleMouseOut}
                />
                {hoveredField === "Phone" && (
                  <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                    Enter your Phone
                  </div>
                )}
              </div>

              <div className="flex flex-col pb-5 relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg"
                  onChange={handleConfirmPasswordState}
                  onMouseOver={() => handleMouseOver("Confirm Password")}
                  onMouseOut={handleMouseOut}
                />
                {hoveredField === "Confirm Password" && (
                  <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                    Confirm Password
                  </div>
                )}
              </div>

              <div className="flex space-x-2 justify-center">
                <label className="space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={termsAccepted}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-sm dark:text-textWhite">
                    I agree to all{" "}
                    <a href="#" className="text-primaryBlue">
                      terms & conditions
                    </a>
                  </span>
                </label>
              </div>

              <div className="flex justify-center items-center flex-col">
                <div className="font-[500] cursor-pointer dark:text-textWhite pt-8">
                  Already have an account?{" "}
                  <a href="#" className="text-primaryBlue">
                    Login
                  </a>
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <Button text="Submit" style="w-[50%]" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
