import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import "../Styles/Accordion.css"
// import "./App.css"
import { IoClose } from "react-icons/io5";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>Are the doctors available throughout the day?</h3>
        <span>{isOpen ? <IoClose className="clo" /> : <FaPlus className="clo"/>}</span>
      </div>
      {isOpen && <div className="accordion-content">FAQs</div>}
    </div>
  );
};

export default Accordion;
