import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Sidebar from "../Components/Sidebar";
import Headers from "../Components/Headers";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import "../Styles/Home.css";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Declined = () => {
  const [declinedAppointments, setDeclinedAppointments] = useState([]);
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
      statusDeclined();
    }
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

      <div className="grid-container">
        <Sidebar />
        <div className="penders-container">
          <Headers />
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
                  return (
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
        </div>
      </div>
    </>
  );
};

export default Declined;
