import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Contactbutton from "./Signupbutton";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/doclogo.png";

const Navigationbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navcontainer">
        <img className="doclogo" src={logo} alt="doctermylogo" />
      </div>
      <ul className="navlink">
        <li>About Us</li>
    
        <li>Benefits</li>
        <li>Reviews</li>
        <li>FAQ</li>
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

  <input id="burger-checkbox" type="checkbox" onClick={handleMenuToggle}/>
<label className="burger" htmlFor="burger-checkbox">
  <span></span>
  <span></span>
  <span></span>
</label>


      {isMenuOpen && (
        <>
          <ul className={`navlink-active ${isMenuOpen ? "show" : ""}`}>
            <li>About Us</li>
            <li>Benefits</li>
            <li>Reviews</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          <div className="buttons-active">
            <Link to="/signup">
              <Contactbutton />
            </Link>
            <Link to="/signin">
              <Button />
            </Link>
          </div>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navigationbar;
