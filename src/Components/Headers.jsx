import { useLocation, useNavigate } from "react-router-dom";

import "../Styles/Home.css";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Tab = styled.p`
padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) =>
    props.active ? "3px solid #00b4d8" : "3px solid transparent"};
  margin: 0;
color: #00000;
 height: 55px;
 width: 261.6px
  box-sizing: border-box;
  transform: ${(props) => (props.active ? "translateY(5px)" : "translateY(0)")};
  
`;

const Headers = () => {
  const [activeTab, setActiveTab] = useState("/bookappointment");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set the active tab based on the current URL path
    switch (location.pathname) {
      case "/bookappointment":
        setActiveTab("bookAppointment");
        break;
      case "/pending":
        setActiveTab("pending");
        break;
      case "/approved":
        setActiveTab("approved");
        break;
      case "/declined":
        setActiveTab("declined");
        break;
      case "/completed":
        setActiveTab("completed");
        break;
      default:
        setActiveTab("");
    }
  }, [location.pathname]);
  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
  };

  return (
    <div>
      <div className="app-header">
        <Tab
          active={activeTab === "bookAppointment"}
          onClick={() => handleTabClick("bookAppointment", "/bookappointment")}
        >
          Book Appointment
        </Tab>

        <Tab
          active={activeTab === "pending"}
          onClick={() => handleTabClick("pending", "/pending")}
        >
          Pending
        </Tab>
        <Tab
          active={activeTab === "approved"}
          onClick={() => handleTabClick("approved", "/approved")}
        >
          Approved
        </Tab>
        <Tab
          active={activeTab === "declined"}
          onClick={() => handleTabClick("declined", "/declined")}
        >
          Declined
        </Tab>
        <Tab
          active={activeTab === "completed"}
          onClick={() => handleTabClick("completed", "/completed")}
        >
          Completed
        </Tab>
      </div>
    </div>
  );
};

export default Headers;
