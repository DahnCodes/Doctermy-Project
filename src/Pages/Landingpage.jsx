import Navigationbar from "../Components/Navigationbar";
import { FaArrowDown, FaArrowRight, FaLocationDot } from "react-icons/fa6";
import heroimage from "../assets/heroupdate.png";
import hands from "../assets/pic1.png";
import icons from "../assets/pic2.png";
import hospital from "../assets/pic3.png";
import hos from "../assets/pic4.png";
import mission from "../assets/Mission.png";
import vision from "../assets/Vision.png";
import device from "../assets/device.png";
import randr from "../assets/randr.png";
import Footer from "../Components/Footer";
import quote from "../assets/quotes.png";
import quoteend from "../assets/quoteend.png";
import Navheader from "../Components/Navheader";
import billboard from "../assets/billboard.jpg";
// import Accordion from "../Components/Accordions";
import { useNavigate } from "react-router-dom";

import Accordions from "../Components/Accordions";
import Fifthaccordion from "../Components/Fifthaccordion";
import Secondaccordion from "../Components/Secondaccordion";
import Thirdaccordion from "../Components/Thirdaccordion";
import Fourthaccordion from "../Components/Fourthaccordion";
import Firstaccordion from "../Components/Firstaccordion";
import { IoMdStar } from "react-icons/io";

const Landingpage = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="hero-section">
        <Navheader />
        <div className="hero-sec">
          <Navigationbar />
          <div className="hero-container">
            <div className="hero-text">
              <h1>Streamlined appointments for better healthcare.</h1>

              <p>
                Seamlessly manage your appointment booking with us. Have
                patients at hospital or clinic when they absolutely need to be.{" "}
              </p>
              <div className="button-container">
                <button className="btn3">
                  Partner With Us
                  <FaArrowRight className="arrow" />
                </button>
              </div>
            </div>
            <div className="hero-img">
              <img src={heroimage} alt="" className="heroimage" />
            </div>
          </div>
        </div>
      </div>
      <main className="body-container">
        <div className="about-us">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              Doctermy is an appointment booking system for hospitals. Dedicated
              to transforming the management of healthcare services, we offer an
              organized system of managing appointments for hospitals and
              patients.
              <p>
                Our ethos revolves around patients experiencingbetter healthcare
                services with convenience. We pride ourselves with being
                empathetic and providing professional and reliable services to
                our users.
              </p>
            </p>
          </div>

          <div className="missions">
            <div className="our-mission">
              <img src={mission} className="miss-vision" />
              <h4>Our Mission</h4>
              <p>To simplify the appointment booking process for patients.</p>
            </div>

            <div className="our-vision">
              <img src={vision} className="miss-vision" />
              <h4>Our Vision</h4>
              <p>
                Organized healthcare services that optimizes patients outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="benefit-container">
          <div className="benefit-text">
            <h2>Benefits of using Doctermy</h2>
          </div>

          <div className="benefit-cards-container">
            <div className="benefit-cards">
              <img src={hands} alt="" className="book" />
              <h3 className="books">Better Healthcare Service</h3>
              <p className="books">
                Be at the hospital or clinic when you absolutely need to be! With
                our appointment booking system, patients can be at the hospital
                only when they have an appointment. This will help reduce
                queues, time wasting and disorganized medical service.
              </p>
            </div>
            <div className="benefit-cards">
              <img src={icons} alt="" />
              <h3>Enhanced Patient Experience</h3>
              <p>
                A satisfactory patient experience is of major importance to
                hospitals or clinics and healthcare service providers. A seamless
                appointment booking process ensures patients feel valued and
                cared for leading to stronger relationships and trust.
              </p>
            </div>
            <div className="benefit-cards">
              <img src={hospital} alt="" />
              <h3>Streamlined Operations</h3>
              <p>
                This system will help optimize appointment booking in hospitals.
                Giving room for automation and efficiency. An efficient system
                of rendering health services will attract new clients in need of
                such services.
              </p>
            </div>
            <div className="benefit-cards">
              <img src={hos} alt="" />
              <h3>Revenue Growth</h3>
              <p>
                An enhanced healthcare service equals a satisfactory patient
                experience which leads to new clients and then revenue growth.
                Good healthcare service can never be undervalued.
              </p>
            </div>
          </div>
        </div>

        <div className="ratings-container">
          <div className="ratings-text">
            <h2>Our Users Love Us</h2>
            <p>
              Hear from our users. With the service we provide there has been
              testimonies.
            </p>
          </div>

          <div className="rating-card-container">
            <div className="rating-card">
              <img src={quote} className="quote" />
              <img src={billboard} className="billboard" />
              <h3>Sundune Memorial</h3>
              <p>Hospital</p>
              <div className="rate">
                <p>
                  Since we integrated this system to manage our medical
                  appointments and scheduling, it's been more organized and
                  efficient. This is an upgrade for this hospital and the health
                  sector in Nigeria.
                </p>
                <div className="stars">
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                </div>
              </div>
              <img src={quoteend} className="quoteend" />
            </div>
            <div className="rating-card">
              <img src={quote} className="quote" />
              <img src={billboard} className="billboard" />
              <h3>Sundune Memorial</h3>
              <p>Doctor</p>
              <div className="rate">
                <p>
                  Since we integrated this system to manage our medical
                  appointments and scheduling, it has been more organized and
                  efficient. This is an upgrade for this hospital and the health
                  sector in Nigeria.
                </p>
                <div className="stars">
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                </div>
              </div>
              <img src={quoteend} className="quoteend" />
            </div>

            <div className="rating-card">
              <img src={quote} className="quote" />
              <img src={billboard} className="billboard" />
              <h3>Sundune Memorial</h3>
              <p>Patient</p>
              <div className="rate">
                <p>
                  Since we've integrated this system to manage our medical
                  appointments and scheduling, it's been more organized and
                  efficient. This is an upgrade for this hospital and the health
                  sector in Nigeria.
                </p>
                <div className="stars">
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                </div>
              </div>
              <img src={quoteend} className="quoteend" />
            </div>
          </div>
          <button className="btn12">See More</button>
        </div>

        <div className="faqs">
          <div className="faqs-text">
            <h2>Get answers to your questions</h2>
            <p>
              Have questions? Get them answered. Find answers to commonly asked
              questions.
            </p>

            <Firstaccordion />
            <Secondaccordion />
            <Thirdaccordion />
            <Fourthaccordion />
            <Fifthaccordion />
          </div>
        </div>

        <div className="demo-container">
          <div className="demo">
            <div className="phone-device">
              <img src={device} alt="" className="device" />
            </div>
            <h3>
              Want to get affiliated with us?<br></br>
              Request to see demo
            </h3>
            <button className="see-more">Request Demo</button>
          </div>
        </div>

        <div className="partners">
            <h2>Our Partners</h2>
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Landingpage;
