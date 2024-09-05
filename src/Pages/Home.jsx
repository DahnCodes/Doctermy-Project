import "../Styles/Home.css";
import { useEffect, useState } from "react";
import Dashboardnavigation from "../Components/Dashboardnavigation";

import billboard from "../assets/billboard.jpg";
import emptybox from "../assets/emptybox.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [upcomingAppointments, setUpcomingAppointents] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  const userx = useSelector((state) => state.user);

  
  const token = useSelector((state) => state.token);

  console.log(userx);

  // useEffect(() => {
  //   const myToken = localStorage.getItem("myToken");

  //   if (myToken) {
  //     setToken(JSON.parse(myToken));
  //   } else {
  //     navigate("/signin");
  //   }
  // }, [navigate]);

  useEffect(() => {
    if (user && token) {
      // Fetch the approved appointments
      const fetchAppointments = async () => {
        try {
          const response = await axios.get(
            "https://doctermy.onrender.com/api/v1/appointment?status=Approved",

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const appointments = response.data.data.map((appointment) => {
            return {
              ...appointment,
              doctorName: appointment.doctorId?.name || "Unknown", // Assuming patientId object contains the name
            };
          });

          setAppointmentCount(response.data.data.length);
          setUpcomingAppointents(appointments); // Assuming the appointments are in response.data.data
        } catch (error) {
          console.error("Error fetching approved appointments:", error);
        }
      };

      fetchAppointments();
    }
  }, [user, token]);

  useEffect(() => {
    // const userData = localStorage.getItem("user");

    if (userx) {
      setUser(userx.user);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const bookNow = () => {
    navigate("/bookappointment");
  };
  const toggleViewAll = () => setShowAll(!showAll);

  const displayedAppointments = showAll
    ? upcomingAppointments
    : upcomingAppointments.slice(0, 3);

  return (
    <>
      <Dashboardnavigation />
      <div className="grid-container">
        <Sidebar />
        <div className="item2">
          <div className="container">
            <div className="welcome">
              <h4>Welcome, {userx ? userx.user.name : ""} </h4>
              <p>
                You have{" "}
                <span className="spans">{appointmentCount} appointments</span>{" "}
                today
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

            {upcomingAppointments.length === 0 ? (
              <>
                <div className="pend-container">
                  <div className="pends">
                    {/* <img src={emptybox} className="box" /> */}
                  </div>
                  <p>No upcoming appointments</p>
                </div>
              </>
            ) : (
              <>
                <div className="upcoming-appointments-grid">
                  {upcomingAppointments &&
                    displayedAppointments.map((approve) => {
                      return (
                        <div key={approve._id} className="pending-state1">
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
                {upcomingAppointments.length > 2 && (
                  <button className="view-all-btn" onClick={toggleViewAll}>
                    {showAll ? "Show Less" : "View All"}
                  </button>
                )}
              </>
            )}
            <div className="recent-appointments">
              <p>Recent Appointments</p>
              <hr className="hr" />
              {recentAppointments.length === 0 ? (
                <>
                  <div className="pend-container">
                    <div className="pends">
                      <img src={emptybox} className="box" />
                    </div>
                    <p>No recent appointments</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="tables">
                    <table>
                      <tr>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Purpose</th>
                        <th>Status</th>
                      </tr>
                      <tr>
                        <td>Peter</td>
                        <td>Griffin</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>Lois</td>
                        <td>Griffin</td>
                        <td>$150</td>
                      </tr>
                      <tr>
                        <td>Joe</td>
                        <td>Swanson</td>
                        <td>$300</td>
                      </tr>
                      <tr>
                        <td>Cleveland</td>
                        <td>Brown</td>
                        <td>$250</td>
                      </tr>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
