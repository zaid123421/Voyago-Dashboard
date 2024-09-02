import { NavLink, useNavigate } from 'react-router-dom';
import lock from '../../images/verify-code.png'
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { Email } from '../email';

export default function VerifyCode() {

// useState
  const [accept, setAccept] = useState();
  const [error, setError] = useState();
  const [combinedInputs, setCombinedInputs] = useState('');

// useContext
  const emailContext = useContext(Email);

// useNavigate
  const nav = useNavigate();

  const inputRefs = {
    input1: useRef(null),
    input2: useRef(null),
    input3: useRef(null),
    input4: useRef(null),
    input5: useRef(null),
  };

// handleSubmit
async function Submit(e) {
  const combined = `${inputs.input1}${inputs.input2}${inputs.input3}${inputs.input4}${inputs.input5}`;
  setCombinedInputs(combined);
  let flag = true;
  e.preventDefault();
  setAccept(true);
  try {
    let res = await axios.post('http:///web/check_verification_code', {
      email: emailContext.authe.email,
      cod: parseInt(combined)
    });
    if(res.status === 200) {
      console.log(emailContext.authe.email);
      nav('/setnewpassword');
    }
    console.log(res);
  } catch(err) {
    console.log(emailContext.authe.email);
    setError(406);
  }
}

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

  return(
    <div className = "auth-card position-absolute">
      <div className = "first-child align-s">
        <div className = 'back-to-login mt-15'>
          <NavLink to = '/'>
            <i className = "fa-solid fa-angle-left"></i>
            Back To Login Page
          </NavLink>
        </div>
          <h1 className = 'mt-75 mb-30'>Verify code</h1>
          <p className = 'mb-50'>Enter the verification code we sent to your email</p>
          <div className = 'five-fields d-flex justify-c align-c'>
            {/* <input
              min = "1"
              max = "5"
              type = "number"
              className = 'second-input mb-30'
              value = {code}
              onChange = {(e) => setCode(e.target.value)} /> */}
            <input autoFocus ref = {inputRefs.input1} className = 'second-input mb-30' type="number" name="input1" value={inputs.input1} onChange={handleChange} />
            <input ref = {inputRefs.input2} className = 'second-input mb-30' type="number" name="input2" value={inputs.input2} onChange={handleChange} />
            <input ref = {inputRefs.input3} className = 'second-input mb-30' type="number" name="input3" value={inputs.input3} onChange={handleChange} />
            <input ref = {inputRefs.input4} className = 'second-input mb-30' type="number" name="input4" value={inputs.input4} onChange={handleChange} />
            <input ref = {inputRefs.input5} className = 'second-input mb-30' type="number" name="input5" value={inputs.input5} onChange={handleChange} />
            {accept && error === 406 && <p className = 'error-verify fs-14 position-absolute color-red'>Invalid Code</p>}
          </div>
            <button className = 'special-button w-full' onClick = {Submit}>Verify</button>
      </div>
      <div className = "second-child">
        <img className = 'verify-img' src = {lock} alt = 'Lock'></img>
      </div>
    </div>
  );
}