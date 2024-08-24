import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  useEffect(() => {
    axios.get(`http://${dom}/web/attractions`)
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
        </div>
        <NavLink className="floating-button" to="/addattraction">
          +
        </NavLink>
      </div>
    </>
  );
}
