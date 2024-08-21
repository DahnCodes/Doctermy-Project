import { useEffect, useState } from "react";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Headers from "../Components/Headers";
import Sidebar from "../Components/Sidebar";
import Successmodal from "../Components/Successmodal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css"



const Bookappointment = () => {
const [doctor, setDoctor] = useState([]);
const [showModal, setShowModal] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [appLoading, setAppLoading] = useState(false);
const [formData, setFormData] = useState("");
const [user, setUser] = useState(null);
const [token, setToken] = useState(null);
const [doctorAvailability, setDoctorAvailability] = useState([]);

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


const handleAppointment = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setTime(e.target.value);
    if (e.target.name === "doctorId") {
        const selectedDoctor = doctor.find((doc) => doc._id === e.target.value);
        if (selectedDoctor && selectedDoctor.availableDays) {
          setDoctorAvailability(selectedDoctor.availableDays);
        }
      }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage("Appointment request submitted successfully!"); // Clear the message if needed
  };




  const submitRequest = async (e) => {
    setAppLoading(true);
    setShowModal(false);
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

  

  const apiUrl = "https://doctermy.onrender.com/api/v1/users?role=Doctor";
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
 
    apiFetch();
  }, []);

  return (
    <>
    <Dashboardnavigation/>
      <div className="grid-container">
    <Sidebar/>
        <div className="appointments-container">
         
        <Headers/>
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

             {doctorAvailability.length > 0 && (
                <div className="forms-field">
                  <div className="labels">
                    <label htmlFor="">Available Slots:</label>
                  </div>
                  <select
                    name="slot"
                    id="slotSelect"
                    required
                    className="select-forms"
                    onChange={handleAppointment}
                  >
                    <option value="">Select a slot</option>
                    {doctorAvailability.map((slot, index) => (
                      <option key={index} value={`${slot.availableDays} ${slot.availableTime}`}>
                        {slot.availableDays} - {slot.availableTime}
                      </option>
                    ))}
                  </select>
                </div>
              )}


              <div className="forms-field">
                <div className="labels">
                  <label htmlFor="">Complaint:</label>
                </div>
                <input
                  type="text"
                  className="select-forms2"
                    onChange={handleAppointment}
                  name="complaint"
                  placeholder="Complaint"
                />
              </div>
              <button
                className="btn5"
                onClick={submitRequest}
                disabled={appLoading}
              >

{appLoading ? (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <span>Loading...</span> {/* You can add a spinner here if needed */}
    </div>
  ) : (
    "Request Appointment"
  )}
              </button>
            </div>
          </div>
        </div>
        <div>
          {showModal && (
                    <Successmodal
                      successMessage={successMessage}
                      onClose={handleCloseModal}
                    />
                  )}
        </div>
      </div>
    </>
  );
};

export default Bookappointment;
