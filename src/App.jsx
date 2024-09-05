import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./Pages/Landingpage";
import Signuppage from "./Pages/Signuppage";
import Signinpage from "./Pages/Signinpage";
import Home from "./Pages/Home";
import "./App.css";
import Doctordashboard from "./Pages/Doctordashboard";
import Bookappointment from "./Pages/Bookappointment";
import Pending from "./Pages/Pending";
import { Approved } from "./Pages/Approved";
import Declined from "./Pages/Declined";
import Completed from "./Pages/Completed";
import Doctorrequest from "./Pages/Doctorrequest";
import Doctorapprove from "./Pages/Doctorapprove";
import Doctordeclined from "./Pages/Doctordeclined";
import Doctorcompleted from "./Pages/Doctorcompleted";
import Doctorappointment from "./Pages/Doctorappointment";
import Admindashboard from "./Pages/Admindashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/bookappointment" element={<Bookappointment />} />
          <Route path="/doctordashboard" element={<Doctordashboard />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/approved" element={<Approved />} />
          <Route path="/declined" element={<Declined />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/requests" element={<Doctorrequest />} />
          <Route path="/doctorapproved" element={<Doctorapprove />} />
          <Route path="/doctordeclined" element={<Doctordeclined />} />
          <Route path="/doctorcompleted" element={<Doctorcompleted />} />
          <Route path="/appointment" element={<Doctorappointment />} />
          <Route path="/admin" element={<Admindashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
