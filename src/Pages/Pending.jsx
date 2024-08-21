import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Sidebar from "../Components/Sidebar";
import Headers from "../Components/Headers";
import "../Styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pending = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
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


  useEffect(() => {
    if (token) {
      statusPending();
    }
   
  }, [token]);

  const statusPending = async () => {
    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingAppointments(result.data.data);

      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };

  return (
    <>
      <Dashboardnavigation />
      <div className="grid-container">
        <Sidebar />
<div className="penders-container">
        <Headers />

        {pendingAppointments.length === 0 ? (
          <>
            <div className="pend-container">
              <div className="pends">
                <img src={emptybox} className="box" />
              </div>
              <p>No pending appointments</p>
            </div>
          </>
        ) : (
          <div className="pending-appointments-grid">
            {pendingAppointments &&
              pendingAppointments.map((appointment) => {
                const startTime = new Date(appointment.startTime);
                const adjustedTime = new Date(
                  startTime.getTime() - 1 * 60 * 60 * 1000
                );
                return (
                  <div key={appointment._id} className="pending-state">
                    <div className="pend-date">
                      <p>
                        {new Date(appointment.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                          }
                        )}
                      </p>
                      <h3>
                        {new Date(appointment.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </h3>
                      <p>
                        {adjustedTime.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        })}
                      </p>
                    </div>
                    <span className="vertical-line"></span>
                    <div className="patient-type">
                      <h2>{user ? user.name : ""}</h2>
                      <p>{appointment.type}</p>
                    </div>
                    <div className="patient-name">
                      <p>Pending</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
</div>
        
        </div>
    </>
  );
};

export default Pending;
