import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Sidebar from "../Components/Sidebar";
import Headers from "../Components/Headers";
import "../Styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loaders from "../Components/Loader";
import moment from "moment"; // Import moment.js
import { useSelector } from "react-redux";

const Pending = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const userx = useSelector((state) => state.user);

  
  const token = useSelector((state) => state.user.token);


  useEffect(() => {

    if (!token) {

      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {

    if (!userx) {
  
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      statusPending();
    }
  }, [token]);

  const statusPending = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const appointments = result.data.data.map((appointment) => {
        console.log(appointment);
        return {
          ...appointment,
          doctorName: appointment.doctorId?.name || "Unknown", // Assuming patientId object contains the name
        };
      });

      setPendingAppointments(appointments);
      setLoading(false);
    } catch (error) {
      console.error("error fetching status", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Dashboardnavigation />
      <div className="grid-container">
        <Sidebar />
        <div className="penders-container">
          <Headers />
          {loading ? (
            <div className="spinner-container">
              <Loaders /> {/* Display spinner while loading */}
            </div>
          ) : pendingAppointments.length === 0 ? (
            <>
              <div className="pend-container">
                <div className="pends">
                  <img src={emptybox} className="box" alt="Empty box" />
                </div>
                <p>No pending appointments</p>
              </div>
            </>
          ) : (
            <div className="pending-appointments-grid">
              {pendingAppointments &&
                pendingAppointments
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map((appointment) => {
                    const startTime = moment.utc(appointment.startTime);
                    const appointmentDate = startTime.format("D MMM"); // Format date
                    const appointmentDay = startTime.format("dddd"); // Format day
                    const appointmentTime = startTime.format("h:mm A"); // Format time
                    console.log(appointmentTime);

                    return (
                      <div key={appointment._id} className="pending-state">
                        <div className="pend-date">
                          <p>{appointmentDay}</p>
                          <h3>{appointmentDate}</h3>
                          <p>{appointmentTime}</p>
                        </div>
                        <span className="vertical-line3"></span>
                        <div className="patient-type">
                          <h2>{appointment.doctorName}</h2>
                          <p>{appointment.type}</p>
                        </div>
                        <div className="patient-name">
                          <div className="namep">
                            <p>Pending</p>
                          </div>
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
