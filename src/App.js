import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Users from "./Pages/User/AllUsers";
import Admins from "./Pages/Admin/Admins";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Trips from "./Pages/Trips/Trips";
import Destinations from "./Pages/Destinations/Destinations";
import AdminDetails from "./Pages/Admin/AdminDetails";
import AddAdmin from "./Pages/Admin/AddAdmin";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SuperAdminCode from "./Pages/Auth/SuperAdminCode";
import VerifyCode from "./Pages/Auth/VerifyCode";
import SetNewPassword from "./Pages/Auth/SetNewPassword";
import AddUser from "./Pages/User/AddUser";
import UserDetails from "./Pages/User/UserDetails";
import Transactions from "./Pages/Transactions/Transactions";
import Attractions from "./Pages/Attractions/Attractions";
import Reservations from "./Pages/Reservations/Reservations";
import AddTrip from "./Pages/Trips/AddTrip";
import AddDestination from "./Pages/Destinations/adddestination";
import AddAttraction from "./Pages/Attractions/AddAttraction";
import DestinationDetails from "./Pages/Destinations/destinationDetails";
import TransactionRequests from "./Pages/Transactions/TransactionRequests";
import Requests from "./Pages/Requests";

export default function App() {
  return (
    <div style={{color: "white"}}>
      final test
      {/* <Router basename="/Voyago-Dashboard"> */}
        <Routes>
          <Route path="/Voyago-Dashboard/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/superadmincode" element={<SuperAdminCode />} />
          <Route path="/verifycode" element={<VerifyCode />} />
          <Route path="/setnewpassword" element={<SetNewPassword />} />
          {/* Protected Routes */}
          {/* <Route element={<PresistLogin/>}> */}
            {/* <Route element={<RequireAuth />}> */}
              <Route exact path="dashboard" element={<Dashboard />} />
              <Route path="admins" element={<Admins />} />
              <Route path="addadmin" element={<AddAdmin />} />
              <Route path="admins/:id" element={<AdminDetails />} />
              <Route path="users" element={<Users />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="trips" element={<Trips />} />
              <Route path="addtrip" element={<AddTrip />} />
              <Route path="attractions" element={<Attractions />} />
              <Route path="addattraction" element={<AddAttraction />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="adddestination" element={<AddDestination />} />
              <Route path="destinationdetails" element={<DestinationDetails />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="transactionrequests" element={<TransactionRequests />} />
              <Route path="requests" element={<Requests />} />
            {/* </Route> */}
          {/* </Route> */}
        </Routes>
      {/* </Router> */}
    </div>
  );
}
