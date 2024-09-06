import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";
import Damascus from '../../images/Damascus.jpeg'
import Cairo from '../../images/Cairo.jpeg'
import Zagreb from '../../images/Zagreb.jpeg'
import London from '../../images/London.jpg'
import Paris from '../../images/Paris.jpeg'
import Madrid from '../../images/madrid.jpg'
import Cardiff from '../../images/Cardiff.jpeg'
import Rome from '../../images/Rome.jpg'
import Berlin from '../../images/Berlin.jpg'

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  useEffect(() => {
    axios.get(`https://${dom}/web/destenations`)
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
          <div style={{ backgroundImage: `url(${Damascus})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">4.8</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Damascus</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Cairo})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">4.8</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Cairo</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Madrid})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">4.7</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Madrid</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Paris})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">1.4</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Paris</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Berlin})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">3.5</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Berlin</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Rome})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">4.4</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Rome</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Cardiff})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">3.7</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Cardiff</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${Zagreb})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">4</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Zagreb</h3>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${London})` }}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">3.1</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">London</h3>
            </div>
          </div>
        </div>
        <NavLink className="floating-button" to="/adddestination">
          +
        </NavLink>
      </div>
    </>
  );
}
