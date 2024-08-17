import "../Styles/Home.css";
import { GoHomeFill } from "react-icons/go";
import { TbCalendarClock, TbRubberStamp } from "react-icons/tb";
import { useEffect, useState } from "react";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import { FaLessThan, FaLocationDot } from "react-icons/fa6";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import billboard from "../assets/billboard.jpg";
// import { useSelector } from "react-redux";
// import { RiHistoryFill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
import SuccessModal from "../Components/Successmodal";
import emptybox from "../assets/emptybox.png";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

const Home = () => {
  const [formData, setFormData] = useState("");
  // const [anothercolor, setAnotherColor] = useState("#858585")
  const [selectedComponent, setSelectedComponent] = useState("home");
  // const user = useSelector((store) => store.user.name);
  // console.log(userName);

  // const myToken = useSelector((store) => store.token.myToken);
  // const [doctor, setDoctor] = useState("")
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const handleIconClick = () => {
    // setColor((prevColor) => (prevColor === "#00B4D8" ? "#858585" : "#00B4D8"));
    setSelectedComponent("home");
  };

  const navigate = useNavigate();

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
  const appointment = () => {
    // setAnotherColor((prevColor) => (prevColor === "#858585" ? "#00B4D8" : "#858585"));
    setSelectedComponent("appointment");
  };

  const pending = () => {
    setSelectedComponent("pending");
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
  const handleAppointment = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setTime(e.target.value);
  };
  const [successMessage, setSuccessMessage] = useState("");
  const [appLoading, setAppLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage("Appointment request submitted successfully!"); // Clear the message if needed
  };
  // const [time, setTime] = useState("");

  const submitRequest = async (e) => {
    setAppLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://doctermy.onrender.com/api/v1/appointment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      // setSelectedComponent(response.data);
    } catch (err) {
      if (err.response && err.response.data)
        setSuccessMessage("Time not available!");
      {
        console.error;
      }
    } finally {
      setAppLoading(false);
      setShowModal(true); // Stop the loading state
    }
  };
  const [doctor, setDoctor] = useState([]);

  // const [availableDates, setAvailableDates] = useState([]);
  // const [availableTimes, setAvailableTimes] = useState([]);

  const apiUrl = "https://doctermy.onrender.com/api/v1/users?role=Doctor";
  // const role = "doctor";
  // const url = `${apiUrl}?role=${role}`;
  useEffect(() => {
    const apiFetch = async () => {
      try {
        const res = await axios.get(apiUrl);
        console.log(res.data.data);
        setDoctor(res.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    // fetch(url)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Doctors:", data);
    //     // Handle the specific data you need from the response
    //   })
    //   .catch((error) => console.error("Error fetching the doctors:", error));
    apiFetch();
  }, []);

  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [declinedAppointments, setDeclinedAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);

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
      setPendingAppointments(result.data.data);

      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };

  useEffect(() => {
    if (token) {
      statusApprove();
    }
    // statusApprove();
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
      setApprovedAppointments(result.data.data);

      console.log(result.data.data);
    } catch (error) {
      console.error("error fetching status", error);
    }
  };

  useEffect(() => {
    if (token) {
      statusDeclined();
    }
    // statusApprove();
  }, [token]);
  const statusDeclined = async () => {
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

  return (
    <>
      <Dashboardnavigation />
      <main>
        <div className="grid-container">
          <div className="item1">
            <div className="item-icons">
              <div
                
                onClick={handleIconClick}
                className={`home ${
                  selectedComponent === "home" ? "active" : ""
                }`}
              >
                <GoHomeFill className="home" />
                <p>Home</p>
              </div>

              <div
               
                onClick={appointment}
                className={`home ${
                  selectedComponent === "appointment" ? "active" : ""
                }`}
              >
                <TbCalendarClock className="calendar" />
                <p>Appointments</p>
              </div>
            </div>
          </div>
          <div className="item2">
            {selectedComponent === "home" && (
              <>
                <div className="container">
                  <div className="welcome">
                    <h4>Welcome, {user ? user.name : ""} </h4>
                    <p>
                      You have <span className="spans">4 appointments</span>{" "}
                      today
                    </p>
                  </div>
                  <div className="needs">
                    <p>Need an appointment?</p>
                    <button className="btn4">Book Now</button>
                  </div>
                  <div className="item3">
                    <div className="card">
                      <img src={billboard} className="hospital" />
                      <div className="cards-location">
                        <h4>Sundune Memorial Hospital</h4>
                        <FaLocationDot />
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
              </>
            )}
            {selectedComponent === "appointment" && (
              <>
                <div className="app-header">
                  <p
                    className={`stats ${
                      selectedComponent === "appointment" ? "active" : ""
                    }`}
                    onClick={appointment}
                  >
                    Book Appointment
                  </p>
                  <p
                    onClick={pending}
                    className={`stats ${
                      selectedComponent === "pending" ? "active" : ""
                    }`}
                  >
                    Pending
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
                <div className="appointments-container">
                  <div className="app-container">
                    <h3>Book Appointment </h3>
                    <div className="app-detail">
                      <div className="apps-field">
                        <div className="labels">
                          <label htmlFor="">Purpose of Appointment:</label>
                        </div>
                        <select
                          name="type"
                          id=""
                          required
                          className="select-forms"
                          onChange={handleAppointment}
                        >
                          <option value="">Purpose</option>

                          <option>Consultation</option>
                          <option>Treatment</option>
                          <option>Surgery</option>
                        </select>
                      </div>

                      <div className="forms-field">
                        <div className="labels">
                          <label htmlFor="">Doctor:</label>
                        </div>
                        <select
                          name="doctorId"
                          id="doctorSelect"
                          required
                          className="select-forms"
                          onChange={handleAppointment}
                        >
                          <option value="">Select a doctor</option>

                          {doctor.map((Doctors) => (
                            <option key={Doctors._id} value={Doctors._id}>
                              {Doctors.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="forms-field">
                        <div className="labels">
                          <label htmlFor="">Date:</label>
                        </div>
                        <input
                          type="date"
                          className="select-forms"
                          required
                          onChange={handleAppointment}
                          placeholder="YYYY-MM-DD"
                          name="date"
                          id="date"
                        />
                      </div>

                      <div className="forms-field1">
                        <div className="labels">
                          <label htmlFor="">Time:</label>
                        </div>
                        <input
                          type="text"
                          id="appointment-time"
                          name="timeValue"
                          placeholder="HH:MM AM/PM"
                          pattern="([1-9]) (AM|PM)"
                          // value={time}
                          className="select-forms3"
                          onChange={handleAppointment}
                          required
                        />
                      </div>

                      <div className="forms-field">
                        <div className="labels">
                          <label htmlFor="">Complaint:</label>
                        </div>
                        <input
                          type="text"
                          className="select-forms2"
                          onChange={handleAppointment}
                          name="complaint"
                          placeholder="State your case"
                        />
                      </div>
                      <button
                        className="btn5"
                        onClick={submitRequest}
                        disabled={appLoading}
                      >
                        Request Appointment
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  {showModal && (
                    <SuccessModal
                      successMessage={successMessage}
                      onClose={handleCloseModal}
                    />
                  )}
                </div>
              </>
            )}

            {selectedComponent === "pending" && (
              <>
                <div className="app-header">
                  <p
                    className={`stats ${
                      selectedComponent === "appointment" ? "active" : ""
                    }`}
                    onClick={appointment}
                  >
                    Book Appointment
                  </p>
                  <p
                    onClick={pending}
                    className={`stats ${
                      selectedComponent === "pending" ? "active" : ""
                    }`}
                  >
                    Pending
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
                  <p className="stats" onClick={completed}>
                    Completed
                  </p>
                </div>

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
                                {new Date(
                                  appointment.startTime
                                ).toLocaleTimeString("en-US", {
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
              </>
            )}
            {selectedComponent === "approved" && (
              <>
                <div className="app-header">
                  <p className="stats" onClick={appointment}>
                    Book Appointment
                  </p>
                  <p onClick={pending} className="stats">
                    Pending
                  </p>
                  <p
                    className={`stats ${
                      selectedComponent === "approved" ? "active" : ""
                    }`}
                    onClick={approved}
                  >
                    Approved
                  </p>
                  <p className="stats" onClick={declined}>
                    Declined
                  </p>
                  <p className="stats" onClick={completed}>
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
                      return(
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
                        <span className="vertical-line"></span>
                        <div className="patient-type1">
                          <h2>{user ? user.name : ""}</h2>
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
              </>
            )}

            {selectedComponent === "declined" && (
              <>
                <div className="app-header">
                  <p className="stats" onClick={appointment}>
                    Book Appointment
                  </p>
                  <p onClick={pending} className="stats">
                    Pending
                  </p>
                  <p className="stats" onClick={approved}>
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
                  <p className="stats" onClick={completed}>
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
                      <span className="vertical-line"></span>
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
                <div className="app-header">
                  <p className="stats" onClick={appointment}>
                    Book Appointment
                  </p>
                  <p onClick={pending} className="stats">
                    Pending
                  </p>
                  <p className="stats" onClick={approved}>
                    Approved
                  </p>
                  <p className="stats" onClick={declined}>
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

export default Home;
