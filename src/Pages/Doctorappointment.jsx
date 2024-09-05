import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Doctorheader from "../Components/Doctorheader";
import Doctorsidebar from "../Components/Doctorsidebar";
import Successmodal from "../Components/Successmodal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Home.css";
import { useSelector } from "react-redux";

const Doctorappointment = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [appLoading, setAppLoading] = useState(false);
//   const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const userx = useSelector((state) => state.user);

  const token = useSelector((state) => state.user.token);
  useEffect(() => {


    if (!token || !userx) {
      navigate("/signin");
    } 
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get(
          "https://doctermy.onrender.com/api/v1/users?role=Patient", {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setPatients(patientResponse.data.data);

        const doctorResponse = await axios.get(
          "https://doctermy.onrender.com/api/v1/users?role=Doctor", {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setDoctors(doctorResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "doctorId") {
      const selectedDoctor = doctors.find((doc) => doc._id === value);
      if (selectedDoctor) {
        setAvailableTimes(selectedDoctor.availableTime || []);
      } else {
        setAvailableTimes([]);
      }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    setAppLoading(true);

    try {
      await axios.post(
        "https://doctermy.onrender.com/api/v1/appointment",
        {
          doctorId: formData.doctorId,
          patientId: formData.patientId,
          date: selectedDate.toISOString(),
          timeValue: selectedTime,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage("Appointment request submitted successfully!");
      setFormData({});
      setSelectedDate(null);
      setSelectedTime("");
      setAvailableTimes([]);
    } catch (err) {
      console.error("Error booking appointment:", err);
      setSuccessMessage("Time has already been taken!");
    } finally {
      setAppLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <Dashboardnavigation />
      <div className="grid-container">
        <Doctorsidebar />
        <div className="appointments-container">
          <Doctorheader />
          <div className="app-container">
            <h3>Book Appointment</h3>
            <div className="app-detail">
              <div className="apps-field">
                <label>Purpose of Appointment:</label>
                <select
                  name="type"
                  className="select-forms"
                  onChange={handleAppointmentChange}
                  required
                >
                  <option value="">Purpose</option>
                  <option>Consultation</option>
                  <option>Treatment</option>
                  <option>Surgery</option>
                </select>
              </div>

              <div className="forms-field">
                <label>Patient:</label>
                <select
                  name="patientId"
                  className="select-forms"
                  onChange={handleAppointmentChange}
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="forms-field">
                <label>Doctor:</label>
                <select
                  name="doctorId"
                  className="select-forms"
                  onChange={handleAppointmentChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="forms-field">
                <label>Select Date:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className="select-forms"
                  required
                />
              </div>

              {availableTimes.length > 0 && (
                <div className="forms-field">
                  <label>Available Slots:</label>
                  <select
                    name="timeValue"
                    className="select-forms"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    required
                  >
                    <option value="">Select a slot</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="forms-field">
                <label>Description:</label>
                <input
                  type="text"
                  name="complaint"
                  className="select-forms2"
                  placeholder="Description"
                  onChange={handleAppointmentChange}
                  required
                />
              </div>

              <button
                className="btn5"
                onClick={submitRequest}
                disabled={appLoading}
              >
                {appLoading ? (
                  <div className="loading-spinner">
                    <div className="spinnerz"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Request Appointment"
                )}
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <Successmodal
            successMessage={successMessage}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default Doctorappointment;
