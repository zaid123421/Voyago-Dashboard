import { NavLink, useNavigate } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function AddUser() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);

  const nav = useNavigate();

  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (password.length < 8) {
      flag = false;
    } else flag = true;
    try {
      if(flag) {
        let res = await axios.post(`http://${dom}/web/add_user`, {
          username: username,
          email: email,
          password: password,
        });
        console.log(res);
        nav("/users");
      }
      
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <Sidebar number = {3} />
      <div className = "content add-admin-page d-flex justify-c align-c mt-50">
        <NavLink to = "/users">
          <i className="fa-solid fa-angle-left arrow-left position-absolute"></i>
        </NavLink>
        <div className = "add-card">
          <h2 className = "mb-25 text-c fw-500">Add A New User</h2>
          <div>
          <div className = "d-flex flex-d-c mb-25">
            <label htmlFor = "username" className = "special-label mb-15">Username</label>
            <input
              className = "fs-18"
              id = "username"
              type = "text"
              placeholder = "Enter User's Username"
              value = {username}
              onChange = {(e) => setUsername(e.target.value)}
            />
          </div>
          <div className = "d-flex flex-d-c mb-25">
            <label htmlFor = "email" className = "special-label mb-15">Email</label>
            <input
              className = "fs-18"
              id = "email"
              type = "email"
              placeholder = "Enter User's Email"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
            />
          </div>
          <div className = "d-flex flex-d-c mb-25">
            <label htmlFor = "pass" className = "special-label mb-15">Password</label>
            <input
              className = "fs-18"
              id = "pass"
              type = "password"
              placeholder = "Enter User's Password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick = {Submit} className = "add-button">Add</button>
          </div>
        </div>
      </div>
    </>
  );
}