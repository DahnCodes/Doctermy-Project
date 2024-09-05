import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Doctorsidebar from "../Components/Doctorsidebar";
import Doctorheader from "../Components/Doctorheader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loaders from "../Components/Loader";
import Completedmodal from "../Components/Completedmodal";
import { useSelector } from "react-redux";
 // Import the modal component

const Doctorapprove = () => {
  const [doctorApprovedAppointments, setDoctorApprovedAppointments] = useState([]);
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [actionResult, setActionResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

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
          patientName: appointment.patientId?.name || "Unknown", // Assuming patientId object contains the name
        };
      });
      setDoctorApprovedAppointments(appointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching status", error);
      setLoading(false);
    }
  };

  const handleCompleted = async (_id) => {
    try {
      const res = await axios.patch(
        `https://doctermy.onrender.com/api/v1/appointment/update-status?_id=${_id}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActionResult(`Completed appointment with ID: ${_id}`);
      setIsModalOpen(true); // Open the modal on successful completion
    } catch (error) {
      console.error("Error updating appointment status", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <Dashboardnavigation />
      <div className="grid-king">
        <Doctorsidebar />
        <div className="requested-container">
          <Doctorheader />
          {loading ? (
            <div className="spinner-container">
              <Loaders />
            </div>
          ) : doctorApprovedAppointments && doctorApprovedAppointments.length === 0 ? (
            <div className="pend-container">
              <div className="pends">
                <img src={emptybox} className="box" />
              </div>
              <p>No approved appointments</p>
            </div>
          ) : (
            <div className="pending-appointments-grid">
              {doctorApprovedAppointments &&
                doctorApprovedAppointments
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
                            {adjustedTime.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </p>
                        </div>
                        <span className="vertical-line3"></span>
                        <div className="patient-type">
                          <h2>{approve.patientName}</h2>
                          <p>{approve.type}</p>
                        </div>
                        <div className="patient-name2">
                          <button
                            className="btn9"
                            onClick={() => handleCompleted(approve._id)}
                          >
                            Complete
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <Completedmodal onClose={closeModal} />}
    </>
  );
};

export default Doctorapprove;
