// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import FinalChatroom from "./Component/ChatRoom/FinalChatroom";
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

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "" && <Navbar />}
      <Alert />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*********  public routes************ */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/*************doctor route************/}
          <Route
            element={<RequiredAuthPatinet allowedRoles={["doctor"]} />}
          ></Route>
          {/******patient route*******************/}
          <Route element={<RequiredAuthPatinet allowedRoles={["patient"]} />}>
            <Route path="/findDoctor" element={<FindDoctor />} />
            <Route path="/account" element={<Patient />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/chat" element={<FinalChatroom />} />
          </Route>
        </Route>
      </Routes>
    </>
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
