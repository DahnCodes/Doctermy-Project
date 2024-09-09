import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import "../Styles/Accordion.css"
import "../Styles/Secondaccordion.css";
// import "./App.css"
import { IoClose } from "react-icons/io5";

const Accordions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>How to book an appointment</h3>
        <span>{isOpen ? <IoClose className="clo" /> : <FaPlus className="clo"/>}</span>
      </div>
      {isOpen && <div className="accordion-content">FAQs</div>}
    </div>
  );
};

export default Accordions;
