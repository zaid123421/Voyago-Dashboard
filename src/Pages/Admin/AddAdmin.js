import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function AddAdmin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
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
        let res = await axios.post(`http://${dom}/web/add_admin`, {
          username: username,
          email: email,
          password: password,
          role: role
        });
        nav("/admins");
      }
      
    } catch(err) {
      console.log(err);
    }
  }

  function handleSelect(event) {
    setRole(event.target.value)
  }

  return (
    <>
      <Header />
      <Sidebar number = {2} />
      <div className = "content add-admin-page d-flex align-c justify-c">
        <NavLink to = "/admins">
          <i className="fa-solid fa-angle-left arrow-left"></i>
        </NavLink>
        <div className = "add-admin-card">
          <h2 className = "fw-500 mb-25">Add A New Admin</h2>
          <div className = "mb-25">
          <div className = "d-flex flex-d-c mb-25">
            <label htmlFor = "username" className = "special-label mb-15">Username</label>
            <input
              className = "fs-18"
              id = "username"
              type = "text"
              placeholder = "Enter Admin's Username"
              value = {username}
              onChange = {(e) => setUsername(e.target.value)}
            />
          </div>
          <div className = "mb-25">
            <label htmlFor = "email" className = "special-label mb-15">Email</label>
            <input
              className = "fs-18"
              id = "email"
              type = "email"
              placeholder = "Enter Admin's Email"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
            />
          </div>
          <div className = "mb-25">
            <label htmlFor = "password" className = "special-label mb-15">Password</label>
            <input
              className = "fs-18"
              id = "password"
              type = "password"
              placeholder = "Enter Admin's Password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className = "special-label mr-15 mb-15">Role</label>
            <select onChange = {handleSelect} className = "admin-select cursor-p fs-15">
              <option value = "Admin">Admin</option>
              <option value = "Accountant">Accountant</option>
              <option value = "Trips Organizer">Trips Organizer</option>
            </select>
            <i className="fa-solid fa-chevron-down arrow-select"></i>
          </div>
            <button onClick = {Submit} className = "add-button">Add</button>
          </div>
        </div>
      </div>
    </>
  );
}