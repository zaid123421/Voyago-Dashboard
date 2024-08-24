import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../images/dashboard-logo.png'
import avatar from '../images/avatar.png';
import { useContext } from 'react';
import DarkMode from './Dark Mode/DarkMode';
import { User } from '../Pages/Context';

export default function Header() {
  // useContext
  const userInfo = useContext(User);

  return(
    <div className = 'header d-flex align-c'>
      <div className = 'd-flex'>
        <DarkMode />
        <div className = 'avatar-text d-flex flex-d-c justify-c'>
          <h3 className = 'fw-600'>{userInfo.auth.userName}</h3>
          <h4 className = "fs-14 fw-500">{userInfo.auth.userRole}</h4>
        </div>
        <img alt = 'avatar' src = {avatar} />
      </div>
  </div>
  )
}