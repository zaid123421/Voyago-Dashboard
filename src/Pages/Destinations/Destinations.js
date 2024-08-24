import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  useEffect(() => {
    axios.get(`http://${dom}/web/destenations`)
      .then((response) => {
        console.log(response.data);
        setDestinations(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  const showDestinations = destinations.map((destination, index) => {
    // const imageUrl = destination.Images.length > 0 ? destination.Images[0].url : '';
    const imageUrl = (destination.Images[0].url).slice(0,7) + dom + (destination.Images[0].url).slice(21);
    console.log(imageUrl);
    return (
      <div style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="head">
          <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
          <div className="fs-14">
            <i className="fa-solid fa-star mr-5"></i>
            <span className="fw-600">{destination.rate}</span>
          </div>
        </div>
        <div className="card-info">
          <h3 className="fw-600 text-c">{destination.name}</h3>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <Sidebar number={6} />
      <div className="content">
        <h1 className = "mb-15 special-head">Destinations</h1>
        <div className="trips-container attractions-container">
          {showDestinations}
        </div>
        <NavLink className="floating-button" to="/adddestination">
          +
        </NavLink>
      </div>
    </>
  );
}
