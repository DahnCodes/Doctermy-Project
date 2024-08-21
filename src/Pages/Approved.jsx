import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Sidebar from "../Components/Sidebar";
import Headers from "../Components/Headers";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import "../Styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Approved = () => {
  const [approvedAppointments, setApprovedAppointments] = useState([]);
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
      setApprovedAppointments(result.data.data);

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
        </div>
      </div>
    </>
  );
};
