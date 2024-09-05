import { useEffect, useState } from "react";
import emptybox from "../assets/emptybox.png";
import Requestmodal from "../Components/Requestmodal";
import Declinemodal from "../Components/Declinemodal";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Doctorsidebar from "../Components/Doctorsidebar";
import Doctorheader from "../Components/Doctorheader";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import axios from "axios";
import Loaders from "../Components/Loader";
import { useSelector } from "react-redux";

const Doctorrequest = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAppointments, setRequestAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionResult, setActionResult] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestMessage, setRequestMessage] = useState("");
  const [newRequests, setNewRequests] = useState(false); 
  const [prevRequestCount, setPrevRequestCount] = useState(0); 

  const navigate = useNavigate();
  const userx = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!userx) {
      navigate("/signin");
    }
  }, [userx, navigate]);

  useEffect(() => {
    if (token) {
      statusFetch(); // Fetch appointments when the token is available
    }
  }, [token]);

  // Function to fetch only pending (sent) appointments
  const statusFetch = async () => {
    setLoading(true); // Show loading spinner

    try {
      const result = await axios.get(
        "https://doctermy.onrender.com/api/v1/appointment?status=Pending",
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

      setRequestAppointments(appointments); // Set the fetched appointments

      // Update request count and compare with previous
      if (appointments.length > prevRequestCount) {
        setNewRequests(true); // Show the badge for new requests
      }

      setPrevRequestCount(appointments.length); // Update the previous request count
      setLoading(false); // Hide the loading spinner
    } catch (error) {
      console.error("Error fetching status", error);
      setLoading(false); // Hide the loading spinner even in case of error
    }
  };

  const handleClosedModal = () => {
    setShowRequestModal(false); // Close the modal
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

      statusFetch(); // Refresh the appointments after accepting
      setActionResult(`Accepted appointment with ID: ${_id}`);
      console.log(result.data.data);
      setRequestMessage("Request Accepted!");
      setShowRequestModal(true); // Trigger the modal after accepting a request
      setNewRequests(false); // Hide the badge after handling a request
    } catch (error) {
      console.error("Error updating appointment status", error);
    }
  };

  const handleDeclineClick = (_id) => {
    setSelectedAppointmentId(_id); // Save the appointment ID to decline
    setIsModalOpen(true); // Open the decline modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the decline modal
  };

  const handleDeclineSubmit = async (_id, remark) => {
    try {
      const result = await axios.patch(
        `https://doctermy.onrender.com/api/v1/appointment/update-status?_id=${_id}`,
        { status: "Declined", remark: remark }, // Pass the remark to the API
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      statusFetch(); // Refresh the appointments after declining
      setActionResult(`Declined appointment with ID: ${_id}`);
      console.log(result.data.data);
      setNewRequests(false); // Hide the badge after handling a request
    } catch (error) {
      console.error("Error updating appointment status", error);
    }
  };

  return (
    <>
      <Dashboardnavigation />

      <div className="grid-king">
        {/* Pass the number of pending requests to the Doctorsidebar */}
        <Doctorsidebar requestCount={requestAppointments.length} /> 
        <div className="requested-container">
          <Doctorheader />

          {loading ? (
            <div className="spinner-container">
              <Loaders /> {/* Display loader while fetching */}
            </div>
          ) : requestAppointments.length === 0 ? (
            <>
              <div className="pend-container">
                <div className="pends">
                  <img src={emptybox} className="box" alt="No requested appointments" />
                </div>
                <p>No requested appointments</p>
              </div>
            </>
          ) : (
            <div className="pending-appointments-grid">
              {requestAppointments &&
                requestAppointments
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort appointments by the most recent
                  .map((appointment) => {
                    const startTime = new Date(appointment.startTime);
                    const adjustedTime = new Date(startTime.getTime() - 1 * 60 * 60 * 1000); // Adjust time to local timezone
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
                            onClick={() => handleDeclineClick(appointment._id)}
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
        </div>
      </div>
    </>
  );
};

export default Doctorrequest;
