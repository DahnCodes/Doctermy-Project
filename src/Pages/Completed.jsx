import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Sidebar from "../Components/Sidebar";
import Headers from "../Components/Headers";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import "../Styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import Loaders from "../Components/Loader";
import { useSelector } from "react-redux";

const Completed = () => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
      statusCompleted();
    }
  }, [token]);

  const statusCompleted = async () => {
    setLoading(true);

    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Completed",
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

      setCompletedAppointments(appointments);
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
          ) : completedAppointments.length == 0 ? (
            <div className="pend-container">
              <div className="pends">
                <img src={emptybox} className="box" />
              </div>
              <p>No completed appointments</p>
            </div>
          ) : (
            <div className="pending-appointments-grid">
              {completedAppointments &&
                completedAppointments
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map((decline) => {
                    const startTime = new Date(decline.startTime);
                    const adjustedTime = new Date(
                      startTime.getTime() - 1 * 60 * 60 * 1000
                    );
                    const appointmentDate = new Date(decline.startTime);
                    const appointmentDay = new Date(decline.startTime);

                    return (
                      <div key={decline._id} className="pending-state">
                        <div className="pend-date">
                          <p>
                            {appointmentDay.toLocaleDateString("en-US", {
                              weekday: "long",
                            })}
                          </p>
                          <h3>
                            {appointmentDate.toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                            })}
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
                        <span className="vertical-linez"></span>
                        <div className="patient-type">
                          <h2>{decline.doctorName}</h2>
                          <p>{decline.type}</p>
                          <p>{decline.remark}</p>
                        </div>
                        <div className="patient-name2">
                          <FaCircleCheck className="closer" />
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

export default Completed;
