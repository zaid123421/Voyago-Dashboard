import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/dashboard-logo.png'
import { useContext } from 'react';
import { User } from '../Pages/Context';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { dom } from '../Pages/dom';
import darklogo from '../images/Asset 17.png';
import { MyStringContext } from '../Pages/MyStringProvider';

export default function Sidebar(props) {
  // useNavigate
  const nav = useNavigate();

  // useContext
  const userInfo = useContext(User);

  // Variables
  const token = userInfo.auth.userAccessToken;
  const refreshToken = userInfo.auth.userRefreshToken;

  // Cookies
  const cookie = new Cookies();

  function handleLogout() {
    axios.delete(`http://${dom}/web/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        refresh_token: refreshToken
      }
    })
    .then(res => {
      cookie.remove('userAccessToken', { path: '/' });
      cookie.remove('userRefreshToken', { path: '/' });
      cookie.remove('userRole', { path: '/' });
      cookie.remove('userName', { path: '/' });
      userInfo.setAuth({});
      nav('/')
    })
    .catch(err => {
      console.error('Error during logout:', err);
    });
  }
  const { myString, setMyString } = useContext(MyStringContext);
  return(
    <div className = 'sidebar'> 
    <div className = 'logo-text mb-20 d-flex justify-c'>
      {
        myString === "dark" ? <img alt='logo' src = {logo} />:
        myString === "light" ? <img className='darklogo' alt='logo' src = {darklogo} />: ''
      }
      
    </div>
      {userInfo.auth.userRole === 'Super Admin' ?
            <div className = 'nav-links d-flex flex-d-c'>
            <NavLink to = "/dashboard" className = {props.number === 1 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className = "fa-solid fa-chart-simple fs-18"></i>
              Dashboard
            </NavLink>
            <NavLink to = "/admins" className = {props.number === 2 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className = "fa-solid fa-user-tie fs-18"></i>
              Admins
            </NavLink>
            <NavLink to = "/users" className = {props.number === 3 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className = "fa-solid fa-users fs-18"></i>
              Users
            </NavLink>
            <NavLink to = "/trips" className = {props.number === 4 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className = "fa-solid fa-briefcase fs-18"></i>
              Trips
            </NavLink>
            <NavLink to = "/attractions" className = {props.number === 5 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className = "fa-solid fa-globe"></i>
              Attractions
            </NavLink>
            <NavLink to = "/destinations" className = {props.number === 6 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className = "fa-solid fa-location-dot"></i>
              Destinations
            </NavLink>
            <NavLink to = "/reservations" className = {props.number === 7 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className="fa-solid fa-table-list"></i>
              Reservations
            </NavLink>
            <NavLink to = "/transactions" className = {props.number === 8 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className = "fa-solid fa-money-bill-transfer"></i>
              Transactions
            </NavLink>
            <NavLink to = "/requests" className = {props.number === 9 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
              <i className = "fa-regular fa-hand"></i>
              Requests
            </NavLink>
            <button onClick= {handleLogout} className = "d-flex align-c item-link logout">
              <i className="fa-solid fa-arrow-right-from-bracket fs-18"></i>
              Log Out
            </button>
          </div>
          : userInfo.auth.userRole === 'Admin' ?
          <div className = 'nav-links d-flex flex-d-c'>
          <NavLink to = "/dashboard" className = {props.number === 1 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className = "fa-solid fa-chart-simple fs-18"></i>
            Dashboard
          </NavLink>
          <NavLink to = "/users" className = {props.number === 3 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className = "fa-solid fa-users fs-18"></i>
            Users
          </NavLink>
          <NavLink to = "/trips" className = {props.number === 4 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className = "fa-solid fa-briefcase fs-18"></i>
            Trips
          </NavLink>
          <NavLink to = "/attractions" className = {props.number === 5 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
          <i className = "fa-solid fa-globe"></i>
            Attractions
          </NavLink>
          <NavLink to = "/destinations" className = {props.number === 6 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className = "fa-solid fa-location-dot"></i>
            Destinations
          </NavLink>
          <NavLink to = "/reservations" className = {props.number === 7 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className="fa-solid fa-table-list"></i>
            Reservations
          </NavLink>
          <NavLink to = "/transactions" className = {props.number === 8 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className = "fa-solid fa-money-bill-transfer"></i>
            Transactions
          </NavLink>
          <NavLink to = "/requests" className = {props.number === 9 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
            <i className = "fa-regular fa-hand"></i>
            Requests
          </NavLink>
          <button onClick= {handleLogout} className = "d-flex align-c item-link logout">
            <i className="fa-solid fa-arrow-right-from-bracket fs-18"></i>
            Log Out
          </button>
        </div>
        : userInfo.auth.userRole === 'Trips Organizer' ?
        <div className = 'nav-links d-flex flex-d-c'>
        <NavLink to = "/dashboard" className = {props.number === 1 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
          <i className = "fa-solid fa-chart-simple fs-18"></i>
          Dashboard
        </NavLink>
        <NavLink to = "/users" className = {props.number === 3 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
          <i className = "fa-solid fa-users fs-18"></i>
          Users
        </NavLink>
        <NavLink to = "/trips" className = {props.number === 4 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
          <i className = "fa-solid fa-briefcase fs-18"></i>
          Trips
        </NavLink>
        <NavLink to = "/attractions" className = {props.number === 5 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
        <i className = "fa-solid fa-globe"></i>
          Attractions
        </NavLink>
        <NavLink to = "/destinations" className = {props.number === 6 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
          <i className = "fa-solid fa-location-dot"></i>
          Destinations
        </NavLink>
        <button onClick= {handleLogout} className = "d-flex align-c item-link logout">
          <i className="fa-solid fa-arrow-right-from-bracket fs-18"></i>
          Log Out
        </button>
      </div>
      : userInfo.auth.userRole === 'Accountant' ?
      <div className = 'nav-links d-flex flex-d-c'>
      <NavLink to = "/dashboard" className = {props.number === 1 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
        <i className = "fa-solid fa-chart-simple fs-18"></i>
        Dashboard
      </NavLink>
      <NavLink to = "/users" className = {props.number === 3 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
        <i className = "fa-solid fa-users fs-18"></i>
        Users
      </NavLink>
      <NavLink to = "/reservations" className = {props.number === 7 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
        <i className="fa-solid fa-table-list"></i>
        Reservations
      </NavLink>
      <NavLink to = "/transactions" className = {props.number === 8 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
        <i className = "fa-solid fa-money-bill-transfer"></i>
        Transactions
      </NavLink>
      <NavLink to = "/requests" className = {props.number === 9 ? "active-link d-flex align-c item-link" : "d-flex align-c item-link"}>
        <i className = "fa-regular fa-hand"></i>
        Requests
      </NavLink>
      <button onClick= {handleLogout} className = "d-flex align-c item-link logout">
        <i className="fa-solid fa-arrow-right-from-bracket fs-18"></i>
        Log Out
      </button>
    </div>
      : ''}
    </div>
  )
}