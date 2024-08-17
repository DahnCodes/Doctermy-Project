import { AiOutlineSearch } from "react-icons/ai"
import { MdNotifications } from "react-icons/md"
import dashlogo from "../assets/dashboardlogo.png";
import "../Styles/Home.css";
import { FaCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboardnavigation = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // const userName = useSelector((store) => store.user.name);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }else {
      navigate("/signin")
    }
  }, []);
  
  return (
    <>
        <div className="dashboard">
        <nav className="dash-navigation">
          <img src={dashlogo} className="doclogos" />
          
          <ul className="nav-icons">
            <li>
              <AiOutlineSearch className="pfps"/>
            </li>
            <li>
              <MdNotifications  className="pfps"/>
            </li>
          <div className="profile">
            <FaCircleUser className="pfp"/>
            <p>{user ? user.name : ""}</p>
          </div>
          </ul>
        </nav>
      </div>
     
    </>
  )
}

export default Dashboardnavigation