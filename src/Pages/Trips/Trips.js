import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { dom } from "../dom";
import barcelona from '../../images/barcelona.jpg'
import palmyra from '../../images/palmyra.jpg'
import dubai from '../../images/dubai.webp'
import samra from '../../images/samra.jpg'
import maldiv from '../../images/maldiv.jpeg'
import moscow from '../../images/moscow.jpg'

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [runUseEffect, setRun] = useState(0);
  const [days, setDays] = useState();

  useEffect(() => {
    axios.get(`https://${dom}/web/trip_cards`)
      .then((response) => {
        console.log(response.data.data.cards);
        setTrips(response.data.data.cards);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  const showTrips = trips.map((trip, index) => {
    // const imageUrl = trip.images[0].url;
    const imageUrl = (trip.images[0].url).slice(0,7) + dom + (trip.images[0].url).slice(21);
    return (
      <div style = {{backgroundImage: `url(${imageUrl})`}}>
      <div className = "head">
        <i  onClick = {() => deleteTrip(trip.rate.id)} className = "fa-regular fa-trash-can trip-trash fs-14"></i>
        <div className = "fs-14">
          <i className = "fa-solid fa-star mr-5"></i>
          <span className = "fw-600">{trip.rate.rate}</span>
        </div>
      </div>
      <div className = 'card-info'>
        <h3 className = 'fw-600'>{trip.rate.name}</h3>
        <div className = "mb-5">
          <span className = "how">{trip.rate.capacity - trip.rate.available_capacity} / {trip.rate.capacity} reserved</span>
          <span className = "state">{trip.rate.avilable === 1 ? "Avaliable" : "Not Avaliable"}</span>
        </div>
        <div className = "mb-5">
          <i className = "fa-solid fa-location-dot mr-10"></i>
          <span className = "fs-14">{trip.Destenation}</span>
        </div>
        <div className = "mb-5">
          <i className = "fa-regular fa-calendar-days mr-10"></i>
          <span className = "fs-14">
            {
              (trip.rate.start_date).slice(8, 10) === "01" ? "1"
              : (trip.rate.start_date).slice(8, 10) === "02" ? "2"
              : (trip.rate.start_date).slice(8, 10) === "03" ? "3"
              : (trip.rate.start_date).slice(8, 10) === "04" ? "4"
              : (trip.rate.start_date).slice(8, 10) === "05" ? "5"
              : (trip.rate.start_date).slice(8, 10) === "06" ? "6"
              : (trip.rate.start_date).slice(8, 10) === "07" ? "7"
              : (trip.rate.start_date).slice(8, 10) === "08" ? "8"
              : (trip.rate.start_date).slice(8, 10) === "09" ? "9"
              : (trip.rate.start_date).slice(8, 10)
            }
            <span className = "ml-5 mr-5">-</span>
            {
                (trip.rate.end_date).slice(8, 10) === "01" ? "1"
              : (trip.rate.end_date).slice(8, 10) === "02" ? "2"
              : (trip.rate.end_date).slice(8, 10) === "03" ? "3"
              : (trip.rate.end_date).slice(8, 10) === "04" ? "4"
              : (trip.rate.end_date).slice(8, 10) === "05" ? "5"
              : (trip.rate.end_date).slice(8, 10) === "06" ? "6"
              : (trip.rate.end_date).slice(8, 10) === "07" ? "7"
              : (trip.rate.end_date).slice(8, 10) === "08" ? "8"
              : (trip.rate.end_date).slice(8, 10) === "09" ? "9"
              : (trip.rate.end_date).slice(8, 10)
            }
            <span className = "ml-5 mr-5">/</span>
            {
              (trip.rate.end_date).slice(5,7) === "01" ? "January"
              : (trip.rate.end_date).slice(5,7) === "02" ? "February"
              : (trip.rate.end_date).slice(5,7) === "03" ? "March"
              : (trip.rate.end_date).slice(5,7) === "04" ? "April"
              : (trip.rate.end_date).slice(5,7) === "05" ? "May"
              : (trip.rate.end_date).slice(5,7) === "06" ? "June"
              : (trip.rate.end_date).slice(5,7) === "07" ? "July"
              : (trip.rate.end_date).slice(5,7) === "08" ? "August"
              : (trip.rate.end_date).slice(5,7) === "09" ? "September"
              : (trip.rate.end_date).slice(5,7) === "10" ? "October"
              : (trip.rate.end_date).slice(5,7) === "11" ? "November"
              : (trip.rate.end_date).slice(5,7) === "12" ? "December"
              : ''
            }
          </span>
        </div>
        <div>
          <i className = "fa-solid fa-clock mr-10"></i>
          <span className = "fs-14">{trip.duration} day(s)</span>
        </div>
        <span className = "fs-14 price">From ${trip.rate.trip_price}</span>
      </div>
    </div>
    );
  });

  async function deleteTrip(id) {
    try{
      let res = await axios.delete(`https://${dom}/web/delete_trip/${id}`);
      if(res.status === 200)
      setRun((prev) => prev + 1);
    }
    catch(err) {
      console.log(err);
    }
  }

  return(
    <>
      <Header />
      <Sidebar number = {4} />
      <div className = "content">
        <h1 className = "mb-15 special-head">Trips</h1>
        <div className = "trips-container position-relative">
          {/* {showTrips} */}
          <div style = {{backgroundImage: `url(${barcelona})`}}>
            <div className = "head">
              <i className = "fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className = "fs-14">
                <i className = "fa-solid fa-star mr-5"></i>
                <span className = "fw-600">2.3</span>
              </div>
            </div>
            <div className = 'card-info'>
              <h3 className = 'fw-600'>Rest In Barcelona</h3>
              <div className = "mb-5">
                <span className = "how">15 / 50 reserved</span>
                <span className = "state">Avaliable</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-solid fa-location-dot mr-10"></i>
                <span className = "fs-14">Barcelona</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-regular fa-calendar-days mr-10"></i>
                <span className = "fs-14">
                  23-24 Sep
                </span>
              </div>
              <div>
                <i className = "fa-solid fa-clock mr-10"></i>
                <span className = "fs-14">2 day(s)</span>
              </div>
              <span className = "fs-14 price">From $380</span>
            </div>
          </div>
          <div style = {{backgroundImage: `url(${palmyra})`}}>
            <div className = "head">
              <i className = "fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className = "fs-14">
                <i className = "fa-solid fa-star mr-5"></i>
                <span className = "fw-600">3.4</span>
              </div>
            </div>
            <div className = 'card-info'>
              <h3 className = 'fw-600'>Legacy Of Palmyra</h3>
              <div className = "mb-5">
                <span className = "how">7 / 25 reserved</span>
                <span className = "state">Avaliable</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-solid fa-location-dot mr-10"></i>
                <span className = "fs-14">Homs</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-regular fa-calendar-days mr-10"></i>
                <span className = "fs-14">
                  11 Oct
                </span>
              </div>
              <div>
                <i className = "fa-solid fa-clock mr-10"></i>
                <span className = "fs-14">1 day(s)</span>
              </div>
              <span className = "fs-14 price">From $75</span>
            </div>
          </div>
          <div style = {{backgroundImage: `url(${dubai})`}}>
            <div className = "head">
              <i className = "fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className = "fs-14">
                <i className = "fa-solid fa-star mr-5"></i>
                <span className = "fw-600">1.3</span>
              </div>
            </div>
            <div className = 'card-info'>
              <h3 className = 'fw-600'>Fun Days</h3>
              <div className = "mb-5">
                <span className = "how">93 / 100 reserved</span>
                <span className = "state">Avaliable</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-solid fa-location-dot mr-10"></i>
                <span className = "fs-14">Dubai</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-regular fa-calendar-days mr-10"></i>
                <span className = "fs-14">
                  25-28
                </span>
              </div>
              <div>
                <i className = "fa-solid fa-clock mr-10"></i>
                <span className = "fs-14">4 day(s)</span>
              </div>
              <span className = "fs-14 price">From $1500</span>
            </div>
          </div>
          <div style = {{backgroundImage: `url(${samra})`}}>
            <div className = "head">
              <i className = "fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className = "fs-14">
                <i className = "fa-solid fa-star mr-5"></i>
                <span className = "fw-600">4.1</span>
              </div>
            </div>
            <div className = 'card-info'>
              <h3 className = 'fw-600'>Calm Village</h3>
              <div className = "mb-5">
                <span className = "how">6 / 20 reserved</span>
                <span className = "state">Avaliable</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-solid fa-location-dot mr-10"></i>
                <span className = "fs-14">Lattakia</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-regular fa-calendar-days mr-10"></i>
                <span className = "fs-14">
                  17-18 Sep
                </span>
              </div>
              <div>
                <i className = "fa-solid fa-clock mr-10"></i>
                <span className = "fs-14">2 day(s)</span>
              </div>
              <span className = "fs-14 price">From $150</span>
            </div>
          </div>
          <div style = {{backgroundImage: `url(${maldiv})`}}>
            <div className = "head">
              <i className = "fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className = "fs-14">
                <i className = "fa-solid fa-star mr-5"></i>
                <span className = "fw-600">2.3</span>
              </div>
            </div>
            <div className = 'card-info'>
              <h3 className = 'fw-600'>Beautiful Moments</h3>
              <div className = "mb-5">
                <span className = "how">72 / 125 reserved</span>
                <span className = "state">Avaliable</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-solid fa-location-dot mr-10"></i>
                <span className = "fs-14">Maldives</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-regular fa-calendar-days mr-10"></i>
                <span className = "fs-14">
                  23-24 Nov
                </span>
              </div>
              <div>
                <i className = "fa-solid fa-clock mr-10"></i>
                <span className = "fs-14">2 day(s)</span>
              </div>
              <span className = "fs-14 price">From $3550</span>
            </div>
          </div>
          <div style = {{backgroundImage: `url(${moscow})`}}>
            <div className = "head">
              <i className = "fa-regular fa-trash-can trip-trash fs-14"></i>
              <div className = "fs-14">
                <i className = "fa-solid fa-star mr-5"></i>
                <span className = "fw-600">4.5</span>
              </div>
            </div>
            <div className = 'card-info'>
              <h3 className = 'fw-600'>Moscow tour</h3>
              <div className = "mb-5">
                <span className = "how">18 / 30 reserved</span>
                <span className = "state">Avaliable</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-solid fa-location-dot mr-10"></i>
                <span className = "fs-14">Moscow</span>
              </div>
              <div className = "mb-5">
                <i className = "fa-regular fa-calendar-days mr-10"></i>
                <span className = "fs-14">
                  25-27 Nov
                </span>
              </div>
              <div>
                <i className = "fa-solid fa-clock mr-10"></i>
                <span className = "fs-14">3 day(s)</span>
              </div>
              <span className = "fs-14 price">From $2750</span>
            </div>
          </div>
        </div>
        <NavLink className = "floating-button" to = "/addtrip">
          +
        </NavLink>
      </div>
    </>
  );
}