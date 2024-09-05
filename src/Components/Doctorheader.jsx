

import "../Styles/Home.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const Doctorheader = () => {

    const [activeTab, setActiveTab] = useState("/bookappointment");
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      // Set the active tab based on the current URL path
      switch (location.pathname) {
        case "/appointment":
          setActiveTab("/appointment");
          break;
        case "/requests":
          setActiveTab("requests");
          break;
        case "/doctorapproved":
          setActiveTab("doctorapproved");
          break;
        case "/doctordeclined":
          setActiveTab("doctordeclined");
          break;
        case "/doctorcompleted":
          setActiveTab("doctorcompleted");
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
          active={activeTab === "doctorappointment"}
          onClick={() => handleTabClick("doctorappointment", "/appointment")}
        >
         Book Appointment
        </Tab>


        <Tab
          active={activeTab === "requests"}
          onClick={() => handleTabClick("requests", "/requests")}
        >
          Requests
        </Tab>
        <Tab
          active={activeTab === "doctorapproved"}
          onClick={() => handleTabClick("doctorapproved", "/doctorapproved")}
        >
          Approved
        </Tab>
        <Tab
          active={activeTab === "doctordeclined"}
          onClick={() => handleTabClick("docotordeclined", "/doctordeclined")}
        >
          Declined
        </Tab>
        <Tab
          active={activeTab === "doctorcompleted"}
          onClick={() => handleTabClick("doctorcompleted", "/doctorcompleted")}
        >
          Completed
        </Tab>
      </div>
    </div>
  )
}

export default Doctorheader