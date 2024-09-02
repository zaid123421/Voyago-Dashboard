import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/logo_login.png';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { User } from "../Context";
import Cookies from "universal-cookie";
import { Email } from '../email';
import { dom } from '../dom';

export default function Login() {

// useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState('');

// useContext
  const userInfo = useContext(User);
  const emailContext = useContext(Email);

// useNavigate
  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post(`https://${dom}/web/login`, {
        email: email,
        password: password,
      });
      emailContext.setAuthe({email});
      const userAccessToken = res.data.accessToken;
      const userRefreshToken = res.data.refreshToken;
      const userName = res.data.name;
      const userRole = res.data.role;
      userInfo.setAuth({userAccessToken, userRefreshToken, userName, userRole});
      const cookie = new Cookies();
      cookie.set('userName', userName, { path: '/' });
      cookie.set('userRole', userRole, { path: '/' });
      cookie.set('userAccessToken', userAccessToken, { path: '/' });
      cookie.set('userRefreshToken', userRefreshToken, { path: '/' });
      if(userRole === 'Super Admin'){
        nav('/superadmincode')
      }else {
        nav('/dashboard');
      }
    } catch(err) {
      console.log(err.response.status);
      if(err.response.status === 401) {
        setError(err.response.status);
      }
      if(err.response.status === 500) {
        setError(err.response.status);
      }
    }
  }

  function withoutLogin() {
    nav('/dashboard');
  }

  return(
    <div className = "auth-card position-absolute">
      <div className = 'first-child'>
        <h1 className = 'mt-75 mb-50'>Sign in</h1>
        <div className = 'input-box d-flex flex-d-c mb-15'>
          <label className = 'mb-15' htmlFor = 'login-email-input'>Email</label>
          <input
            autoFocus
            className = 'main-input'
            id = 'login-email-input'
            type = 'Email'
            placeholder = 'Enter Your Email'
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          {email.length === 0 && accept && <p className = 'error fs-14 position-absolute color-red'>Please Enter Your Email</p>}
          {accept && (error === 500 || error ===401) && <p className = 'error-bottom fs-14 position-absolute color-red'>Invalid Email or Password</p>}
        </div>
        <div className = 'input-box d-flex flex-d-c'>
          <label className = 'mb-15' htmlFor = 'login-password-input'>Password</label>
          <input
            className = 'main-input'
            id = 'login-password-input'
            type = 'Password'
            placeholder = 'Enter Your Password'
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          {password.length < 8 && accept && <p className = 'error fs-14 position-absolute color-red'>Password Must Be More Than 8 Characters</p>}
        </div>
        <div>
          <NavLink className = "mt-15 fs-14" to = "/forgotpassword">Forgot Password ?</NavLink>
        </div>
        <button onClick = {Submit} className = 'special-button'>Sign in</button>
        <button onClick = {withoutLogin} className = 'special-button'>Couninue as Viewer</button>
      </div>
      <div className = 'second-child'>
        <div className = 'login-text'>
          <h1>Welcome To Voyago Dashboard !</h1>
          <p className = 'fs-18 fw-500 mt-15'>Sign in to Access Admin Dashboard</p>
        </div>
        <img className = 'logo' src = {logo} alt = "Logo"/>
      </div>
    </div>
  );
}