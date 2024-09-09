import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import "../Styles/Accordion.css"

const Fifthaccordion = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
  return (
    <div>

<div className="accordion-header" onClick={toggleAccordion}>
        <h3>Are doctors available throughout the day?</h3>
        <span>{isOpen ? <IoClose className="clo" /> : <FaPlus className="clo"/>}</span>
      </div>
      {isOpen && <div className="accordion-content">FAQs</div>}
    </div>
  )
}

export default Fifthaccordion;