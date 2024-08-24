// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import logo from '../../images/dashboard-logo.png'
// import avatar from '../../images/avatar.png';
// import { useContext, useEffect, useState } from 'react';
// import { User } from '../Context';
// import axios from 'axios';
// import DarkMode from '../../Components/DarkMode';
// import Cookies from 'universal-cookie';

// export default function Home() {
//   // useNavigate
//   const nav = useNavigate();

//   // useContext
//   const userInfo = useContext(User);

//   // Variables
//   const token = userInfo.auth.userAccessToken;
//   const refreshToken = userInfo.auth.userRefreshToken;

//   // Cookies
//   const cookie = new Cookies();

// function handleLogout() {
//   axios.delete('http://localhost:3000/web/logout', {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     data: {
//       refresh_token: refreshToken 
//     }
//   })
//   .then(res => {
//     cookie.remove('userAccessToken', { path: '/' });
//     cookie.remove('userRefreshToken', { path: '/' });
//     cookie.remove('userRole', { path: '/' });
//     cookie.remove('userName', { path: '/' });
//     userInfo.setAuth({});
//     nav('/')
//   })
//   .catch(err => {
//     console.error('Error during logout:', err);
//   });
// }

//   return(
//     <div className = 'page d-flex'>
//       {/* <div className = 'sidebar'>
//       <div className = 'logo-text mb-20 d-flex justify-c'>
//           <img alt = 'logo' src = {logo} />
//         </div>
//         <div className = 'nav-links d-flex flex-d-c'>
//           <NavLink activeclassname = "active" to = "/home/dashboard" className = "d-flex align-c item-link">
//             <i className = "fa-solid fa-chart-simple fs-18"></i>
//             Dashboard
//           </NavLink>
//           <NavLink activeclassname = "active" to = "/home/admins" className = "d-flex align-c item-link">
//             <i className = "fa-solid fa-user-tie fs-18"></i>
//             Admins
//           </NavLink>
//           <NavLink activeclassname = "active" to = "/home/users" className = "d-flex align-c item-link">
//             <i className = "fa-solid fa-users fs-18"></i>
//             Users
//           </NavLink>
//           <NavLink activeclassname = "active" to = "/home/trips" className = "d-flex align-c item-link">
//             <i className = "fa-solid fa-briefcase fs-18"></i>
//             Trips
//           </NavLink>
//           <NavLink activeclassname = "active" to = "/home/attractions" className = "d-flex align-c item-link">
//           <i className = "fa-solid fa-globe"></i>
//             Attractions
//           </NavLink>
//           <NavLink activeclassname = "active" to = "/home/destinations" className = "d-flex align-c item-link">
//             <i className = "fa-solid fa-location-dot"></i>
//             Destinations
//           </NavLink>
//           <NavLink activeclassname = "active" to = "/home/reservations" className = "d-flex align-c item-link">
//             <i className="fa-solid fa-table-list"></i>
//             Reservations
//           </NavLink>
//           <NavLink activeclassname = "active" to = "/home/transactions" className = "d-flex align-c item-link">
//             <i className = "fa-solid fa-money-bill-transfer"></i>
//             Transactions
//           </NavLink>
//           <button onClick= {handleLogout} className = "d-flex align-c item-link logout">
//             <i className="fa-solid fa-arrow-right-from-bracket fs-18"></i>
//             Log Out
//           </button>
//         </div>
//       </div> */}
//       {/* <div className = 'header d-flex align-c'>
//         <div className = 'd-flex'>
//           <DarkMode />
//           <div className = 'avatar-text d-flex flex-d-c justify-c'>
//             <h3 className = 'fw-600'>{userInfo.auth.userName}</h3>
//             <h4 className = "fs-14 fw-500">{userInfo.auth.userRole}</h4>
//           </div>
//           <img alt = 'avatar' src = {avatar} />
//         </div>
//       </div> */}
//       <div className = 'content'>
//         <Outlet />
//       </div>
//     </div>
//   );
// }