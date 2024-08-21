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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
