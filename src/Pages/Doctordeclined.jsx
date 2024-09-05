import { useEffect, useState } from "react";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Doctorheader from "../Components/Doctorheader";
import Doctorsidebar from "../Components/Doctorsidebar";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loaders from "../Components/Loader";
import { useSelector } from "react-redux";


const Doctordeclined = () => {

    const [declinedAppointments, setDeclinedAppointments] = useState([])
    // const [user, setUser] = useState(null);
    // const [token, setToken] = useState(null);
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
        statusDeclined();
      }
    }, [token]);
  
    const statusDeclined = async () => {
      setLoading(true);

      try {
        const result = await axios.get(
          "https://doctermy.onrender.com/api/v1/appointment?status=Declined",
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
        setDeclinedAppointments(appointments);
        setLoading(false);

        console.log(result.data.data);
      } catch (error) {
        console.error("error fetching status", error);
        setLoading(false);

      }
    };
  return (
    <div>
 <>
      <Dashboardnavigation />

      <div className="grid-container">
        <Doctorsidebar />
        <div className="penders-container">
          <Doctorheader />
          {loading ? (
            <div className="spinner-container">
              <Loaders /> {/* Display spinner while loading */}
            </div>
          ): declinedAppointments.length === 0 ? (
            <>
              <div className="pend-container">
                <div className="pends">
                  {/* <img src={emptybox} className="box" /> */}
                </div>
                <p>No declined appointments</p>
              </div>
            </>
          ) : (
            <div className="pending-appointments-grid">
              {declinedAppointments &&
                declinedAppointments
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
                      <span className="vertical-line3"></span>
                      <div className="patient-type">
                        <h2>{decline.patientName}</h2>
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
    </div>
  )
}

export default Doctordeclined