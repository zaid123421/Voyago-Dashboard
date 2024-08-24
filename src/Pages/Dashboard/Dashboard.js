import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import {Bar} from 'react-chartjs-2';
import { Data } from "./Statistics";
import { Chart as ChartJs } from 'chart.js/auto'
import BarChart from "../../Components/BarChart";
import axios from "axios";
import { User } from "../Context";
import { dom } from "../dom";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState();
  const [totalBookings, setTotalBookings] = useState();
  const [todayUsers, setTodayUsers] = useState();
  const [todayBookings, setTodayBookings] = useState();
  const [topTrips, setTopTrips] = useState([]);
  const [topDestinations, setTopDestinations] = useState([]);

  const [i, setI] = useState();

  const userInfo = useContext(User);

  const token = userInfo.auth.userAccessToken;

  const [statictics, setStatictics] = useState({
    labels: Data.map((data) => data.Month),
    datasets: [
      {
        label: "Visitors Analytics",
        data: Data.map((data) => data.Visitors),
        backgroundColor: [
          "rgba(140, 65, 239, 1)",
        ],
        barThickness: 20,
        borderRadius: 10,
      },
    ],
  });

  useEffect(() => {
    let res = axios.get(`http://${dom}/web/overview_users`,
      {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setTotalUsers(res.data.data.total_users)
      setTotalBookings(res.data.data.total_booking)
      setTodayUsers(res.data.data.todayUsers)
      setTodayBookings(res.data.data.todayBookings)
    })
  }, [])

  useEffect(() => {
    let res1 = axios.get(`http://${dom}/web/top_trips`,
      {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res.data.data.result)
      setTopTrips(res.data.data.result)
    })
  }, [])

  useEffect(() => {
    let res2 = axios.get(`http://${dom}/web/top_destinations`,
      {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res.data.data.result)
      setTopDestinations(res.data.data.result)
    })
  }, [])

  const showTopDestinations = topDestinations.map((topDestination, index) => {
    const rate = parseFloat(topDestination.rate);
    const starCount = !isNaN(rate) ? (rate === 0 ? 1 : Math.min(Math.max(Math.floor(rate), 0), 5)) : 0;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return (
      <tr key={index}>
        <td className="fw-300">{index + 1}</td>
        <td className="fw-300"><p>{topDestination.name}</p></td>
        <td>
          <div>
            {stars}
          </div>
        </td>
      </tr>
    );
  });


  const showTopTrips = topTrips.map((topTrip, index) => {
    const rate = parseFloat(topTrip.rate);
    const starCount = !isNaN(rate) ? (rate === 0 ? 1 : Math.min(Math.max(Math.floor(rate), 0), 5)) : 0;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return (
      <tr key={index}>
        <td className="fw-300">{index + 1}</td>
        <td className="fw-300"><p>{topTrip.name}</p></td>
        <td>
          <div className = "d-flex justify-c">
            {stars}
          </div>
        </td>
        <td className="fw-300"><span>{topTrip.bookings}</span></td>
      </tr>
    );
  });

  return(
    <>
      <Header />
      <Sidebar number = {1} />
      <div className = "content">
        <div className = "overview-first-box">
        <div className = "overview-content-1">
        <h4 className = "mb-20">Total Users</h4>
        <div className = "overview-box-content">
          <h2>
            {totalUsers}
          </h2>
          <i className = "fa-solid fa-users"></i>
        </div>
      </div>
      <div className = "overview-content-2">
        <h4 className = "mb-20">Total Bookings</h4>
        <div className = "overview-box-content">
          <h2>{totalBookings}</h2>
          <i className = "fa-solid fa-money-check"></i>
        </div>
      </div>
      <div className = "overview-content-3">
        <h4 className = "mb-20">Today's New Users</h4>
        <div className = "overview-box-content">
          <h2>{todayUsers}</h2>
          <i className = "fa-solid fa-user-plus"></i>
        </div>
      </div>
      <div className = "overview-content-4">
        <h4 className = "mb-20">Today's New Bookings</h4>
        <div className = "overview-box-content">
          <h2>{todayBookings}</h2>
          <i className = "fa-solid fa-money-check"></i>
        </div>
      </div>
        </div>
        <div className = "overview-second-box mt-25">
          <div className = "overview-content-5">
            <BarChart chartData = {statictics} />
          </div>
        </div>
        <div className = "overview-third-box mt-25">
        <div className = "overview-content-7">
          <h2 className = "mb-30">Top Trips</h2>
          <table className = "top-trips-table">
            <thead>
              <tr>
                <th className = "fw-300">#</th>
                <th className = "fw-300">Name</th>
                <th className = "fw-300">Reviews</th>
                <th className = "fw-300">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {showTopTrips}
            </tbody>
          </table>
        </div>
        <div className = "overview-content-8">
          <h2 className = "mb-30">Top Destinations</h2>
          <table className = "top-trips-table">
            <thead>
              <tr>
                <th className = "fw-300">#</th>
                <th className = "fw-300">Name</th>
                <th className = "fw-300">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {showTopDestinations}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  );
}