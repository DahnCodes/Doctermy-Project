import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { TbCalendarClock } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";



const Tab = styled.p`
padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
color: ${(props) =>
    props.active ? "#00b4d8" : ""};

  
`;
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      // Set the active tab based on the current URL path
      switch (location.pathname) {
        case "/home":
          setActiveTab("home");
          break;
        case "/bookappointment":
          setActiveTab("bookAppointment");
          break;
        case "/pending":
          setActiveTab("bookAppointment");
          break;
        case "/approved":
          setActiveTab("bookAppointment");
          break;
        case "/declined":
          setActiveTab("bookAppointment");
          break;
        case "/completed":
          setActiveTab("bookAppointment");
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
    <div className="grid-container">
      <div className="item11">
        <div className="item-icons">
            <Tab
          active={activeTab === "home"}
          onClick={() => handleTabClick("home", "/home")}
        >
            <GoHomeFill   className="home"/>
            <p>Home</p>
        </Tab>

        <Tab
          active={activeTab === "bookAppointment"}
          onClick={() => handleTabClick("bookApointment", "/bookappointment")}
        >
          
            <TbCalendarClock  className="calendar"/>
            
            <p>Appointments</p>
        </Tab>
      
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
