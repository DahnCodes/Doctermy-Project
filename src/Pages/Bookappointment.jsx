import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import Headers from "../Components/Headers";
import Sidebar from "../Components/Sidebar";
import Successmodal from "../Components/Successmodal";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Home.css";
import { useSelector } from "react-redux";

const Bookappointment = () => {
  const [doctor, setDoctor] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [appLoading, setAppLoading] = useState(false);
  // const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const userx = useSelector((state) => state.user);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token || !userx) {
      navigate("/signin");
    }
  }, [token, userx]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://doctermy.onrender.com/api/v1/users?role=Doctor",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctor(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "doctorId") {
      const selectedDoctor = doctor.find((doc) => doc._id === value);
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
          date: moment(selectedDate).format("YYYY-MM-DD"),
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
        <Sidebar />
        <div className="appointments-container">
          <Headers />
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
                <label>Doctor:</label>
                <select
                  name="doctorId"
                  className="select-forms"
                  onChange={handleAppointmentChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctor.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>

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
                <label>Complaint:</label>
                <input
                  type="text"
                  name="complaint"
                  className="select-forms2"
                  placeholder="Complaint"
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

export default Bookappointment;
