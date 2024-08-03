import Navigationbar from "../Components/Navigationbar";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import heroimage from "../assets/heroimage.png";
import { FaLocationDot } from "react-icons/fa6";
import billboard from "../assets/billboard.jpg";
import mission from "../assets/Mission.png";
import vision from "../assets/Vision.png";
import randr from "../assets/randr.png";
import Footer from "../Components/Footer";

const Landingpage = () => {
  return (
    <>
      <div className="hero-section">
        <div className="hero-sec">
          <Navigationbar />
          <div className="hero-container">
            <div className="hero-text">
              <h1>
                Meet with your<br></br> doctor more<br></br> conveniently.
              </h1>

              <p>
                Why waste precious time in inconvenience?<br></br> Let us help
                you book appointments with<br></br> doctors with more
                efficiently. Be at the <br></br>hospital when you absolutely
                need be.
              </p>
              <div className="button-container">
                <button className="btn3">
                  Get Appointment
                  <FaArrowRight className="arrow" />
                </button>
              </div>
            </div>
            <div className="hero-img">
              <img src={heroimage} alt="" />
            </div>
          </div>
        </div>
      </div>
      <main className="body-container">
        <div className="bodytexts">
          <h2 className="body-text">Our Partners</h2>
          <p>
            Take a look at the hospitals we’ve partnered with to deliver better
            healthcare services.
          </p>
        </div>

        <div className="card-container">
          <div className="cards">
            <img src={billboard} className="hospitals" />
            <h4>Sundune Memorial Hospital</h4>
            <div className="card-location">
              <FaLocationDot />
              <p>Enugu, Enugu State</p>
            </div>
          </div>

          <div className="cards">
            <img src={billboard} className="hospitals" />
            <h4>Romlon Hospital</h4>
            <div className="card-location">
              <FaLocationDot />
              <p>Enugu, Enugu State</p>
            </div>
          </div>

          <div className="cards">
            <img src={billboard} className="hospitals" />
            <h4>Delogwu Hospital</h4>
            <div className="card-location">
              <FaLocationDot />
              <p>Enugu, Enugu State</p>
            </div>
          </div>
        </div>

        <div className="circle">
          <FaArrowDown className="arrow-down" />
        </div>

        <div className="demo">
          <h3>
            Get affiliated with us as a hospital.<br></br>
            See how it works.
          </h3>
          <button className="see-more">See Demo</button>
        </div>

        <div className="about-us">
          <div className="about-text">
            <h3>About Us</h3>
            <p>
              Our ethos revolves around patients experiencing better healthcare
              services with<br></br> convenience. We pride ourselves with being
              empathetic and providing professional<br></br> and reliable
              services to our users.
            </p>
          </div>

          <div className="missions">
            <div className="our-mission">
              <img src={mission} className="miss-vision"/>
              <h4>Our Mission</h4>
              <p>
                To simplify the appointment booking process for<br></br>{" "}
                patients.
              </p>
            </div>

            <div className="our-vision">
              <img src={vision} className="miss-vision"/>
              <h4>Our Vision</h4>
              <p>
                Organized healthcare services that optimizes<br></br> patients
                outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="reviews">
          <div className="review-img">
            <img src={randr} className="rev-img"/>
          </div>

          <div className="review-text">
            <h2>Hear from our<br></br> users </h2>
            <p>
              With the service we provide there has been<br></br> testimonies. People
              have been able to save time<br></br> and prevent queueing just to receive
              appointments<br></br> and a more organized hospital atmosphere.
            </p>

            <button className="read-more">Read More</button>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Landingpage;
