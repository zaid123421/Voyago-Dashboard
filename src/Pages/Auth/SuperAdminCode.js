import { useContext, useEffect, useRef, useState } from 'react';
import logo from '../../images/logo_login.png'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Email } from '../email';
import { NavLink } from 'react-router-dom';
import { dom } from '../dom';

export default function SuperAdminCode() {
  // useState
  const [accept, setAccept] = useState();
  const [error, setError] = useState();
  const [combinedInputs, setCombinedInputs] = useState('');

// useContext
  const emailContext = useContext(Email);

  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 1) {
      setInputs({
        ...inputs,
        [name]: value
      });
      if (value !== '') {
        const nextInput = `input${parseInt(name.replace('input', '')) + 1}`;
        if (inputRefs[nextInput]) {
          inputRefs[nextInput].current.focus();
        }
      }
    }
  };

// useNavigate
const nav = useNavigate();

const inputRefs = {
  input1: useRef(null),
  input2: useRef(null),
  input3: useRef(null),
  input4: useRef(null),
  input5: useRef(null),
};


// useEffect(() => {
//     axios.post(`http://${dom}/web/forget_password`,{
//       email: emailContext.authe.email
//     })
// },[]);

// handleSubmit
async function Submit(e) {
  setAccept(true);
  const combined = `${inputs.input1}${inputs.input2}${inputs.input3}${inputs.input4}${inputs.input5}`;
  setCombinedInputs(combined);
  try {
    let res = await axios.post(`http://${dom}/web/check_verification_code`, {
      email: emailContext.authe.email,
      cod: parseInt(combined)
    });
    if(res.status === 200) {
      nav('/dashboard');
    }
  } catch(err) {
    setError(406);
  }
}

  return(
    <div className = "auth-card super-admin-card position-absolute">
      <div className = "first-child">
        <div className = 'back-to-login mt-15 mr-50'>
          <NavLink to = '/'>
            <i className="fa-solid fa-angle-left fs-14 ml-20"></i>
            Back To Login Page
          </NavLink>
        </div>
        <h1 className = 'mt-75 mb-30'>Sign in</h1>
        <p className = 'mb-50 fs-15'>Enter the verification code we sent to your email</p>
        <div className = 'five-fields d-flex justify-c align-c'>
          <input autoFocus ref={inputRefs.input1} className = 'second-input mb-30' type="text" name="input1" value={inputs.input1} onChange={handleChange} />
          <input ref={inputRefs.input2} className = 'second-input mb-30' type="text" name="input2" value={inputs.input2} onChange={handleChange} />
          <input ref={inputRefs.input3} className = 'second-input mb-30' type="text" name="input3" value={inputs.input3} onChange={handleChange} />
          <input ref={inputRefs.input4} className = 'second-input mb-30' type="text" name="input4" value={inputs.input4} onChange={handleChange} />
          <input ref={inputRefs.input5} className = 'second-input mb-30' type="text" name="input5" value={inputs.input5} onChange={handleChange} />
          {accept && error === 406 && <p className = 'error-verify fs-14 position-absolute color-red'>Invalid Code</p>}
        </div>
          <button className = 'special-button' onClick = {Submit}>Verify</button>
      </div>
      <div className = "second-child">
      <div className = 'login-text'>
          <h1>Welcome To Voyago Dashboard !</h1>
          <p>Sign in to Access Admin Dashboard</p>
        </div>
        <img className = 'admin-logo' src = {logo} alt = "Logo"/>
      </div>
    </div>
  );
}