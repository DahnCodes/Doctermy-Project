import { IoLogoFacebook } from "react-icons/io";
import "../Styles/Footer.css";
import doclogo from "../assets/doclogo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import line from "../assets/line.png";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footers">
          <div className="first-footer">
            <img src={doclogo} className="doc-image" />
            <p>
              Doctermy is a courier for<br></br> appointment booking<br></br>
              services in hospitals.
            </p>
            <div className="icons">
              <IoLogoFacebook />
              <FaLinkedin />
              <FaInstagram />
              <FaSquareXTwitter />
            </div>
          </div>

          <div className="second-footer">
            <p>Company</p>
            <ul className="footer-list">
              <li>About Us</li>
              <li>Hospitals</li>
              <li>How It Works</li>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>

          <div className="third-footer">
            <p>Customers</p>
            <ul className="footer-list">
              <li>Customer Reviews</li>
              <li>Partners</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div className="fourth-footer">
            <p>Contact Us</p>
            <ul className="footer-lists">
              <li>
                <FaPhoneAlt />
                08085167132
              </li>
              <li>
                <FaEnvelope />
                info@doctermy.com
              </li>
            </ul>
          </div>
        </div>
        <img src={line} className="line" />
        <p className="copyright">&copy;2024 Doctermy, All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
