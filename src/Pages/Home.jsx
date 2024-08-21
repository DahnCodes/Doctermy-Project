import "../Styles/Home.css";
import { useEffect, useState } from "react";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import { FaLocationDot } from "react-icons/fa6";

import billboard from "../assets/billboard.jpg";

import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const myToken = localStorage.getItem("myToken");

    if (myToken) {
      setToken(JSON.parse(myToken));
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const bookNow = () => {
    navigate("/bookappointment");
  };

  return (
    <>
      <Dashboardnavigation />
      <div className="grid-container">
        <Sidebar />
        <div className="item2">
          <div className="container">
            <div className="welcome">
              <h4>Welcome, {user ? user.name : ""} </h4>
              <p>
                You have <span className="spans">4 appointments</span> today
              </p>
            </div>
            <div className="needs">
              <p>Need an appointment?</p>
              <button className="btn4" onClick={bookNow}>
                Book Now
              </button>
            </div>
            <div className="item3">
              <div className="card">
                <img src={billboard} className="hospital" />
                <div className="cards-location">
                  <h4>Sundune Memorial Hospital</h4>

                  <p>Enugu, Enugu State</p>
                </div>
              </div>
            </div>
          </div>

          <div className="main-text">
            <h3>Upcoming Appointments</h3>

            <hr className="hr" />
            <div className="details"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
