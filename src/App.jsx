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

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "" && <Navbar />}
      <Alert />
      <Notify />
      <MessageNotify />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Patient />} /> v
          <Route path="/Notification" element={<Notification />} />
          <Route path="/FinalChatroom" element={<FinalChatroom />} />
          {/* Doctor Routes */}
          <Route element={<RequiredAuthPatinet allowedRoles={["doctor"]} />}>
            <Route path="/DocHome" element={<DocHome />} />
            <Route path="/prescripe" element={<Prescripemedicine />} />
            <Route path="/All_patients" element={<All_patients />} />
            <Route path="/FinalChatroom" element={<FinalChatroom />} />
          </Route>
          {/* Patient Routes */}
          <Route element={<RequiredAuthPatinet allowedRoles={["patient"]} />}>
            <Route path="/findDoctor" element={<FindDoctor />} />
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
