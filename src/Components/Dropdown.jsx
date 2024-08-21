import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dropdown.css"
import { IoIosLogOut, IoMdArrowDropdown } from "react-icons/io";
const Dropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem("myToken");
        localStorage.removeItem("name");
        // Redirect to login page
        navigate("/signin");
      };
  return (
    <div className="profile-container">
        <IoMdArrowDropdown  className="profile-button1"
        onClick={() => setShowDropdown(!showDropdown)}/>

      {showDropdown && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleLogout}>
            Log Out
            <IoIosLogOut className="logout" />

          </button>
        </div>
      )}
    </div>
  )
}

export default Dropdown