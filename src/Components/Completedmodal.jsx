import "../Styles/Completedmodal.css"

const Completedmodal = ({onClose}) => {
  return (
    <div>

<div className="modal-overlayz">
      <div className="modal-contentr">
        <p>The appointment has been completed successfully.</p>
        <button className="close-btnd" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
    </div>
  )
}

export default Completedmodal