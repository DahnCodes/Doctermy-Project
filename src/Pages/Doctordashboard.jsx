import Dashboardnavigation from "../Components/Dashboardnavigation";

import "../Styles/Doctor.css";
import "../Styles/Home.css";
import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Doctorsidebar from "../Components/Doctorsidebar";
import Declinemodal from "../Components/Declinemodal";
import Requestmodal from "../Components/Requestmodal";
import { useSelector } from "react-redux";

const Doctordashboard = () => {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [requestAppointments, setRequestAppointments] = useState([]);
  const [requestMessage, setRequestMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [actionResult, setActionResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const userx = useSelector((state) => state.user);

  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  
  useEffect(() => {
    if (!userx) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      statusApproved();
    }
  });
  const statusApproved = async () => {
    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Approved",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointmentCount(result.data.data.length);
      setApprovedAppointments(result.data.data);

      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };

  const toggleViewAll = () => setShowAll(!showAll);

  const displayedAppointments = showAll
    ? approvedAppointments
    : approvedAppointments.slice(0, 3);

  const handleClosedModal = () => {
    setShowRequestModal(false); // Close the modal
  };
  const statusFetch = async () => {
    setLoading(true);

    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const appointments = result.data.data.map((appointment) => {
        return {
          ...appointment,
          patientName: appointment.patientId?.name || "Unknown", // Assuming patientId object contains the name
        };
      });

      setRequestAppointments(appointments);
      setLoading(false);

      console.log(result.data.data);
    } catch (error) {
      console.error("Error fetching status", error);
      setLoading(false);
    }
  };
  const handleAccept = async (_id) => {
    try {
      const result = await axios.patch(
        `https://doctermy.onrender.com/api/v1/appointment/update-status?_id=${_id}`,
        { status: "Approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      statusFetch();
      setActionResult(`Accepted appointment with ID: ${_id}`);
      console.log(result.data.data);
      setRequestMessage("Request Accepted!");
      setShowRequestModal(true); // Trigger the modal after successful request
    } catch (error) {
      console.error("Error updating appointment status", error);
    }
  };

  const handleDeclineClick = (_id) => {
    setSelectedAppointmentId(_id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeclineSubmit = async (_id, remark) => {
    try {
      const result = await axios.patch(
        `https://doctermy.onrender.com/api/v1/appointment/update-status?_id=${_id}`,
        { status: "Declined", remark: remark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      statusFetch();
      setActionResult(`Declined appointment with ID: ${_id}`);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error updating appointment status", error);
    }
  };

  return (
    <>
      <Dashboardnavigation />
      <div className="grid-king">
        <Doctorsidebar />
        <div className="second-item">
          <div className="welcome-texts">
            <h4>Welcome, {userx ? userx.user.name : ""}</h4>
            <p>
              You have{" "}
              <span className="spans">{appointmentCount} appointments</span> for
              today
            </p>
          </div>

          <div className="upcoming">
            <h3>Upcoming Appointments</h3>
            <hr className="hrz" />
          </div>

          {approvedAppointments.length === 0 ? (
            <div className="pend-container">
              <p>No upcoming appointments</p>
            </div>
          ) : (
            <>
              <div className="approve-appointments-grid">
                {approvedAppointments &&
                  displayedAppointments.map((approve) => {
                    return (
                      <div key={approve._id} className="pending-state2">
                        <div className="pend-date">
                          <p>
                            {new Date(approve.updatedAt).toLocaleDateString(
                              "en-US",
                              { weekday: "long" }
                            )}
                          </p>
                          <h3>
                            {new Date(approve.updatedAt).toLocaleDateString(
                              "en-US",
                              { day: "numeric", month: "short" }
                            )}
                          </h3>
                          <p>
                            {new Date(approve.startTime).toLocaleTimeString(
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
                        <span className="vertical-linez"></span>
                        <div className="patient-type2">
                          <h2>{userx ? userx.user.name : ""}</h2>
                          <p>{approve.type}</p>
                        </div>
                        {/* <div className="patient-name">
                              <p>Approved</p>
                            </div> */}
                      </div>
                    );
                  })}
              </div>
              {approvedAppointments.length > 1 && (
                <button className="view-all-btn2" onClick={toggleViewAll}>
                  {showAll ? "Show Less" : "View All"}
                </button>
              )}
            </>
          )}
          <div className="upcoming">
            <p>Recent Appointments</p>
            <hr className="hrz" />
            {recentAppointments.length === 0 ? (
              <>
                <div className="pend-container">
                  <div className="pends">
                    {/* <img src={emptybox} className="box" /> */}
                  </div>
                  <p>No recent appointments</p>
                </div>
              </>
            ) : (
              <>
                <div className="pending-appointments-grid">
                  {requestAppointments &&
                    requestAppointments
                      .sort(
                        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                      )
                      .map((appointment) => {
                        const startTime = new Date(appointment.startTime);
                        const adjustedTime = new Date(
                          startTime.getTime() - 1 * 60 * 60 * 1000
                        );
                        const appointmentDate = new Date(appointment.startTime);
                        const appointmentDay = new Date(appointment.startTime);

                        return (
                          <div key={appointment._id} className="pending-state">
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
                                  hour12: true,
                                })}
                              </p>
                            </div>
                            <span className="vertical-line1"></span>
                            <div className="patient-type">
                              <h2>{appointment.patientName}</h2>
                              <p>{appointment.type}</p>
                            </div>
                            <div className="patient-status">
                              <button
                                className="btn7"
                                onClick={() => handleAccept(appointment._id)}
                              >
                                Accept
                              </button>
                              <button
                                className="btn8"
                                onClick={() =>
                                  handleDeclineClick(appointment._id)
                                }
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  <div>
                    {showRequestModal && (
                      <Requestmodal
                        _id={selectedAppointmentId}
                        requestMessage={requestMessage}
                        onClose={handleClosedModal}
                      />
                    )}
                  </div>
                  {isModalOpen && (
                    <Declinemodal
                      _id={selectedAppointmentId}
                      onClose={handleCloseModal}
                      onSubmit={handleDeclineSubmit}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctordashboard;
