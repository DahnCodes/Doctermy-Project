import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./Pages/Landingpage";
import Signuppage from "./Pages/Signuppage";
import Signinpage from "./Pages/Signinpage";
import Home from "./Pages/Home";
import "./App.css";
import Appointment from "./Pages/Appointment";
import Doctordashboard from "./Pages/Doctordashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/book" element={<Appointment />} />
          <Route path="/doctordashboard" element={<Doctordashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
