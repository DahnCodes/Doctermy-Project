import { useState } from "react"
import emptybox from "../assets/emptybox.png"
import Sidebar from "../Components/Sidebar";
import Headers from "../Components/Headers";
import Dashboardnavigation from "../Components/Dashboardnavigation";
import "../Styles/Home.css"


const Completed = () => {
    const [completedAppointments, setCompletedAppointments] = useState([]);

  return (

    <>
    <Dashboardnavigation/>
    <div className="grid-container">
        <Sidebar/>

        <Headers/>
        {completedAppointments.length === 0 ? (
                    <div className="pend-container">
                      <div className="pends">
                        <img src={emptybox} className="box" />
                      </div>
                      <p>No completed appointments</p>
                    </div>
                ) : (
                  <div>
                    <h2>Hello</h2>
                  </div>
                )}
            
    </div>
    </>
  )
}

export default Completed