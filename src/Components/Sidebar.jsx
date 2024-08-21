import { GoHomeFill } from "react-icons/go";
import { TbCalendarClock } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();
     const handleHome = () =>{
    navigate("/bookappointment")
     }

     const handleDash = () => {
        navigate("/home")
     }
  return (
    <div className="grid-container">
      <div className="item1">
        <div className="item-icons">
          <div className="home" onClick={handleDash}>
            <GoHomeFill className="home" />
            <p>Home</p>
          </div>

          <div className="home" onClick={handleHome}>
            <TbCalendarClock className="calendar"  />
            <p>Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
