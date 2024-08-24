import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import spain from "../../images/spain.jpg"
import spain2 from "../../images/santiago.jpg"

export default function DestinationDetails() {
  return(
    <>
      <Header />
      <Sidebar number={6} />
      <div className="content">
        <div className = "destination-details-header mb-15">
          <NavLink to = "/destinations">
            <i className="fa-solid fa-angle-left"></i>
          </NavLink>
        <h1 className = "ml-20 special-head">Destination Details</h1>
        </div>
        <div className = "destination-details-container">
          <div className = "images-slider">
            <span className = "destination-details-name">Spain</span>
            <img src = {spain}></img>
          </div>
          <div>
            <div className = "mt-25 d-flex justify-sb">
              <div>
                <i className ="mr-10 fa-solid fa-location-dot"></i>
                <span>Madrid, </span>
                <span>Spain</span>
              </div>
              <div>
                <i className="fa-regular fa-trash-can fs-14"></i>
              </div>
            </div>
            <div className = "mt-10">
              <i className = "fa-solid fa-star"></i>
              <span className="ml-15">4.5</span>
              <h2 className = "mt-20 fw-600">Description</h2>
              <p className = "mt-5 mb-20">This is Decription, Hola Madristas This Is Description For Our Destination,
              We Hope You Like That, If You Like It Dont Forget To Like And Share With Your Frineds.</p>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}