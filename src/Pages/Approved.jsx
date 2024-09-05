import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Sidebar from "../Components/Sidebar";
import Headers from "../Components/Headers";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import "../Styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";
import Loaders from "../Components/Loader";
import { useSelector } from "react-redux";

export const Approved = () => {
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
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
      statusApprove();
    }
  }, [token]);

  const statusApprove = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const appointments = result.data.data.map((appointment) => {
        return {
          ...appointment,
         doctorName: appointment.doctorId?.name || "Unknown", // Assuming patientId object contains the name
        };
      });

      setApprovedAppointments(appointments);
      setLoading(false);
      console.log(result.data.data);
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
         
        ):  approvedAppointments.length <= 0 ? (
            <>
              <div className="pend-container">
                <div className="pends">
                  <img src={emptybox} className="box" />
                </div>
                <p>No approved appointments</p>
              </div>
            </>
          ) : (
            <div className="pending-appointments-grid">
              {approvedAppointments &&
                approvedAppointments
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((approve) => {
                  const startTime = new Date(approve.startTime);
                  const adjustedTime = new Date(
                    startTime.getTime() - 1 * 60 * 60 * 1000
                  );
                  const appointmentDate = new Date(approve.startTime);
                  const appointmentDay = new Date(approve.startTime);

                  return (
                    <div key={approve._id} className="pending-state">
                      <div className="pend-date">
                        <p>
                          {appointmentDay.toLocaleDateString(
                            "en-US",
                            { weekday: "long" }
                          )}
                        </p>
                        <h3>
                          {appointmentDate.toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short" }
                          )}
                        </h3>
                        <p>
                          {adjustedTime.toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: true,
                            }
                          )}
                        </p>
                      </div>
                      <span className="vertical-line"></span>
                      <div className="patient-type2">
                        <h2>{approve.doctorName}</h2>
                        <p>{approve.type}</p>
                      </div>
                      {/* <div className="patient-name">
                                <p>Approved</p>
                              </div> */}
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
