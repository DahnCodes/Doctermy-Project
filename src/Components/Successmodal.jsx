


// import { FaCircleCheck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

import "../Styles/Modal.css"; 
import PropTypes from "prop-types"; 

const SuccessModal = ({ successMessage, onClose }) => {
  if (!successMessage) return null;

  SuccessModal.propTypes = {
    successMessage: PropTypes.string.isRequired, // successMessage should be a string and is required
    onClose: PropTypes.func.isRequired,
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <FaCircleCheck className="good"/>
        <div className="success-text">
          <p>{successMessage}</p>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;

