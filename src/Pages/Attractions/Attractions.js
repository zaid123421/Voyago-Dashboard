import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";
import Santiago from '../../images/santiago.jpg'
import Umayyad_Square from '../../images/Umayyad_Square.jpg'
import Salah_Castle from '../../images/Salah-al-Din-al-Ayyubi-Citadel.jpg'
import Potsdamer_Platz from '../../images/Potsdamer_Platz.jpeg'
import palace_of_westminster from '../../images/palace_of_westminster.jpg'
import dubrovnik from '../../images/dubrovnik.webp'

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  useEffect(() => {
    axios.get(`https://${dom}/web/attractions`)
      .then((response) => {
        console.log(response.data);
        setAttractions(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  const showAttractions = attractions.map((attraction, index) => {
    // const imageUrl = attraction.Images.length > 0 ? attraction.Images[0].url : '';
    const imageUrl = (attraction.Images[0].url).slice(0,7) + dom + (attraction.Images[0].url).slice(21);
    return (
      <div style={{backgroundImage: `url(${imageUrl})`}}>
        <div className="head">
          <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
          <div className="fs-14">
            <i className="fa-solid fa-star mr-5"></i>
            <span className="fw-600">{attraction.rate}</span>
          </div>
        </div>
        <div className="card-info">
          <h3 className="fw-600 text-c">{attraction.name}</h3>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <Sidebar number={5} />
      <div className="content">
        <h1 className = "mb-15 special-head">Attractions</h1>
        <div className="trips-container attractions-container">
          {showAttractions}
          <div style={{backgroundImage: `url(${Umayyad_Square})`}}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">{4.1}</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Umayyad Square</h3>
            </div>
          </div>
          <div style={{backgroundImage: `url(${Santiago})`}}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">{4.6}</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Santiago Bernabue</h3>
            </div>
          </div>
          <div style={{backgroundImage: `url(${Salah_Castle})`}}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">4.7</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Salah Aldeen Alayoubi Castle</h3>
            </div>
          </div>
          <div style={{backgroundImage: `url(${Potsdamer_Platz})`}}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">3.4</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Potsdamer Platz</h3>
            </div>
          </div>
          <div style={{backgroundImage: `url(${palace_of_westminster})`}}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">3.9</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Palace Of Westminster</h3>
            </div>
          </div>
          <div style={{backgroundImage: `url(${dubrovnik})`}}>
            <div className="head">
              <i className="fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5"></i>
                <span className="fw-600">4.1</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">Dubrovnik</h3>
            </div>
          </div>
        </div>
        <NavLink className="floating-button" to="/addattraction">
          +
        </NavLink>
      </div>
    </>
  );
}
