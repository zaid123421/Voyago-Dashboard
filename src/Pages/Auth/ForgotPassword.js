import { NavLink, useNavigate } from 'react-router-dom';
import forgot_password_img from '../../images/forgot-password.png';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Email } from '../email';
import { dom } from '../dom';

export default function ForgotPassword(){

// useState
  const [email, setEmail] = useState('');
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState(null);

// useContext
  const emailContext = useContext(Email);

// UseNavigate
  const nav = useNavigate();

// handling Submit
async function Submit(e) {
  let flag = true;
  e.preventDefault();
  setAccept(true);
  if (email.length < 1) {
    flag = false;
  } else flag = true;
  try {
    if(flag) {
      let res = await axios.post(`http://${dom}/web/forget_password`, {
        email: email
      });
      if(res.status === 200){
        console.log(emailContext);
        emailContext.setAuthe({email});
        nav('/verifycode');
      }
    }
  } catch(err) {
    console.log(emailContext);
    setError(500);
  }
}

  return(
    <div className = 'auth-card'>
      <div className = 'first-child align-s'>
        <div className = 'back-to-login mt-15'>
          <NavLink to = '/'>
            <i className="fa-solid fa-angle-left fs-14"></i>
            Back To Login Page
          </NavLink>
        </div>
        <div className = 'd-flex flex-d-c mt-75'>
          <h2>Forgot Your Password?</h2>
          <p className = 'mt-50 fs-15'>Please enter your email below to recover your password</p>
          <label className = 'mt-50 mb-15' htmlFor = 'forgot'>Email</label>
          <input
            className = 'main-input'
            id = 'forgot'
            placeholder = 'Enter Your Email'
            type = 'email'
            value = {email}
            onChange = {(e) => setEmail(e.target.value)} />
          {accept && error === 500 && <p className = 'error-forgot fs-14'>Invalid Email</p>}
          <button className = 'special-button' onClick = {Submit}>Submit</button>
        </div>
      </div>
      <div className = 'second-child'>
        <div className = 'login-text'>
        </div>
        <img className = 'forgot-password-img' src = {forgot_password_img} alt = "Logo"/>
      </div>
    </div>
  );
}