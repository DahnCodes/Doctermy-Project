import { FaCircleCheck } from "react-icons/fa6";
import "../Styles/Modal.css"; 
import PropTypes from "prop-types"; 

const Requestmodal = ({ requestMessage, onClose }) => {
    if (!requestMessage) return null;

    Requestmodal.propTypes = {
      requestMessage: PropTypes.string.isRequired, // successMessage should be a string and is required
      onClose: PropTypes.func.isRequired,
    }
  return (
    <div>
 <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <FaCircleCheck className="good"/>
        <div className="success-text">
          <p>{requestMessage}</p>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
    </div>
  )
}

export default Requestmodal;