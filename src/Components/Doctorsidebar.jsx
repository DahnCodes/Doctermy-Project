import { GoHomeFill } from "react-icons/go";
import { SlUser } from "react-icons/sl";
import { TbCalendarClock } from "react-icons/tb";
import "../Styles/Doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Badge } from "rsuite"; // Ensure rsuite is installed
import axios from "axios";
import { useSelector } from "react-redux";

// Styled component for tabs
const Tab = styled.p`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#00b4d8" : "")};
`;

const Doctorsidebar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [newRequests, setNewRequests] = useState([]); // State to hold the array of new requests
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.user.token); // Get token from Redux store

  // Update active tab based on current URL path
  useEffect(() => {
    switch (location.pathname) {
      case "/doctordashboard":
        setActiveTab("doctordashboard");
        break;
      case "/requests":
        setActiveTab("doctorRequests");
        break;
      case "/doctorapproved":
        setActiveTab("doctorRequests");
        break;
      case "/doctordeclined":
        setActiveTab("doctorRequests");
        break;
      case "/doctorcompleted":
        setActiveTab("doctorRequests");
        break;
      default:
        setActiveTab("");
    }
  }, [location.pathname]);

  // Redirect to signin if no token is present
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  // Fetch new appointment requests
  useEffect(() => {
    const fetchNewRequests = async () => {
      try {
        const response = await axios.get(
          "https://doctermy.onrender.com/api/v1/appointment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Assuming the API returns an array of new requests
        setNewRequests(response.data.data || []); // Set the array of new requests
      } catch (error) {
        console.error("Error fetching new requests:", error);
      }
    };

    fetchNewRequests();
  }, [token]);

  // Handle tab clicks and navigation
  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
  };

  return (
    <>
      <div className="grid-king">
        <div className="first-item">
          <div className="item-menus">
            <Tab
              active={activeTab === "doctordashboard"}
              onClick={() =>
                handleTabClick("doctordashboard", "/doctordashboard")
              }
            >
              <GoHomeFill className="home" />
              <p>Home</p>
            </Tab>

            <Tab
              active={activeTab === "doctorRequests"}
              onClick={() => handleTabClick("doctorRequests", "/requests")}
            >
              <TbCalendarClock className="calendar" />
              <p>Appointments</p>
              {/* Conditionally render the badge with the count of new requests */}
              {newRequests.length > 0 && (
                <Badge content={newRequests.length} className="badge-count" />
              )}
            </Tab>

            <Tab
              active={activeTab === "patients"}
              onClick={() => handleTabClick("patients", "/patients")}
            >
              <SlUser className="calendar" />
              <p>Patients</p>
            </Tab>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorsidebar;
