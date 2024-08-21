import { TbCalendarClock } from "react-icons/tb";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import { GoHomeFill } from "react-icons/go";
import emptybox from "../assets/emptybox.png";

import "../Styles/Doctor.css";
import { useEffect, useState } from "react";
import { SlUser } from "react-icons/sl";
import axios from "axios";
// import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Declinemodal from "../Components/Declinemodal";
import { IoIosCloseCircle } from "react-icons/io";
import Requestmodal from "../Components/Requestmodal";

const Doctordashboard = () => {
  const [color, setColor] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [bookAppointments, setBookAppointments] = useState([]);
  // const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [requestAppointments, setRequestAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [declinedAppointments, setDeclinedAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState({});
  const [actionResult, setActionResult] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const navigate = useNavigate();

  const handleClosedModal = (_id) => {
    setSelectedAppointmentId(_id);
    setShowRequestModal(false);
    setRequestMessage("Request Accepeted!"); // Clear the message if needed
  };

  useEffect(() => {
    const myToken = localStorage.getItem("myToken");

    if (myToken) {
      setToken(JSON.parse(myToken));
    } else {
      navigate("/signin");
    }
  }, []);
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/signin");
    }
  }, []);
  const handleIconClick = () => {
    //     setColor((prevColor) => (prevColor === "#00B4D8" ? "#858585" : "#00B4D8"));
    setSelectedComponent("home");
  };

  const appointment = () => {
    // setAnotherColor((prevColor) => (prevColor === "#858585" ? "#00B4D8" : "#858585"));
    setSelectedComponent("appointment");
  };

  const patients = () => {
    setSelectedComponent("patients");
  };

  const requests = () => {
    setSelectedComponent("requests");
  };

  const approved = () => {
    setSelectedComponent("approved");
  };

  const declined = () => {
    setSelectedComponent("declined");
  };

  const completed = () => {
    setSelectedComponent("completed");
  };

  useEffect(() => {
    if (token) {
      statusFetch();
    }
  }, [token]);

  const statusFetch = async () => {
    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestAppointments(result.data.data);

      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };
  const handleAccept = async (_id) => {
    setShowRequestModal(false);
    try {
      const result = await axios.patch(
        `https://doctermy.onrender.com/api/v1/appointment/update-status?_id=${_id}`,
        { status: "Approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        // {appointmentId},
        //  {appointmentType},
      );
      statusFetch();
      // setRequestAppointments(result.data.data);
      setActionResult(`Accepted appointment with ID: ${_id}`);
      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }finally{
      setShowRequestModal(true)
    }
  };

  useEffect(() => {
    if (token) {
      statusApproved();
    }
  }, [token]);
  const statusApproved = async () => {
    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApprovedAppointments(result.data.data);

      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };

  const handleDeclineClick = (_id) => {
    setSelectedAppointmentId(_id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setSelectedAppointmentId(null);
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
        // {appointmentId},
        //  {appointmentType},
      );
      statusFetch();
      // setRequestAppointments(result.data.data);
      setActionResult(`Declined appointment with ID: ${_id}`);
      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };
  useEffect(() => {
    if (token) {
      statusDecline();
    }
  }, [token]);
  const statusDecline = async () => {
    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Declined",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeclinedAppointments(result.data.data);

      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };

  const handleCompleted = async (_id) => {
    try {
      // const idString = Array.isArray(_id) ? _id[0] : _id;
      const result = await axios.patch(
        `https://doctermy.onrender.com/api/v1/appointment/update-status?_id=${_id}`,
        {status: "Completed"},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
        // {appointmentId},
        //  {appointmentType},
      );
      // console.log(result._id);
      // statusApproved();
      // setCompletedAppointments(result.data.data);
      setActionResult(`Completed appointment with ID: ${_id}`);
      console.log(result.data.data._id);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };
  // const user = localStorage.getItem("user");
  return (
    <>
      <Dashboardnavigation />
      <main>
        <div className="grid-king">
          <div className="first-item">
            <div className="item-menus">
              <div
                style={{ color: color, cursor: "pointer" }}
                onClick={handleIconClick}
                className={`home ${
                  selectedComponent === "home" ? "active" : ""
                }`}
              >
                <GoHomeFill className="home" />
                <p>Home</p>
              </div>

              <div
                style={{ anothercolor: color, cursor: "pointer" }}
                onClick={appointment}
                className={`calendar ${
                  selectedComponent === "appointment" ? "active" : ""
                }`}
              >
                <TbCalendarClock className="calendar" />
                <p>Appointments</p>
              </div>
              <div
                style={{ anothercolor: color, cursor: "pointer" }}
                onClick={patients}
                className={`calendar ${
                  selectedComponent === "patients" ? "active" : ""
                }`}
              >
                <SlUser className="calendar" />
                <p>Patients</p>
              </div>
            </div>
          </div>
          <div className="second-item">
            {selectedComponent === "home" && (
              <>
                <div className="welcome-texts">
                  <h4>Welcome, {user ? user.name : ""}</h4>
                  <p>
                    You have <span className="spans">0 appointments</span> for
                    today
                  </p>
                </div>

                <div className="upcoming">
                  <h3>Upcoming Appointments</h3>

                  <hr className="hrz" />
                  {approvedAppointments.length === 0 ? (
                  <>
                    <div className="pend-container">
                      <p>No upcoming appointments</p>
                    </div>
                  </>
                ) : (
                  <div className="pending-appointments-grid">
                  {approvedAppointments &&
                    approvedAppointments.map((approve) => {
                      const startTime = new Date(appointment.startTime);
                      const adjustedTime = new Date(
                        startTime.getTime() - 1 * 60 * 60 * 1000
                      );
                      return (
                        <div key={approve._id} className="pending-state">
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
                          <span className="vertical-line3"></span>
                          <div className="patient-type2">
                            <h2>{user ? user.name : ""}</h2>
                            <p>{approve.type}</p>
                          </div>
                          {/* <div className="patient-name2">
                            <button className="btn9" onClick={handleCompleted}>Complete</button>
                          </div> */}
                        </div>
                      );
                    })}
                </div>
                )}
                </div>
              </>
            )}

            {selectedComponent === "appointment" && (
              <>
                <div className="app-head">
                  <p
                    className={`stats ${
                      selectedComponent === "appointment" ? "active" : ""
                    }`}
                    onClick={appointment}
                  >
                    Book Appointment
                  </p>
                  <p
                    onClick={requests}
                    className={`stats ${
                      selectedComponent === "pending" ? "active" : ""
                    }`}
                  >
                    Requests
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "approved" ? "active" : ""
                    }`}
                    onClick={approved}
                  >
                    Approved
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "declined" ? "active" : ""
                    }`}
                    onClick={declined}
                  >
                    Declined
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "completed" ? "active" : ""
                    }`}
                    onClick={completed}
                  >
                    Completed
                  </p>
                </div>

                <div className="appointment"></div>
              </>
            )}
            {selectedComponent === "requests" && (
              <>
                <div className="app-head">
                  <p
                    className={`stats ${
                      selectedComponent === "appointment" ? "active" : ""
                    }`}
                    onClick={appointment}
                  >
                    Book Appointment
                  </p>
                  <p
                    onClick={requests}
                    className={`stats ${
                      selectedComponent === "requests" ? "active" : ""
                    }`}
                  >
                    Requests
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "approved" ? "active" : ""
                    }`}
                    onClick={approved}
                  >
                    Approved
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "declined" ? "active" : ""
                    }`}
                    onClick={declined}
                  >
                    Declined
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "completed" ? "active" : ""
                    }`}
                    onClick={completed}
                  >
                    Completed
                  </p>
                </div>

                {requestAppointments.length === 0 ? (
                  <>
                    <div className="pend-container">
                      <div className="pends">
                        <img src={emptybox} className="box" />
                      </div>
                      <p>No requested appointments</p>
                    </div>
                  </>
                ) : (
                  <div className="pending-appointments-grid">
                    {requestAppointments &&
                      requestAppointments.map((appointment) => {
                        const startTime = new Date(appointment.startTime);
                        const adjustedTime = new Date(
                          startTime.getTime() - 1 * 60 * 60 * 1000
                        );
                        return (
                          <div key={appointment._id} className="pending-state">
                            <div className="pend-date">
                              <p>
                                {new Date(
                                  appointment.updatedAt
                                ).toLocaleDateString("en-US", {
                                  weekday: "long",
                                })}
                              </p>
                              <h3>
                                {new Date(
                                  appointment.updatedAt
                                ).toLocaleDateString("en-US", {
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
                              <h2>{user ? user.name : ""}</h2>
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
                )}
              </>
            )}
            {selectedComponent === "approved" && (
              <>
                <div className="app-head">
                  <p
                    className={`stats ${
                      selectedComponent === "appointment" ? "active" : ""
                    }`}
                    onClick={appointment}
                  >
                    Book Appointment
                  </p>
                  <p
                    onClick={requests}
                    className={`stats ${
                      selectedComponent === "requests" ? "active" : ""
                    }`}
                  >
                    Requests
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "approved" ? "active" : ""
                    }`}
                    onClick={approved}
                  >
                    Approved
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "declined" ? "active" : ""
                    }`}
                    onClick={declined}
                  >
                    Declined
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "completed" ? "active" : ""
                    }`}
                    onClick={completed}
                  >
                    Completed
                  </p>
                </div>

                {approvedAppointments.length === 0 ? (
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
                      approvedAppointments.map((approve) => {
                        const startTime = new Date(appointment.startTime);
                        const adjustedTime = new Date(
                          startTime.getTime() - 1 * 60 * 60 * 1000
                        );
                        return (
                          <div key={approve._id} className="pending-state">
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
                                {adjustedTime.toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </p>
                            </div>
                            <span className="vertical-line2"></span>
                            <div className="patient-type2">
                              <h2>{user ? user.name : ""}</h2>
                              <p>{approve.type}</p>
                            </div>
                            <div className="patient-name2">
                              <button className="btn9"  onClick={() => handleCompleted(approve._id)}>Complete</button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </>
            )}

            {selectedComponent === "declined" && (
              <>
                <div className="app-head">
                  <p
                    className={`stats ${
                      selectedComponent === "appointment" ? "active" : ""
                    }`}
                    onClick={appointment}
                  >
                    Book Appointment
                  </p>
                  <p
                    onClick={requests}
                    className={`stats ${
                      selectedComponent === "requests" ? "active" : ""
                    }`}
                  >
                    Requests
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "approved" ? "active" : ""
                    }`}
                    onClick={approved}
                  >
                    Approved
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "declined" ? "active" : ""
                    }`}
                    onClick={declined}
                  >
                    Declined
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "completed" ? "active" : ""
                    }`}
                    onClick={completed}
                  >
                    Completed
                  </p>
                </div>

                {declinedAppointments.length === 0 ? (
                  <>
                    <div className="pend-container">
                      <div className="pends">
                        <img src={emptybox} className="box" />
                      </div>
                      <p>No declined appointments</p>
                    </div>
                  </>
                ) : (
                  <div className="pending-appointments-grid">
                  {declinedAppointments &&
                  declinedAppointments.map((decline) => {
                    
                    return(
                    <div key={decline._id} className="pending-state">
                      <div className="pend-date">
                        <p>
                          {new Date(decline.updatedAt).toLocaleDateString(
                            "en-US",
                            { weekday: "long" }
                          )}
                        </p>
                        <h3>
                          {new Date(decline.updatedAt).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short" }
                          )}
                        </h3>
                        <p>
                          {new Date(decline.startTime).toLocaleTimeString(
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
                      <span className="vertical-line1"></span>
                      <div className="patient-type">
                        <h2>{user ? user.name : ""}</h2>
                        <p>{decline.type}</p>
                        <p>{decline.remark}</p>
                      </div>
                      <div className="patient-name2">
                      <IoIosCloseCircle className="close" />
                      </div>
                    </div>
                    );
})}
                </div>
                )}
              </>
            )}
            {selectedComponent === "completed" && (
              <>
                <div className="app-head">
                  <p
                    className={`stats ${
                      selectedComponent === "appointment" ? "active" : ""
                    }`}
                    onClick={appointment}
                  >
                    Book Appointment
                  </p>
                  <p
                    onClick={requests}
                    className={`stats ${
                      selectedComponent === "requests" ? "active" : ""
                    }`}
                  >
                    Requests
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "approved" ? "active" : ""
                    }`}
                    onClick={approved}
                  >
                    Approved
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "declined" ? "active" : ""
                    }`}
                    onClick={declined}
                  >
                    Declined
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "completed" ? "active" : ""
                    }`}
                    onClick={completed}
                  >
                    Completed
                  </p>
                </div>

                {completedAppointments.length === 0 ? (
                  <>
                    <div className="pend-container">
                      <div className="pends">
                        <img src={emptybox} className="box" />
                      </div>
                      <p>No completed appointments</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <h2>Hello</h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Doctordashboard;
