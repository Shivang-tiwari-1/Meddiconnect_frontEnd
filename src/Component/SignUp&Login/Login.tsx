import React, { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import {
  Credentials,
  login,
  setCredentials,
  toggleShowPassword,
} from "../../Redux/slices/signup_login.";
import Button from "../UtilityComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import { set_isActive } from "../../Redux/slices/Doctor.Redux";
import Loader from "../../Utility/loader/Loader";
import AuthContext from "../../Context/Auth/AuthContext";

const Login = React.memo(() => {
  const {
    showPassword,
    credentials,
    loading
  } = useAppSelector((state) => state.states);
  const { isDark } = useAppSelector((state) => state.stateChange);
  const { persist, setPersist } = useContext(AuthContext);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

            dispatch(set_isActive());
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

  const tooglePersist = () => {
    setPersist(prev => prev = !prev)
  }
  useEffect(() => {
    localStorage.setItem('persist', persist);
    console.log("useffect")
  }, [persist])



  return (
    <div
      className={` ${isDark ? "bg-lightBlack " : ""
        } flex w-[100%] h-[86vh] justify-center items-center   `}
    >
      {loading ? <Loader /> : <div className="flex flex-col justify-center items-center mt-[2rem]  pb-[9rem] desktop:w-[40%] tablet:w-[90%] mobile:w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex w-[80%] flex-col justify-center items-center h-[60vh] border-2 rounded-2xl shadow-2xl mobile:w-[90%]">
            <form className="w-[60%] mobile:w-[90%]" onSubmit={handleSubmit}>
              <div className="flex flex-row pb-5 gap-[1rem] relative">
                <div>
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
                </div>

              </div>

              <div className="flex flex-col pb-5 relative">
                <input
                  type="text"
                  name="email"
                  value={(credentials as Credentials)?.email}
                  id="email"
                  placeholder="Enter your Mail"
                  className="border border-primaryGrey rounded-lg h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                  onChange={handle_Input_Change}
                />

              </div>

              <div className="flex flex-col pb-5">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={(credentials as Credentials)?.password}
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
                      {(credentials as Credentials)?.password.length === 0
                        ? " "
                        : showPassword
                          ? "Hide"
                          : "Show"}
                    </button>
                  </span>
                </div>
              </div>

              <div className="mb-4 d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={persist}
                  onChange={tooglePersist}
                />
                <label className="form-check-label ms-2 me-auto" htmlFor="rememberMe">
                  Remember Me
                </label>
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
                  className={`font-[500] cursor-pointer pt-8 ${isDark ? "text-white" : ""
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
      </div>}

    </div>
  );
});

export default Login;
