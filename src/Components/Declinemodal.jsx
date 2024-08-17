import { useState } from "react";
import "../Styles/Modal.css"
import PropTypes from "prop-types"; 

const Declinemodal = ({ _id, onClose, onSubmit }) => {
    
    
    const [remark, setRemark] = useState('');
    
    const handleRemarkChange = (e) => {
      setRemark(e.target.value);
    };
    
    const submitDecline = () => {
        if (onSubmit) {
            onSubmit(_id, remark); // Ensure onSubmit is correctly called here
          }
    };

    Declinemodal.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        _id: PropTypes.func.isRequired,
        
      }
    return (
    <>
  
    <div className="modal">
      <div className="modal-content">
        <h3>Why do you want to decline?</h3>
        <textarea
          placeholder="Enter reason for declining"
          value={remark}
          onChange={handleRemarkChange}
          className="text-area"
        />
        <div className="btnss">

        <button onClick={submitDecline} className="btn10">Submit</button>
        <button onClick={onClose} className="btn11">Cancel</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Declinemodal;