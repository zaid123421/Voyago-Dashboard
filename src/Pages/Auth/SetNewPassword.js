import { useContext, useState } from 'react';
import lock from '../../images/verify-code.png';
import { Email } from '../email';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { dom } from '../dom';

export default function SetNewPassword() {

// useState
  const [accept, setAccept] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

// useNavigate
  const nav = useNavigate();

// useContext
  const emailContext = useContext(Email);


// handleSubmit
async function Submit(e) {
  let flag = true;
  e.preventDefault();
  setAccept(true);
  if (password.length < 8 || password !== confirmPassword) {
    flag = false;
  } else flag = true;
  try {
    if(flag){
      let res = await axios.post(`https://${dom}/web/reset_password`, {
        email: emailContext.authe.email,
        password: password
      });
      if(res.status === 200) {
        nav('/');
      }
      console.log(res);
    }
  } catch(err) {
    console.log(err);
  }
}


  return(
    <div className = "auth-card position-absolute">
      <div className = "first-child d-flex align-s">
          <h1 className = 'mt-50 mb-30' >Set A New Password</h1>
          <p className = 'fs-15 mb-50'>Enter the verification code we sent to your email</p>
          <div>
            <div>
              <label htmlFor = 'setpassword'>Create Password</label>
              <input
                autoFocus
                id = 'setpassword'
                className = 'main-input mt-15'
                type = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <label htmlFor = 'repeatpassword'>Repeat Password</label>
              <input
                id = 'repeatpassword'
                className = 'main-input mt-15'
                type = "password"
                value = {confirmPassword}
                onChange = {(e) => setConfirmPassword(e.target.value)}/>
            </div>
            {accept && password !== confirmPassword && <p className = 'error-set-password fs-14 position-absolute color-red'>Password Doesn't Match</p>}
            <button onClick = {Submit} className = 'special-button'>Set Password</button>
          </div>
      </div>
      <div className = "second-child">
        <img className = 'verify-img' src = {lock} alt = 'Lock'></img>
      </div>
    </div>
  );
}