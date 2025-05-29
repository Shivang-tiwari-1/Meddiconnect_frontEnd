// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Component/Navbar";
import SignUp from "./Component/SignUp&Login/SignUp";
import Login from "./Component/SignUp&Login/Login";
import Layout from "./Component/Outlet/Layout";
import RequiredAuthPatinet from "./Component/RequiredAuth/PatientRequiredAuth";
import Patient from "./Component/AccountDetails/AccountDetails";
import FindDoctor from "./Component/Patient/Finddoctors/FindDocotr";
import Alert from "./Component/UtilityComponents/Alert.Utility";
import Home from "./Component/Home/Home";
import Notification from "./Component/Notofication/Notification";
import Prescripemedicine from "./Component/Doctor/Prescripemedicine";
import DocHome from "./Component/Doctor/DocHome";
import Notify from "./Component/UtilityComponents/Notify";
import All_patients from "./Component/Doctor/DocHomeComponents/All_patients/All_patients";
import FinalChatroom from "./Component/ChatRoom/FinalChatroom";
import MessageNotify from "./Component/UtilityComponents/MessageNotify";
import MobileChatRoom from "./Component/ChatRoom/MobileChatRoom";
import { AliveScope, KeepAlive } from "react-activation";
import AppointMent from "./Component/Patient/Appointment/AppointMent";
import useJwtInterceptors from "./Interceptors/useJwtInterceptors";
import PersistentLogin from "./persistentLogin/PersistentLogin";

function App() {
  useJwtInterceptors();
  const location = useLocation();
  return (
    <div className="">
      {location.pathname !== "" && <Navbar />}
      <Alert />
      <Notify />
      <MessageNotify />
      <AliveScope>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <KeepAlive>
                  <Home />
                </KeepAlive>
              }
            />
            {/* Public Routes */}
            <Route
              path="/signup"
              element={
                <KeepAlive>
                  <SignUp />
                </KeepAlive>
              }
            />
            <Route
              path="/login"
              element={
                <KeepAlive>
                  <Login />
                </KeepAlive>
              }
            />
            <Route element={<PersistentLogin />}>
              <Route
                path="/home"
                element={
                  <KeepAlive>
                    <Home />
                  </KeepAlive>
                }
              />

              <Route path="/account" element={<Patient />} />

              <Route path="/Notification" element={<Notification />} />

              <Route
                path="/FinalChatroom"
                element={
                  <KeepAlive>
                    <FinalChatroom />
                  </KeepAlive>
                }
              />
              <Route
                path="/MobileChatRoom"
                element={
                  <KeepAlive>
                    <MobileChatRoom />
                  </KeepAlive>
                }
              />

              {/* Doctor Routes */}
              <Route
                element={<RequiredAuthPatinet allowedRoles={["doctor"]} />}
              >
                <Route
                  path="/DocHome"
                  element={
                    <KeepAlive>
                      <DocHome />
                    </KeepAlive>
                  }
                />
                <Route
                  path="/prescripe"
                  element={
                    <KeepAlive>
                      <Prescripemedicine />
                    </KeepAlive>
                  }
                />
                <Route
                  path="/All_patients"
                  element={
                    <KeepAlive>
                      <All_patients />
                    </KeepAlive>
                  }
                />
                <Route
                  path="/FinalChatroom"
                  element={
                    <KeepAlive>
                      <FinalChatroom />
                    </KeepAlive>
                  }
                />
              </Route>
              {/* Patient Routes */}
              <Route
                element={<RequiredAuthPatinet allowedRoles={["patient"]} />}
              >
                <Route
                  path="/findDoctor"
                  element={
                    <KeepAlive>
                      <FindDoctor />
                    </KeepAlive>
                  }
                />
                <Route
                  path="/appointMent"
                  element={
                    <KeepAlive>
                      <AppointMent />
                    </KeepAlive>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AliveScope>
    </div>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
