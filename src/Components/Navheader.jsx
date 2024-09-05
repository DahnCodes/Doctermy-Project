import { FaPhoneAlt } from "react-icons/fa";
import "../Styles/Navheader.css"
import "../App.css"
const Navheader = () => {
  return (
    <div className="calls-container">
      <div className="call-line">
        <div className="call-linelist">
          <p className="call-p">Emergency Response Service</p>
          <p className="call-a">In case of an emergency, call this line </p>
          <p className="call-b">
            <FaPhoneAlt className="phone" />
            08085167132
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navheader;
