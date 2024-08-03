import logo from "../assets/doclogo.png";
import { Link } from "react-router-dom";
import Button from "./Button";
import Contactbutton from "./Signupbutton";
import { FaPhoneAlt } from "react-icons/fa";

// import Contactbutton from "./Contactbutton";
const Navigationbar = () => {
  return (
    <>
      
      <div className="call-line">
        <ul className="call-linelist">
          <li>Emergency Response Service</li>
          <li>In case of an emergency, call this line </li>
          <li>
            <FaPhoneAlt className="phone" />
            08085167132
          </li>
        </ul>
      </div>

      <nav className="navbar">
        <div className="navcontainer">
          <img className="doclogo" src={logo} alt="doctermylogo" />
        </div>
        <ul className="navlink">
          <li>About Us</li>
          {/* <li>Doctors</li> */}
          <li>Hospitals</li>
          <li>How It Works</li>
          <li>Contact Us</li>
        </ul>
        <div className="buttons">
          <Link to="/signup">
            <Contactbutton />
          </Link>
          <Link to="/signin">
            <Button />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigationbar;
